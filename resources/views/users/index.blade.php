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
                            if (row.is_active == 0) {
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
    <script>
        function updateUserActive(id) {
            $("#active-" + id).addClass("d-none");
            $("#activeSpinner-" + id).removeClass("d-none");
            const user = '/users/' + id + '/toggle_active'
            Swal.fire({
                title: "Are you sure?",
                text: `You will update user status!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        url: user,
                        type: 'POST',
                        DataType: 'json',
                        data: {
                            "_token": "{{ csrf_token() }}"
                        },
                        success: function(response) {
                            Swal.fire({
                                title: 'Updated!',
                                text: 'user has been Updated.',
                                type: 'success',
                                timer: 2000,
                            }).then((result) => {
                                if (result.value) {

                                    var span = '';
                                    if (response.is_active == 0) {
                                        span +=
                                            "<a  href='javascript:void(0)' class='ml-2' id='active-" +
                                            id +
                                            "'onClick='updateUserActive(" + id +
                                            ")'>" +

                                            '<span class="badge badge-light-success rounded-pill ms-auto me-1 active-agent">Active</span></a>' +
                                            "<span class='spinner-border text-secondary ml-2 mr-2 d-none'  role='status'  id='activeSpinner-" +
                                            id +
                                            "'>" + "</span>";
                                    } else {
                                        span +=
                                            "<a  href='javascript:void(0)' class='ml-2' id='active-" +
                                            id +
                                            "'onClick='updateUserActive(" + id +
                                            ")'>" +

                                            '<span class="badge badge-light-danger rounded-pill ms-auto me-1 active-agent">Unactive</span></a>' +
                                            "<span class='spinner-border text-secondary ml-2 mr-2 d-none'  role='status'  id='activeSpinner-" +
                                            id +
                                            "'>" + "</span>";

                                    }
                                    $(`#active-${id}`).closest('td').closest('tr').find(
                                        'td:eq(3)').html(span)
                                    $("#activeSpinner-" + id).addClass("d-none");
                                    $("#active-" + id).removeClass("d-none");
                                }
                            });

                        },
                        error: function(error) {

                            Swal.fire({
                                title: 'Error!',
                                text: error.responseJSON.message,
                                type: 'error',
                                timer: 5000,
                            })
                            $("#active-" + id).removeClass("d-none");
                            $("#activeSpinner-" + id).addClass("d-none");
                        }
                    });
                } else if (result.dismiss === "cancel") {
                    Swal.fire(
                        "Cancelled",
                        "Your imaginary file is safe :)",
                        "error"
                    )
                    $("#active-" + id).removeClass("d-none");
                    $("#activeSpinner-" + id).addClass("d-none");
                }
            })
        }
    </script>
@endpush
