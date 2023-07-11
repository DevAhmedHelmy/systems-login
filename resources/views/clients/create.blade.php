@extends('layouts.master')
@section('breadcrumbs')
    <h2 class="content-header-title float-start mb-0">Clients</h2>
    <div class="breadcrumb-wrapper">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Add New Client
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
                        <h4 class="card-title">Add New Client</h4>
                    </div>
                    <div class="card-body">
                        <form class="form form-vertical" method="POST" action="{{ route('clients.store') }}">
                            @csrf
                            <div class="row">
                                <div class="col-12">
                                    <div class="mb-1">
                                        <label class="form-label" for="name">Client Name</label>
                                        <input type="text" id="name"
                                            class="form-control @error('name') is-invalid @enderror" name="name"
                                            placeholder="Client Name" value="{{ old('name') }}" required>
                                    </div>
                                    @error('name')
                                        <span class="error">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="col-12">
                                    <div class="mb-1">
                                        <label class="form-label" for="domain">Client Domain</label>
                                        <input type="text" id="domain"
                                            class="form-control @error('domain') is-invalid @enderror" name="domain"
                                            placeholder="Client Domain" value="{{ old('domain') }}" required>
                                    </div>
                                    @error('domain')
                                        <span class="error">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="col-12">
                                    <div class="mb-1">
                                        <label class="form-label" for="api_key">Api key</label>
                                        <input type="text" id="api_key"
                                            class="form-control @error('api_key') is-invalid @enderror" name="api_key"
                                            placeholder="Api key" value="{{ old('api_key') }}">
                                    </div>
                                    @error('api_key')
                                        <span class="error">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="col-12">
                                    <div class="mb-1">
                                        <label class="form-label" for="users">Assigne To Users</label>
                                        <select class="select2 form-select @error('users') is-invalid @enderror" multiple
                                            name="users[]">
                                            @foreach ($users as $user)
                                                <option value="{{ $user->id }}">{{ $user->name }}</option>
                                            @endforeach
                                        </select>
                                        @error('users')
                                            <span class="error">{{ $message }}</span>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-12">
                                    <button type="submit"
                                        class="btn btn-primary me-1 waves-effect waves-float waves-light">Submit</button>
                                    <button type="reset" class="btn btn-outline-secondary waves-effect">Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
