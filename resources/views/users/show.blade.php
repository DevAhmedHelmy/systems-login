@extends('layouts.master')
@section('breadcrumbs')
    <h2 class="content-header-title float-start mb-0">Users</h2>
    <div class="breadcrumb-wrapper">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">User Details
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
                         <h5>User Details</h5>
                        <div class="col">

                            <p>
                                Name : {{ $user->name }}
                            </p>
                        </div>
                        <div class="col">
                            <p>
                                Email : {{ $user->email }}
                            </p>
                        </div>
                        <div class="col">
                            <p>
                                Username : {{ $user->username }}
                            </p>
                        </div>
                        <div class="col">
                            <p>
                                User Status : @if ($user->is_active)
                                    <span class="badge rounded-pill badge-light-success me-1">Active</span>
                                @else
                                    <span class="badge rounded-pill badge-light-danger me-1">UnActive</span>
                                @endif
                            </p>
                        </div>
                        <div class="col">
                            <p>
                                Clients Count : {{ $user->clients->count() }}
                            </p>
                        </div>

                    </div>
                    <br>
                    <h5>Clients Details</h5>
                    <hr>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <th>#</th>
                                <th>Client Name</th>
                                <th>Client Domain</th>

                                <th>Status</th>
                            </thead>
                            <tbody>
                                @foreach ($user->clients as $key => $client)
                                    <tr>
                                        <td>{{ $key + 1 }}</td>
                                        <td>{{ $client->name }}</td>
                                        <td>{{ $client->domain }}</td>
                                        <td>
                                            @if ($client->is_active)
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
