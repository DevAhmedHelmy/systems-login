@extends('layouts.master')
@section('breadcrumbs')
    <h2 class="content-header-title float-start mb-0">Clients</h2>
    <div class="breadcrumb-wrapper">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Clients List
            </li>
        </ol>
    </div>
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            @if (auth()->user()->role == 'admin')
                @include('clients.admin')
            @else
                @include('clients.user')
            @endif
        </div>
    </div>
@endsection
