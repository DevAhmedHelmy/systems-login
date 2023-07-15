<?php

namespace Tests\Feature;

use App\Models\Client;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClientTest extends TestCase
{
    use RefreshDatabase;

    private $admin;
    public function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->active()->admin()->create(['email' => 'admin@health-links.me']);
    }

    public function test_user_can_access_clients_page()
    {
        $user = User::factory()->active()->create(['email' => 'user@health-links.me']);
        $response = $this->actingAs($user)->get('/clients');
        $response->assertStatus(200);
    }

    public function test_client_list_by_auth()
    {
        $user = User::factory()->active()->hasClients(5)->create(['email' => 'user@health-links.me']);
        $response = $this->actingAs($user)->get('/clients/data');
        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
        $response->assertJsonStructure([
            'draw',
            'recordsTotal',
            'recordsFiltered',
            'data',
        ]);
    }
    public function test_admin_can_access_create_client_page()
    {
        $response = $this->actingAs($this->admin)->get('/clients/create');
        $response->assertStatus(200);
        $response->assertSee('Add New Client');
    }

    /**
     * @dataProvider requestDate
     */
    public function test_request_create_client_validation($requestDate): void
    {
        $response = $this->actingAs($this->admin)->post('/clients', $requestDate);
        $response->assertStatus(302);
        $response->assertSessionHasErrors();
    }

    public static function requestDate(): array
    {

        return [
            'Name Is Required' => [
                [
                    'domain' => 'test@health-links.me',
                    'api_key' => 'password',
                    'users' => [1, 2]
                ]
            ],
            'Domain Is Required' => [
                [
                    'name' => 'test',
                    'api_key' => 'password',
                    'users' => [1, 2]
                ],
            ]
        ];
    }

    public function test_client_store()
    {
        $users = User::factory(5)->create()->pluck('id')->toArray();
        $response = $this->actingAs($this->admin)->followingRedirects()->post('/clients', [
            'name' => 'test',
            'domain' => 'test@health-links.me',
            'api_key' => 'password',
            'users' => $users
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('clients', [
            'name' => 'test',
        ]);
    }

    public function test_client_show()
    {
        $client = Client::factory()->create(['name' => 'test']);
        $response = $this->actingAs($this->admin)->get('/clients/' . $client->id);
        $response->assertStatus(200)
            ->assertSee($client->name);
    }

    public function test_client_edit()
    {
        $client = Client::factory()->create();
        $response = $this->actingAs($this->admin)->get('/clients/' . $client->id . '/edit');
        $response->assertStatus(200)
            ->assertSee($client->name);
    }

    public function test_client_update()
    {
        $client = Client::factory()->create(['name' => 'test']);
        $response = $this->actingAs($this->admin)->followingRedirects()->put('/clients/' . $client->id, [
            'name' => 'test updated',
            'domain' => 'test@health-links.me',
            'api_key' => 'password',
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('clients', [
            'name' => 'test updated',
        ]);
    }

    public function test_toggle_active()
    {
        $client = Client::factory()->create(['is_active' => false]);
        $response = $this->actingAs($this->admin)->post('/clients/' . $client->id . '/toggle_active');
        $response->assertStatus(200);
        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'is_active' => true,
        ]);
    }
    // public function test_client_delete()
    // {
    //
    //     $client = Client::factory()->create(['name' => 'test']);
    //     $response = $this->actingAs($this->admin)->delete('/clients/' . $client->id);
    //     $response->assertStatus(302)
    //         ->assertSessionHasNoErrors();
    //     $this->assertDatabaseMissing('clients', [
    //         'id' => $client->id,
    //     ]);
    // }
}
