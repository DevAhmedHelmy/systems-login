<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use App\Mail\SendCodeMail;
use App\Models\VerificationCode;
use Illuminate\Support\Facades\Mail;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TwoFATest extends TestCase
{
    use RefreshDatabase;



    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_2fa_screen_can_be_rendered()
    {
        $user = User::factory()->create();
        $response = $this->get("/2fa/" . $user->id);
        $response->assertStatus(200);
    }

    public function test_2fa_generate_code()
    {
        Mail::fake();
        $user = User::factory()->create();
        $code = VerificationCode::factory()->create([
            'user_id' => $user->id,
        ]);
        $this->assertDatabaseHas('verification_codes', [
            'user_id' => $user->id,
            'code' => $code->code,
        ]);
    }

    public function test_2fa_verify_code()
    {
        $user = User::factory()->create();
        $code = VerificationCode::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->post("/2fa", [
            'code' => $code->code,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(302)
            ->assertRedirect(RouteServiceProvider::HOME);
    }

    public function test_2fa_verify_code_fail()
    {
        $user = User::factory()->create();
        $code = VerificationCode::factory()->create([
            'user_id' => $user->id,
            'expire_at' => now()
        ]);
        $response = $this->post("/2fa", [
            'code' => $code->code,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(302);
    }

    public function test_2fa_resend_code()
    {
        Mail::fake();
        $user = User::factory()->create();
        $code = VerificationCode::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->get("2fa/reset/" . $user->id);
        $user->sendCodeEmail($code->code, $user->email);
        Mail::assertSent(SendCodeMail::class, function ($mail) use ($user, $code) {
            return $mail->hasTo($user->email) &&
                $mail->details['code'] === $code->code;
        });
        $response->assertStatus(302);
    }
}
