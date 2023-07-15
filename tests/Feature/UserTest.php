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
        $this->admin = User::factory()->active()->admin()->create(['email' => 'admin@health-links.me']);
    }
    public function test_admin_can_access_users_page()
    {
        $response = $this->actingAs($this->admin)->get('/users');
        $response->assertStatus(200);
    }


    public function test_admin_can_access_show_user_details()
    {
        $response = $this->actingAs($this->admin)->get('/users/' . $this->admin->id);
        $response->assertStatus(200);
    }

    public function test_admin_can_list_all_user()
    {
        User::factory(10)->create();
        $response = $this->actingAs($this->admin)->get('/users/data');
        $response->assertStatus(200);
        $response->assertJsonCount(11, 'data');
        $response->assertJsonStructure([
            'draw',
            'recordsTotal',
            'recordsFiltered',
            'data',
        ]);
    }
    public function test_user_can_search()
    {
        User::factory(10)->create();
        $response = $this->actingAs($this->admin)->get('/users/data?search%5Bvalue%5D=admin&search%5Bregex%5D=false');
        $response->assertStatus(200);
    }

    public function test_admin_can_render_create_user_page()
    {
        $response = $this->actingAs($this->admin)->get('/users/create');
        $response->assertStatus(200);
    }

    public function test_admin_can_store_user()
    {
        Mail::fake();
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
        $response = $this->actingAs($user)->followingRedirects()->post('/users', $request);
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'name' => 'test',
        ]);

        Mail::assertSent(NewUserMail::class, function ($mail) use ($user, $request) {
            return $mail->hasTo($user->email) &&
                $mail->details['email'] === $user->email
                && $mail->details['password'] === $request['password'];
        });
    }

    public function test_admin_can_render_edit_user_page()
    {
        $response = $this->actingAs($this->admin)->get('/users/' . $this->admin->id . '/edit');
        $response->assertStatus(200);
    }

    public function test_admin_can_update_user()
    {
        $user2 = User::factory()->active()->create(['email' => 'test2@health-links.me', 'role' => 'user']);
        $clients = Client::factory(5)->active()->create()->pluck('id')->toArray();
        $request = [
            'name' => 'test updated',
            'email' => 'test2@health-links.me',
            'username' => $user2->username,
            'password' => 'SN^Jsj42KB%1',
            'password_confirmation' => 'SN^Jsj42KB%1',
            'clients' => $clients
        ];
        $response = $this->actingAs($this->admin)->followingRedirects()->put('/users/' . $user2->id, $request);
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'name' => 'test updated',
        ]);
    }

    public function test_admin_can_toggle_active_user()
    {

        $user2 = User::factory()->active()->create(['email' => 'test2@health-links.me', 'role' => 'user']);
        $response = $this->actingAs($this->admin)->post('/users/' . $user2->id . '/toggle_active');
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'id' => $user2->id,
            'is_active' => false
        ]);
    }
    public function test_admin_cannot_toggle_active_own_account()
    {

        $response = $this->actingAs($this->admin)->post('/users/' . $this->admin->id . '/toggle_active');
        $response->assertStatus(403);
    }

    /**
     * @dataProvider requestData
     */
    public function test_create_user_validation($requestData): void
    {

        $response = $this->actingAs($this->admin)->post('/users', $requestData);
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
