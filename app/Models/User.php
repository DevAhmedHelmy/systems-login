<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Mail\SendCodeMail;
use Exception;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Mail;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'phone',
        'password',
        'role',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class, 'user_client', 'user_id', 'client_id');
    }


    public function verifyCode(): HasOne
    {
        return $this->hasOne(VerificationCode::class, 'user_id', 'id');
    }


    /**
     * Write code on Method
     *
     * @return response()
     */
    public function generateCode()
    {
        $code = rand(1000, 9999);

        VerificationCode::where('user_id', $this->id)->delete();

        VerificationCode::create(
            [
                'user_id' => $this->id,
                'expire_at' => now()->addMinutes(5),
                'code' => $code
            ]
        );
        $this->sendCodeEmail($code, $this->email);
    }

    public function sendCodeEmail($code, $email)
    {
        try {
            $details = [
                'title' => 'Mail from laravelia.com',
                'code' => $code
            ];

            Mail::to($email)->send(new SendCodeMail($details));
        } catch (Exception $e) {
            info("Error: " . $e->getMessage());
        }
    }
}
