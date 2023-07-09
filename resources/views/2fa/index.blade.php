@extends('layouts.app')

@section('content')
    <div class="auth-wrapper auth-basic px-2">
        <div class="auth-inner my-2">
            <!-- Login basic -->
            <div class="card mb-0">
                <div class="card-body">
                    <a href="{{ route('login') }}" class="brand-logo">
                        <img class="img-fluid" src="{{ asset('admin') }}/app-assets/images/Asset 2@300x.png" width="200"
                            height="60">
                    </a>
                    @if ($message = Session::get('success'))
                        <div class="row">
                            <div class="col-md-12">
                                <div class="alert alert-success alert-block">
                                    <strong>{{ $message }}</strong>
                                </div>
                            </div>
                        </div>
                    @endif

                    @if ($message = Session::get('error'))
                        <div class="row">
                            <div class="col-md-12">
                                <div class="alert alert-danger alert-block">
                                    <strong>{{ $message }}</strong>
                                </div>
                            </div>
                        </div>
                    @endif


                    <h4 class="card-title mb-1">Welcome to Health Links! 👋</h4>
                    <h6>Verification Code</h6>
                    <div class="mb-1">
                        <p class="text-center">We sent code to email :
                            {{ substr($user->email, 0, 5) . '******' . substr($user->email, -2) }}
                        </p>
                    </div>
                    <form class="auth-login-form mt-2" method="POST" action="{{ route('2fa.post') }}">
                        @csrf

                        <input type="hidden" name="user_id" value="{{ $user->id }}">
                        <div class="mb-1">
                            <label for="login-email" class="form-label">Code</label>
                            <input id="code" type="number" class="form-control @error('code') is-invalid @enderror"
                                name="code" value="{{ old('code') }}" required autocomplete="code" autofocus>

                            @error('code')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>



                        <button class="btn btn-primary w-100" type="submit" tabindex="4">Verify Code</button>

                    </form>

                    <p class="text-center mt-2">
                        <span>New on our platform?</span>
                        <a href="{{ route('2fa.resend', $user->id) }}">
                            <span>Resend Code</span>
                        </a>
                    </p>
                </div>
            </div>

        </div>
    </div>
@endsection
