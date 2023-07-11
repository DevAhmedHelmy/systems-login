@extends('layouts.master')
@section('breadcrumbs')
    <h2 class="content-header-title float-start mb-0">Clients</h2>
    <div class="breadcrumb-wrapper">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Client Details
            </li>
        </ol>
    </div>
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <h5>Client Details</h5>
                        <div class="col">

                            <p>
                                Name : {{ $client->name }}
                            </p>
                        </div>
                        <div class="col">

                            <p>
                                Domain : {{ $client->domain }}
                            </p>
                        </div>
                        <div class="col">
                            <p>
                                Status : @if ($client->is_active)
                                    <span class="badge rounded-pill badge-light-success me-1">Active</span>
                                @else
                                    <span class="badge rounded-pill badge-light-danger me-1">UnActive</span>
                                @endif
                            </p>
                        </div>
                        <div class="col">
                            <p>
                                Users Count : {{ $client->users->count() }}
                            </p>
                        </div>

                    </div>
                    <br>
                    <h5>Users Details</h5>
                    <hr>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                @foreach ($client->users as $key => $user)
                                    <tr>
                                        <td>{{ $key + 1 }}</td>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->username }}</td>
                                        <td>{{ $user->email }}</td>
                                        <td>
                                            @if ($user->is_active)
                                                <span class="badge rounded-pill badge-light-success me-1">Active</span>
                                            @else
                                                <span class="badge rounded-pill badge-light-danger me-1">UnActive</span>
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
