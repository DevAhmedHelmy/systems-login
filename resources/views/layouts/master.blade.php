<!DOCTYPE html>
<html class="loading dark-layout" lang="en" data-layout="dark-layout" data-textdirection="ltr">
<!-- BEGIN: Head-->

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">

    <title>Health Links</title>
    <link rel="apple-touch-icon" href="{{ asset('admin') }}/app-assets/images/ico/apple-icon-120.png">
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('admin') }}/app-assets/images/diamond.jpeg">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600"
        rel="stylesheet">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/vendors/css/vendors.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('admin') }}/app-assets/vendors/css/forms/select/select2.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('admin') }}/app-assets/vendors/css/tables/datatable/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('admin') }}/app-assets/vendors/css/tables/datatable/responsive.bootstrap5.min.css">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/bootstrap-extended.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/colors.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/components.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/themes/dark-layout.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/themes/bordered-layout.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/app-assets/css/themes/semi-dark-layout.css">

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css"
        href="{{ asset('admin') }}/app-assets/css/core/menu/menu-types/horizontal-menu.css">
    <!-- END: Page CSS-->

    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin') }}/assets/css/style.css">
    <!-- END: Custom CSS-->

    <script src="{{ asset('admin') }}/app-assets/vendors/js/vendors.min.js"></script>
    <script src="{{ asset('admin') }}/app-assets/vendors/js/forms/select/select2.full.min.js"></script>
</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="horizontal-layout horizontal-menu  navbar-floating footer-static  " data-open="hover"
    data-menu="horizontal-menu" data-col="">

    <!-- BEGIN: Header-->
    <nav class="header-navbar navbar-expand-lg navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center"
        data-nav="brand-center">
        <div class="navbar-header d-xl-block d-none">
            <ul class="nav navbar-nav">
                <li class="nav-item"><a class="navbar-brand"
                        href="{{ asset('admin') }}/html/ltr/horizontal-menu-template-dark/index.html">
                        <span class="brand-logo">
                            <img src="{{ asset('admin') }}/app-assets/images/logo3.png" alt="Health Links">
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
                                {{-- <a class="dropdown-item" href="{{ route('users.edit', auth()->user()->id) }}"><i class="me-50"
                                    data-feather="user"></i> Profile</a> --}}

                                <a class="log-out-btn dropdown-item" href="#"
                                    onclick="event.preventDefault();document.getElementById('logout-form').submit();"> <i
                                        class="me-50" data-feather="power"></i> Logout </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>



                            </div>
                        </li>
                    @endauth
                {{--  <li class="nav-item dropdown dropdown-user"><a class="nav-link dropdown-toggle dropdown-user-link"
                        id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <div class="user-nav d-sm-flex d-none"><span class="user-name fw-bolder">John Doe</span><span
                                class="user-status">Admin</span></div><span class="avatar"><img class="round"
                                src="{{ asset('admin') }}/app-assets//images/portrait/small/avatar-s-11.jpg"
                                alt="avatar" height="40" width="40"><span
                                class="avatar-status-online"></span></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user"><a
                            class="dropdown-item" href="page-profile.html"><i class="me-50" data-feather="user"></i>
                            Profile</a>
                        <a class="dropdown-item" href="auth-login-cover.html"><i class="me-50"
                                data-feather="power"></i> Logout</a>
                    </div>
                </li>  --}}
            </ul>
        </div>
    </nav>

    <!-- END: Header-->


    <!-- BEGIN: Main Menu-->
    <div class="horizontal-menu-wrapper">
        <div class="header-navbar navbar-expand-sm navbar navbar-horizontal floating-nav navbar-dark navbar-shadow menu-border container-xxl"
            role="navigation" data-menu="menu-wrapper" data-menu-type="floating-nav">
            <div class="navbar-header">
                <ul class="nav navbar-nav flex-row">
                    <li class="nav-item me-auto"><a class="navbar-brand"
                            href="{{ asset('admin') }}/html/ltr/horizontal-menu-template-dark/index.html"><span
                                class="brand-logo">
                            </span>
                            <h2 class="brand-text mb-0">Vuexy</h2>
                        </a></li>
                    <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pe-0"
                            data-bs-toggle="collapse"><i
                                class="d-block d-xl-none text-primary toggle-icon font-medium-4"
                                data-feather="x"></i></a></li>
                </ul>
            </div>
            <div class="shadow-bottom"></div>
            <!-- Horizontal menu content-->
            <div class="navbar-container main-menu-content" data-menu="menu-container">

                <ul class="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
                    @if (auth()->user()->role == 'admin')
                        <li class="dropdown nav-item" data-menu="dropdown"><a
                                class="dropdown-toggle nav-link d-flex align-items-center" href="#"
                                data-bs-toggle="dropdown">
                                <span data-i18n="Apps"><i data-feather="home"></i> Clients</span></a>
                            <ul class="dropdown-menu" data-bs-popper="none">
                                <li @class([
                                    'active' =>
                                        request()->routeIs('clients.index') ||
                                        request()->routeIs('clients.show') ||
                                        request()->routeIs('clients.edit'),
                                ]) data-menu=""><a
                                        class="dropdown-item d-flex align-items-center"
                                        href="{{ route('clients.index') }}" data-bs-toggle="" data-i18n="Email"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-mail">
                                            <path
                                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                            </path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg><span data-i18n="Email">Clients List</span></a>
                                </li>
                                <li @class(['active' => request()->routeIs('clients.create')]) data-menu=""><a
                                        class="dropdown-item d-flex align-items-center"
                                        href="{{ route('clients.create') }}" data-bs-toggle="" data-i18n="Chat"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-message-square">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
                                            </path>
                                        </svg><span data-i18n="Chat">Add New</span></a>
                                </li>

                            </ul>
                        </li>
                        <li @class([
                            'dropdown',
                            'nav-item',
                            'active' => request()->routeIs('users.index'),
                        ])>
                            <a class="nav-link d-flex align-items-center" href="/users"><i
                                    data-feather="users"></i><span data-i18n="Users">Users</span></a>
                        </li>
                    @else
                        <li class="dropdown nav-item active">
                            <a class=" nav-link d-flex align-items-center" href="/"><i
                                    data-feather="home"></i><span data-i18n="Dashboards">Clients</span></a>

                        </li>
                    @endif

                </ul>
            </div>
        </div>
    </div>
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
