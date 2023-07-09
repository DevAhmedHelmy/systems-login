@extends('layouts.app')

@section('content')
    <div class="auth-wrapper auth-basic px-2">
        <div class="auth-inner my-2">
            <!-- Reset Password basic -->
            <div class="card mb-0 p-2">
                <div class="card-body">
                    <a href="#" class="brand-logo">
                        <img src="{{ asset('admin') }}/app-assets/images/diamond.jpeg" width="40" height="40" />
                    </a>

                    <h4 class="card-title mb-1">Reset Password 🔒</h4>
                    <p class="card-text mb-2">Your new password must be different from previously used passwords</p>
                     @if ($errors && $errors->any())
                        <span class="text-danger"> {{ $errors->first() }}</span>
                    @endif
                    <form method="POST" class="auth-reset-password-form mt-2" action="{{ route('password.store') }}">
                        @csrf

                        <!-- Password Reset Token -->
                        <input type="hidden" name="token" value="{{ $request->route('token') }}">

                        <div class="mb-1">
                            <label for="login-email" class="form-label">Email</label>
                            <input type="text" class="form-control" id="login-email" name="email"
                                value="{{ old('email', $request->email) }}" placeholder="john@example.com" aria-describedby="login-email"
                                tabindex="1" autofocus required />
                        </div>
                        <div class="mb-1">
                            <div class="d-flex justify-content-between">
                                <label class="form-label" for="reset-password-new">New Password</label>
                            </div>
                            <div class="input-group input-group-merge form-password-toggle">
                                <input type="password" class="form-control form-control-merge" id="reset-password-new"
                                    name="password" required aria-describedby="reset-password-new" tabindex="1"
                                    autofocus="">
                                <span class="input-group-text cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg"
                                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="feather feather-eye">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg></span>
                            </div>
                        </div>
                        <div class="mb-1">
                            <div class="d-flex justify-content-between">
                                <label class="form-label" for="reset-password-confirm">Confirm Password</label>
                            </div>
                            <div class="input-group input-group-merge form-password-toggle">
                                <input type="password" class="form-control form-control-merge" id="reset-password-confirm"
                                    name="password_confirmation" required aria-describedby="reset-password-confirm"
                                    tabindex="2">
                                <span class="input-group-text cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg"
                                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="feather feather-eye">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg></span>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 waves-effect waves-float waves-light"
                            tabindex="3">Set New
                            Password</button>
                    </form>

                    <p class="text-center mt-2">
                        <a href="{{ route('login') }}"> <svg xmlns="http://www.w3.org/2000/svg" width="14"
                                height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg> Back to login </a>
                    </p>
                </div>
            </div>
            <!-- /Reset Password basic -->
        </div>
    </div>
@endsection
