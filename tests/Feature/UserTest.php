<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Client;
use App\Mail\NewUserMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    private $admin;
    public function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->active()->role('admin')->create(['email' => 'admin@health-links.me']);
    }
    public function test_admin_can_access_users_page()
    {
        $this->actingAs($this->admin)->get('/users')->assertOk();
    }


    public function test_admin_can_access_show_user_details()
    {
        $this->actingAs($this->admin)
            ->followingRedirects()
            ->get('/users/' . $this->admin->id)
            ->assertOk();
    }

    public function test_admin_can_list_all_user()
    {
        User::factory(10)->create();
        $this->actingAs($this->admin)->get('/users/data')
            ->assertOk()
            ->assertJsonCount(11, 'data')
            ->assertJsonStructure([
                'draw',
                'recordsTotal',
                'recordsFiltered',
                'data',
            ]);
    }
    public function test_user_can_search()
    {
        User::factory(10)->create();
        $this->actingAs($this->admin)->followingRedirects()
            ->get('/users/data?search%5Bvalue%5D=admin&search%5Bregex%5D=false')
            ->assertOk();
    }

    public function test_admin_can_render_create_user_page()
    {
        $this->actingAs($this->admin)
            ->followingRedirects()
            ->get('/users/create')
            ->assertOk();
    }

    public function test_admin_can_store_user()
    {
        Mail::fake();
        $clients = Client::factory(5)->active()->create()->pluck('id')->toArray();
        $this->actingAs($this->admin)
            ->followingRedirects()
            ->post('/users', [
                'name' => 'test',
                'email' => 'test_store@health-links.me',
                'password' => 'SN^Jsj42KB%1',
                'username' => 'test_store',
                'password_confirmation' => 'SN^Jsj42KB%1',
                'clients' => $clients
            ])
            ->assertOk();
        $this->assertDatabaseHas('users', [
            'name' => 'test',
        ]);
        Mail::assertQueued(NewUserMail::class);
    }

    public function test_admin_can_render_edit_user_page()
    {
        $this->actingAs($this->admin)
            ->followingRedirects()
            ->get('/users/' . $this->admin->id . '/edit')
            ->assertOk();
    }

    public function test_admin_can_update_user()
    {
        $user = User::factory()->role('user')->active()->create(['email' => 'test2@health-links.me']);
        $clients = Client::factory(5)->active()->create()->pluck('id')->toArray();
        $this->actingAs($this->admin)
            ->followingRedirects()
            ->put('/users/' . $user->id, [
                'name' => 'test updated',
                'email' => 'test2@health-links.me',
                'username' => $user->username,
                'password' => 'SN^Jsj42KB%1',
                'password_confirmation' => 'SN^Jsj42KB%1',
                'clients' => $clients
            ])
            ->assertOk();
        $this->assertDatabaseHas('users', [
            'name' => 'test updated',
        ]);
    }

    public function test_admin_can_toggle_active_user()
    {
        $user2 = User::factory()->role('user')->active()->create(['email' => 'test2@health-links.me']);
        $this->actingAs($this->admin)
            ->followingRedirects()
            ->post('/users/' . $user2->id . '/toggle_active')
            ->assertOk();
        $this->assertDatabaseHas('users', [
            'id' => $user2->id,
            'is_active' => false
        ]);
    }
    public function test_admin_cannot_toggle_active_own_account()
    {
        $this->actingAs($this->admin)
            ->post('/users/' . $this->admin->id . '/toggle_active')
            ->assertStatus(403);
    }

    /**
     * @dataProvider requestData
     */
    public function test_create_user_validation($requestData): void
    {
        $this->actingAs($this->admin)
            ->followingRedirects()
            ->post('/users', $requestData)->assertOk();
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
