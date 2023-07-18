<?php

use App\Models\{User, Client};

test('user has multiple clients can access clients page', function () {
    $user = User::factory()->hasClients(4)->active()->create(['email' => 'user@health-links.me']);
    $this->actingAs($user)->get('/clients')->assertOk();
});

test('list clients by auth', function () {
    $user = User::factory()->active()->hasClients(5)->create(['email' => 'user@health-links.me']);
    $this->actingAs($user)->get('/clients/data')
        ->assertOk()
        ->assertJsonCount(5, 'data')
        ->assertJsonStructure([
            'draw',
            'recordsTotal',
            'recordsFiltered',
            'data',
        ]);
});


test('admin can access create client page', function () {
    login()['response']->get('/clients/create')
        ->assertOk()
        ->assertSee('Add New Client');
});

test('request create client validation', function ($data) {
    login()['response']->followingRedirects()
        ->post('/clients', $data)
        ->assertOk();
})->with('client request validation');

test('admin can add new client', function () {
    $users = User::factory(5)->create()->pluck('id')->toArray();
    login()['response']
        ->followingRedirects()
        ->post('/clients', [
            'name' => 'test',
            'domain' => 'test@health-links.me',
            'api_key' => 'password',
            'users' => $users
        ])->assertOk();
    $this->assertDatabaseHas('clients', [
        'name' => 'test',
    ]);
    expect(Client::latest()->first())
        ->name->toBeString()->not->toBeEmpty()
        ->domain->toBeString()->not->toBeEmpty();
});

test('admin can show client details', function () {
    $client = Client::factory()->create(['name' => 'test']);
    login()['response']->get('/clients/' . $client->id)
        ->assertOk()
        ->assertSee($client->name);
});

test('admin can edit client details', function () {
    $client = Client::factory()->create();
    login()['response']->get('/clients/' . $client->id . '/edit')
        ->assertOk()
        ->assertSee($client->name);
});

test('admin can update client details', function () {
    $client = Client::factory()->create(['name' => 'test']);
    login()['response']->followingRedirects()->put('/clients/' . $client->id, [
        'name' => 'test updated',
        'domain' => 'test@health-links.me',
        'api_key' => 'password',
    ])->assertOk();
    $this->assertDatabaseHas('clients', [
        'name' => 'test updated',
    ]);
    expect(Client::latest()->first())
        ->name->toBeString()->not->toBeEmpty()
        ->domain->toBeString()->not->toBeEmpty();
});

test('admin can toggle active client', function () {
    $client = Client::factory()->active()->create();
    login()['response']
        ->post('/clients/' . $client->id . '/toggle_active')
        ->assertOk();
    $this->assertDatabaseHas('clients', [
        'id' => $client->id,
        'is_active' => false,
    ]);
});
