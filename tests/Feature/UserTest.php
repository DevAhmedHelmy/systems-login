<?php

namespace Tests\Feature;

use App\Models\Client;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    public function test_admin_can_access_users_page()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $response = $this->actingAs($user)->get('/users');
        $response->assertStatus(200);
    }


    public function test_admin_can_access_show_user_details()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $response = $this->actingAs($user)->get('/users/' . $user->id);
        $response->assertStatus(200);
    }

    public function test_admin_can_list_all_user()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $users = User::factory(10)->create();
        $response = $this->actingAs($user)->get('/users/data');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'draw',
            'recordsTotal',
            'recordsFiltered',
            'data',

        ]);
    }

    public function test_admin_can_render_create_user_page()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $response = $this->actingAs($user)->get('/users/create');
        $response->assertStatus(200);
    }

    public function test_admin_can_store_user()
    {

        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $clients = Client::factory(5)->create(['is_active' => true])->pluck('id')->toArray();
        $request = [
            'name' => 'test',
            'email' => 'test_store@health-links.me',
            'password' => 'SN^Jsj42KB%1',
            'username' => 'test_store',
            'password_confirmation' => 'SN^Jsj42KB%1',
            'clients' => $clients
        ];
        $response = $this->actingAs($user)->post('/users', $request);
        $response->assertStatus(302);
        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('users', [
            'name' => 'test',
        ]);
    }

    public function test_admin_can_render_edit_user_page()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $response = $this->actingAs($user)->get('/users/' . $user->id . '/edit');
        $response->assertStatus(200);
    }

    public function test_admin_can_update_user()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me', 'role' => 'admin']);
        $user2 = User::factory()->create(['is_active' => true, 'email' => 'test2@health-links.me', 'role' => 'user']);
        $clients = Client::factory(5)->create(['is_active' => true])->pluck('id')->toArray();

        $request = [
            'name' => 'test updated',
            'email' => 'test2@health-links.me',
            'username' => $user2->username,
            'password' => 'SN^Jsj42KB%1',
            'password_confirmation' => 'SN^Jsj42KB%1',
            'clients' => $clients
        ];
        $response = $this->actingAs($user)->put('/users/' . $user2->id, $request);
        $response->assertStatus(302);
        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('users', [
            'name' => 'test updated',
        ]);

    }

    public function test_admin_can_toggle_active_user()
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'admin@health-links.me', 'role' => 'admin']);
        $user2 = User::factory()->create(['is_active' => false, 'email' => 'test@health-links.me', 'role' => 'user']);
        $response = $this->actingAs($user)->post('/users/' . $user2->id . '/toggle_active');
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'id' => $user2->id,
            'is_active' => true
        ]);
    }

    /**
     * @dataProvider requestData
     */
    public function test_create_user_validation($requestData): void
    {
        $user = User::factory()->create(['is_active' => true, 'email' => 'admin@health-links.me', 'role' => 'admin']);
        $response = $this->actingAs($user)->post('/users', $requestData);
        $response->assertStatus(302);
        $response->assertSessionHasErrors();
    }

    public static function requestData(): array
    {

        return [
            'name Is Required' => [
                [
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'SN^Jsj42KB%1',
                    'password_confirmation' => 'SN^Jsj42KB%1',
                    'clients' => [1, 2]

                ]
            ],
            'username Is Required' => [
                [
                    'name' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'SN^Jsj42KB%1',
                    'password_confirmation' => 'SN^Jsj42KB%1',
                    'clients' => [1, 2]

                ]
            ],
            'Email Is Required' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'password' => 'SN^Jsj42KB%1',
                    'password_confirmation' => 'SN^Jsj42KB%1',
                    'clients' => [1, 2]


                ]
            ],
            'password Is Required' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@health-links.me',

                ],
            ],
            'clients Is Required' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'SN^Jsj42KB%1',
                    'password_confirmation' => 'SN^Jsj42KB%1',
                ]
            ],
            'The email must be a Health Links email.' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@example.com',
                    'password' => 'SN^Jsj42KB%1',
                    'password_confirmation' => 'SN^Jsj42KB%1',
                    'clients' => [1, 2]
                ]
            ],
            'The clients must be an array.' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'SN^Jsj42KB%1',
                    'password_confirmation' => 'SN^Jsj42KB%1',
                    'clients' => 1
                ]
            ],
            'The password confirmation does not match.' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'password',
                    'password_confirmation' => 'test',
                    'clients' => [1]
                ]
            ],
            'The clients field is required.' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'SN^Jsj42KB%1',
                    'password_confirmation' => 'SN^Jsj42KB%1',
                    'clients' => []
                ]
            ]

        ];
    }
}
