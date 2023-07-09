<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\VerificationCode;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class TwoFAController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index(Request $request, $id)
    {
        $title = 'Two Factor Page';
        $user = User::where('id', $id)->first();
        return view('2fa.index', compact('title', 'user'));
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required',
            'user_id' => 'required',
        ]);

        $find = VerificationCode::where('user_id', $request->user_id)
            ->where('code', $request->code)
            ->where('expire_at', '>=', now()->subMinutes(5))
            ->first();

        if (!$find) {
            return back()->with('error', 'You entered wrong code.');
        }
        $user = User::where('id', $request->user_id)->first();
        Auth::login($user);
        return redirect(RouteServiceProvider::HOME);
    }
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function resend($user_id)
    {
        $user = User::where('id', $user_id)->first();
        $user->generateCode();
        return back()->with('success', 'We sent you code on your email.');
    }
}
