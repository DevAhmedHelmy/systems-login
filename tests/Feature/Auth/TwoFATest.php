<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use App\Mail\SendCodeMail;
use App\Models\VerificationCode;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TwoFATest extends TestCase
{
    use RefreshDatabase;
    private $user;
    public function setUp():void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_2fa_screen_can_be_rendered()
    {
        $this->followingRedirects()
            ->get("/2fa/" . $this->user->id)
            ->assertStatus(200);
    }

    public function test_2fa_generate_code()
    {
        $code = VerificationCode::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $this->assertDatabaseHas('verification_codes', [
            'user_id' => $this->user->id,
            'code' => $code->code,
        ]);
    }

    public function test_2fa_verify_code()
    {
        $code = VerificationCode::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $this->followingRedirects()
            ->post("/2fa", [
                'code' => $code->code,
                'user_id' => $this->user->id,
            ])->assertStatus(200);
    }
    public function test_2fa_verify_code_fail()
    {
        $code = VerificationCode::factory()->create([
            'user_id' => $this->user->id,
            'expire_at' => now()
        ]);
        $this->followingRedirects()
            ->post("/2fa", [
                'code' => $code->code,
                'user_id' => $this->user->id,
            ])->assertStatus(200);
    }

    public function test_2fa_resend_code()
    {
        Mail::fake();
        $this->followingRedirects()
            ->get("2fa/reset/" . $this->user->id)
            ->assertStatus(200);
        Mail::assertQueued(SendCodeMail::class);
    }
}
