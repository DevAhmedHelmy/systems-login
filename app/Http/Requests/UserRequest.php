<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use App\Rules\IsHealthLinksEmail;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        $passwordValidations = ['required', 'confirmed', Password::min(8)
            ->mixedCase()
            ->numbers()
            ->symbols()
            ->uncompromised()];
        if ($this->method('put') && request('password') == null) $passwordValidations = ['nullable'];


        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', Rule::unique('users', 'username')->ignore($this->user)],
            'email' => ['required', 'string', 'email', 'max:255', new IsHealthLinksEmail, Rule::unique('users', 'email')->ignore($this->user)],
            'password' => $passwordValidations,
            'phone' => ['nullable'],
            'clients' => ['required', 'array'],
            'clients.*' => ['required', 'integer'],
        ];
    }
}
