@extends('layouts.master')
@section('breadcrumbs')
    <h2 class="content-header-title float-start mb-0">Users</h2>
    <div class="breadcrumb-wrapper">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Update User Data
            </li>
        </ol>
    </div>
@endsection
@section('content')
    <div class="row">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Update User Data</h4>
                    </div>
                    <div class="card-body">
                        <form class="auth-register-form mt-2" method="POST" action="{{ route('users.update', $user) }}">
                            @csrf
                            @method('PUT')
                            <div class="row mb-1">
                                <div class="col ">
                                    <label for="register-name" class="form-label">Name</label>
                                    <input type="text" class="form-control @error('name') is-invalid @enderror"
                                        id="register-name" name="name" aria-describedby="register-name" tabindex="1"
                                        autofocus value="{{ $user->name }}" required />
                                    @error('name')
                                        <span class="error">{{ $message }}</span>
                                    @enderror

                                </div>
                                <div class="col">
                                    <label for="register-username" class="form-label">Username</label>
                                    <input type="text" class="form-control @error('username') is-invalid @enderror"
                                        id="register-username" name="username" aria-describedby="register-username"
                                        tabindex="1" value="{{ $user->username }}" required />
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
                                        value="{{ $user->email }}" required />
                                    @error('email')
                                        <span class="error">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="col">
                                    <label for="register-phone" class="form-label">Phone Number</label>
                                    <input type="text" class="form-control @error('phone') is-invalid @enderror"
                                        id="register-phone" name="phone" aria-describedby="register-phone" tabindex="2"
                                        value="{{ $user->phone }}" />
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
                                            tabindex="3" />
                                        <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                                    </div>
                                    @error('password')
                                        <span class="error">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="col">
                                    <label for="register-password-confirmation"
                                        class="form-label">password_confirmation</label>
                                    <div class="input-group input-group-merge form-password-toggle">
                                        <input type="password"
                                            class="form-control @error('password_confirmation') is-invalid @enderror form-control-merge"
                                            id="password-confirmation" name="password_confirmation"
                                            aria-describedby="password-confirmation" tabindex="3" />
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
                                            <option @selected($user->clients->contains($client)) value="{{ $client->id }}">
                                                {{ $client->name }}</option>
                                        @endforeach
                                    </select>
                                    @error('clients')
                                        <span class="error">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-primary " type="submit" tabindex="5">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
