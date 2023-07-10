<?php

namespace Tests\Feature\Auth;

use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    // public function test_new_users_can_register(): void
    // {
    //     $clients = Client::factory(2)->create(['is_active' => true])->pluck('id')->toArray();
    //     $response = $this->post('/register', [
    //         'name' => 'Test User',
    //         'username' => 'test',
    //         'phone' => '123456789',
    //         'email' => 'test@health-links.me',
    //         'password' => 'password',
    //         'password_confirmation' => 'password',
    //         'clients' => $clients
    //     ]);
    //     $this->assertDatabaseHas('users', [
    //         'name' => 'Test User',
    //     ]);
    //     $response->assertRedirect('/login');
    // }
    /**
     * @dataProvider governorateDate
     */
    public function test_request_validation($governorateDate): void
    {
        $response = $this->post('/register', $governorateDate);
        $response->assertStatus(302);
        $response->assertSessionHasErrors();
    }

    public static function governorateDate(): array
    {

        return [
            'name Is Required' => [
                [
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'password',
                    'password_confirmation' => 'password',
                    'clients' => [1, 2]

                ]
            ],
            'username Is Required' => [
                [
                    'name' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'password',
                    'password_confirmation' => 'password',
                    'clients' => [1, 2]

                ]
            ],
            'Email Is Required' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'password' => 'password',
                    'password_confirmation' => 'password',
                    'clients' => [1, 2]


                ]
            ],
            'password Is Required' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'clients' => [1, 2]

                ],
            ],
            'clients Is Required' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'password',
                    'password_confirmation' => 'password',
                ]
            ],
            'The email must be a Health Links email.' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@example.com',
                    'password' => 'password',
                    'password_confirmation' => 'password',
                    'clients' => [1, 2]
                ]
            ],
            'The clients must be an array.' => [
                [
                    'name' => 'test',
                    'username' => 'test',
                    'email' => 'test@health-links.me',
                    'password' => 'password',
                    'password_confirmation' => 'password',
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
                    'password' => 'password',
                    'password_confirmation' => 'password',
                    'clients' => []
                ]
            ]

        ];
    }
}
