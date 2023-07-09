<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use App\Mail\SendCodeMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        Mail::fake();
        $user = User::factory()->create(['is_active' => true, 'email' => 'test@health-links.me']);
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $code = $user->verifyCode->code;
        $this->assertDatabaseHas('verification_codes', [
            'user_id' => $user->id,
            'code' => $code,
        ]);
        $user->sendCodeEmail($code, $user->email);
        Mail::assertSent(SendCodeMail::class, function ($mail) use ($user, $code) {
            return $mail->hasTo($user->email) &&
                $mail->details['code'] === $code;
        });
        $response->assertStatus(302);
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create(['is_active' => true,'email' => 'test@health-links.me']);
        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }
    public function test_users_can_not_authenticate_with_is_active_false(): void
    {
        $user = User::factory()->create(['is_active' => false, 'email' => 'test@health-links.me']);
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $response->assertStatus(302)
            ->assertSessionHasErrors();
    }

    /**
     * @dataProvider requestDate
     */
    public function test_request_login_validation($requestDate): void
    {

        $response = $this->post('/login', $requestDate);
        $response->assertStatus(302);
        $response->assertSessionHasErrors();
    }

    public static function requestDate(): array
    {

        return [
            'Email Is Required' => [
                [
                    'password' => 'password',
                ]
            ],
            'password Is Required' => [
                [
                    'email' => 'test@health-links.me',
                ],
            ],
            'The email must be a Health Links email.' => [
                [
                    'email' => 'test@example.com',
                    'password' => 'password',
                ]
            ],
            'This Account is not active please call support.' =>
            [
                [
                    'email' => 'test@health-links.me',
                    'password' => 'password',
                    'is_active' => false
                ]
            ]



        ];
    }
}
