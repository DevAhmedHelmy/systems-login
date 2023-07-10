<!DOCTYPE html>
<html class="loading dark-layout" lang="en" data-layout="dark-layout" data-textdirection="ltr">
<!-- BEGIN: Head-->

<head>

    <title>Health Links</title>
    @include('layouts._styles')

    <link rel="stylesheet" type="text/css"
        href="{{ asset('admin') }}/app-assets/vendors/css/tables/datatable/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('admin') }}/app-assets/vendors/css/tables/datatable/responsive.bootstrap5.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('admin') }}/app-assets/css/plugins/extensions/ext-component-toastr.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('admin') }}/app-assets/css/plugins/extensions/ext-component-sweet-alerts.min.css">
    <!-- BEGIN: Theme CSS-->
    {{--  <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/bootstrap-extended.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/colors.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/components.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/themes/dark-layout.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/themes/bordered-layout.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/themes/semi-dark-layout.css">  --}}


    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/assets/css/style.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/assets/css/custom.css">
    <!-- END: Custom CSS-->

    <script src="{{ asset('admin') }}/app-assets/vendors/js/vendors.min.js"></script>
    <script src="{{ asset('admin') }}/app-assets/vendors/js/forms/select/select2.full.min.js"></script>
    <script src="{{ asset('admin') }}/app-assets/vendors/js/extensions/sweetalert2.all.min.js"></script>
</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="horizontal-layout horizontal-menu  navbar-floating footer-static  " data-open="hover"
    data-menu="horizontal-menu" data-col="">

    <!-- BEGIN: Header-->
    <nav class="header-navbar navbar-expand-lg navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center"
        data-nav="brand-center">
        <div class="navbar-header d-xl-block d-none">
            <ul class="nav navbar-nav" id='navbar'>
                <li class="nav-item"><a class="navbar-brand"
                        href="{{ asset('admin') }}/html/ltr/horizontal-menu-template-dark/index.html">
                        <span class="brand-logo">
                            <img src="{{ asset('admin') }}/app-assets/images/logo3.png" alt="Health Links"
                                style="max-width: 150px">
                        </span>
                    </a></li>
            </ul>
        </div>
        <div class="navbar-container d-flex content">

            <ul class="nav navbar-nav align-items-center ms-auto">

                {{--  <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-style"><i class="ficon"
                            data-feather="sun"></i></a></li>  --}}


                @auth
                    <li class="nav-item dropdown dropdown-user"><a class="nav-link dropdown-toggle dropdown-user-link"
                            id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <div class="user-nav d-sm-flex d-none"><span
                                    class="user-name fw-bolder">{{ auth()->user()->name }}</span><span
                                    class="user-status"></span></div><span class="avatar"><img class="round"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOum8r1wH4vte2O8g9f3RVuFY4h750UDELvzHXPM_67S228-eiTy54Qo4MASiW--w2qg&usqp=CAU"
                                    alt="avatar" height="40" width="40"><span
                                    class="avatar-status-online"></span></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">

                            <a class="log-out-btn dropdown-item" href="#"
                                onclick="event.preventDefault();document.getElementById('logout-form').submit();"> <i
                                    class="me-50" data-feather="power"></i> Logout </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                {{ csrf_field() }}
                            </form>



                        </div>
                    </li>
                @endauth

            </ul>
        </div>
    </nav>

    <!-- END: Header-->


    <!-- BEGIN: Main Menu-->
        @include('layouts._menu')
    <!-- END: Main Menu-->

    <!-- BEGIN: Content-->
    <div class="app-content content ">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            @yield('breadcrumbs')

                        </div>
                    </div>
                </div>

            </div>
            <div class="content-body">
                @yield('content')
                @include('layouts._message')
            </div>
        </div>
    </div>
    <!-- END: Content-->

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>

    <!-- BEGIN: Footer-->
    <footer class="footer footer-static footer-light footer-shadow">
        <p class="clearfix mb-0"><span class="float-md-start d-block d-md-inline-block mt-25">COPYRIGHT &copy;
                2023<a class="ms-25" href="" target="_blank">Health Links</a><span
                    class="d-none d-sm-inline-block">, All rights
                    Reserved</span></span>
        </p>
    </footer>
    <button class="btn btn-primary btn-icon scroll-top" type="button"><i data-feather="arrow-up"></i></button>
    <!-- END: Footer-->



    <!-- BEGIN: Page Vendor JS-->
    <script src="{{ asset('admin') }}/app-assets/vendors/js/ui/jquery.sticky.js"></script>
    <script src="{{ asset('admin') }}/app-assets/vendors/js/forms/validation/jquery.validate.min.js"></script>
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <script src="{{ asset('admin') }}/app-assets/js/core/app-menu.js"></script>
    <script src="{{ asset('admin') }}/app-assets/js/core/app.js"></script>
    <!-- END: Theme JS-->

    <script src="{{ asset('admin') }}/app-assets/vendors/js/tables/datatable/jquery.dataTables.min.js"></script>
    <script src="{{ asset('admin') }}/app-assets/vendors/js/tables/datatable/dataTables.bootstrap5.min.js"></script>
    <script src="{{ asset('admin') }}/app-assets/vendors/js/tables/datatable/dataTables.responsive.min.js"></script>
    <script src="{{ asset('admin') }}/app-assets/vendors/js/tables/datatable/responsive.bootstrap5.min.js"></script>
    <!-- BEGIN: Page JS-->
    <!-- END: Page JS-->

    <script>
        $('.select2').select2();
        $(window).on('load', function() {
            if (feather) {
                feather.replace({
                    width: 14,
                    height: 14
                });
            }
        })
    </script>


    @stack('js')
    @stack('css')
</body>
<!-- END: Body-->

</html>
