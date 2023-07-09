@extends('layouts.app')

@section('content')
    <div class="auth-wrapper auth-basic px-2" id="register-page">
        <div class="auth-inner my-2">
            <!-- Register basic -->
            <div class="card mb-0">
                <div class="card-body">
                    <a href="{{ route('register') }}" class="brand-logo">
                        <img class="img-fluid" src="{{ asset('admin') }}/app-assets/images/Asset 2@300x.png" width="200"
                            height="60">
                    </a>
                    <h4 class="card-title mb-1">Welcome to Health Links! 👋</h4>

                    <form class="auth-register-form mt-2" method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="row mb-1">
                            <div class="col ">
                                <label for="register-name" class="form-label">Name</label>
                                <input type="text" class="form-control @error('name') is-invalid @enderror"
                                    id="register-name" name="name" aria-describedby="register-name" tabindex="1"
                                    autofocus value="{{ old('name') }}" required />
                                @error('name')
                                    <span class="error">{{ $message }}</span>
                                @enderror

                            </div>
                            <div class="col">
                                <label for="register-username" class="form-label">Username</label>
                                <input type="text" class="form-control @error('username') is-invalid @enderror"
                                    id="register-username" name="username" aria-describedby="register-username"
                                    tabindex="1" value="{{ old('username') }}" required />
                                @error('username')
                                    <span class="error">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-1">

                            <div class="col">
                                <label for="register-email" class="form-label">Email</label>
                                <input type="text" class="form-control @error('email') is-invalid @enderror"
                                    id="register-email" name="email" aria-describedby="register-email" tabindex="2"
                                    value="{{ old('email') }}" required />
                                @error('email')
                                    <span class="error">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col">
                                <label for="register-phone" class="form-label">Phone Number</label>
                                <input type="text" class="form-control @error('phone') is-invalid @enderror"
                                    id="register-phone" name="phone" aria-describedby="register-phone" tabindex="2"
                                    value="{{ old('phone') }}" />
                                @error('phone')
                                    <span class="error">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="col">
                                <label for="register-password" class="form-label">Password</label>
                                <div class="input-group input-group-merge form-password-toggle">
                                    <input type="password"
                                        class="form-control @error('password') is-invalid @enderror form-control-merge"
                                        id="register-password" name="password" aria-describedby="register-password"
                                        tabindex="3" required />
                                    <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                                </div>
                                @error('password')
                                    <span class="error">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="col">
                                <label for="register-password-confirmation" class="form-label">password_confirmation</label>
                                <div class="input-group input-group-merge form-password-toggle">
                                    <input type="password"
                                        class="form-control @error('password_confirmation') is-invalid @enderror form-control-merge"
                                        id="password-confirmation" name="password_confirmation"
                                        aria-describedby="password-confirmation" tabindex="3" required />
                                    <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                                </div>
                                @error('password_confirmation')
                                    <span class="error">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="col">
                                <label for="register-email" class="form-label">Clients</label>
                                <select class="select2 form-select @error('clients') is-invalid @enderror" multiple
                                    name="clients[]" required>
                                    @foreach ($clients as $client)
                                        <option value="{{ $client->id }}">{{ $client->name }}</option>
                                    @endforeach
                                </select>
                                @error('clients')
                                    <span class="error">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                        <div>

                            <button class="btn btn-primary " type="submit" tabindex="5">Sign up</button>
                        </div>
                    </form>

                    <p class="text-center mt-2">
                        <span>Already have an account?</span>
                        <a href="{{ route('login') }}">
                            <span>Sign in instead</span>
                        </a>
                    </p>


                </div>
            </div>
            <!-- /Register basic -->
        </div>
    </div>
@endsection
