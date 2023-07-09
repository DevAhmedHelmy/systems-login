@extends('layouts.master')
@section('breadcrumbs')
    <h2 class="content-header-title float-start mb-0">Users</h2>
    <div class="breadcrumb-wrapper">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active">Users List
            </li>
        </ol>
    </div>
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header border-bottom d-flex justify-content-between align-items-center">

                    <div>
                        <h6>Users List</h6>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-datatable">
                        <table class="datatables-basic2 table" id="users">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('js')
    <script>
        $(document).ready(function() {
            $('#users').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: "{{ route('users.data') }}",
                    dataType: 'json',
                    type: 'GET'
                },
                columns: [{
                        data: 'name'
                    },
                    {
                        data: 'email'
                    },
                    {
                        data: 'role'
                    },
                    {
                        data: ''
                    },
                    {
                        data: ''
                    }
                ],
                columnDefs: [{
                        targets: [-2],
                        render: (data, type, row, meta) => {
                            var span = '';
                            if (row.is_active == 1) {
                                span +=
                                    "<a  href='javascript:void(0)' class='ml-2' id='active-" +
                                    row.id +
                                    "'onClick='updateUserActive(" + row.id +
                                    ")'>" +

                                    '<span class="badge badge-light-success rounded-pill ms-auto me-1 active-agent">Active</span></a>' +
                                    "<span class='spinner-border text-secondary ml-2 mr-2 d-none'  role='status'  id='activeSpinner-" +
                                    row.id +
                                    "'>" + "</span>";
                            } else {
                                span +=
                                    "<a  href='javascript:void(0)' class='ml-2' id='active-" +
                                    row.id +
                                    "'onClick='updateUserActive(" + row.id +
                                    ")'>" +

                                    '<span class="badge badge-light-danger rounded-pill ms-auto me-1 active-agent">Unactive</span></a>' +
                                    "<span class='spinner-border text-secondary ml-2 mr-2 d-none'  role='status'  id='activeSpinner-" +
                                    row.id +
                                    "'>" + "</span>";

                            }
                            return (span)

                        }
                    },
                    {
                        targets: [-1],
                        width: '5%',
                        title: 'Actions',
                        orderable: false,
                        render: (data, type, row, meta) => {
                            let viewIcon = '<a class="icon-view" href="/users/' + row
                                .id + '"' + '>' +
                                feather.icons['eye'].toSvg({
                                    class: 'font-small-4'
                                }) +
                                '</a>';
                            var editIcon = '<a class="icon-view" href="/users/' + row.id +
                                '/edit"' + '>' +
                                feather.icons['edit'].toSvg({
                                    class: 'font-small-4'
                                }) +
                                '</a>';

                            var deleteIcon = '<a class="delete-user" data-id="' + row.id + '"' +
                                '>' + feather.icons['trash-2'].toSvg({
                                    class: 'font-small-4'
                                }) + '</a>';
                            return (
                                "<div class='d-flex justify-content-between align-items-center'>" +
                                viewIcon +
                                "" +
                                editIcon +
                                "</div>"
                            );
                        }

                    }
                ],
                displayLength: 15,
                lengthMenu: [15, 25, 50, 100],
            });
        });
    </script>
@endpush
