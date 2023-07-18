<?php

use App\Mail\NewUserMail;
use App\Models\{User, Client};
use Illuminate\Support\Facades\Mail;
use function Pest\Faker\faker;



it('user can list all user', function () {
    login()['response']->followingRedirects()
        ->get('/users')
        ->assertOk();
});

it('admin can access show user details', function () {
    $loginData = login();
    $loginData['response']->followingRedirects()
        ->get('/users/' . $loginData['user']->id)
        ->assertOk();
});

it('admin can list all user', function () {
    User::factory(10)->create();
    login()['response']->get('/users/data')
        ->assertOk()
        ->assertJsonCount(11, 'data')
        ->assertJsonStructure([
            'draw',
            'recordsTotal',
            'recordsFiltered',
            'data',
        ]);
});

it('user can search', function () {
    User::factory(10)->create();
    login()['response']->followingRedirects()
        ->get('/users/data?search[value]=admin&search[regex]=false')
        ->assertOk();
});

it('admin can render create user page', function () {
    login()['response']->followingRedirects()
        ->get('/users/create')
        ->assertOk();
});

it('admin can store user', function (array $data) {
    // Mail::fake();
    $clients = Client::factory(5)->active()->create()->pluck('id')->toArray();
    login()['response']->followingRedirects()
        ->post('/users', [
            'name' => faker()->name,
            'email' => faker()->email,
            'password' => 'SN^Jsj42KB%1',
            'username' => faker()->username,
            'password_confirmation' => 'SN^Jsj42KB%1',
            'clients' => $clients,
            ...$data
        ])->assertOk();

    expect(User::latest()->first())
        ->name->toBeString()->not->toBeEmpty()
        ->email->toBeString()->not->toBeEmpty()
        ->username->toBeString()->not->toBeEmpty()
        ->password->toBeString()->not->toBeEmpty();
    // Mail::assertQueued(NewUserMail::class);
})->with([
    'general' => [[]],
    'not health links' => [['email' => 'test@test.me']],
]);

it('admin can render edit user page', function () {
    $loginData = login();
    $loginData['response']->followingRedirects()
        ->get('/users/' . $loginData['user']->id . '/edit')
        ->assertOk();
});

it('admin can update user', function () {
    $user = User::factory()->active()->role('user')->create(['email' => 'test2@health-links.me']);
    $clients = Client::factory(5)->active()->create()->pluck('id')->toArray();

    login()['response']->followingRedirects()
        ->put('/users/' . $user->id, [
            'name' => 'test updated',
            'email' => 'test2@health-links.me',
            'username' => $user->username,
            'password' => 'SN^Jsj42KB%1',
            'password_confirmation' => 'SN^Jsj42KB%1',
            'clients' => $clients
        ])
        ->assertOk();
    expect(User::latest()->first())
        ->name->toBeString()->not->toBeEmpty()
        ->email->toBeString()->not->toBeEmpty()
        ->username->toBeString()->not->toBeEmpty()
        ->password->toBeString()->not->toBeEmpty();
});
it('admin can toggle active user', function () {
    $user = User::factory()->active()->role('user')->create(['email' => 'test2@health-links.me']);
    login()['response']->followingRedirects()
        ->post('/users/' . $user->id . '/toggle_active')
        ->assertOk();
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'is_active' => false
    ]);
});

it('admin cannot toggle active own account',   function () {
    $loginData = login();
    $loginData['response']->post('/users/' . $loginData['user']->id . '/toggle_active')
        ->assertStatus(403);
});

test('create user validation', function ($requestData) {

    login()['response']->followingRedirects()
        ->post('/users', $requestData)
        ->assertOk();
})->with('user request validation');
