   <div class="horizontal-menu-wrapper">
       <div class="header-navbar navbar-expand-sm navbar navbar-horizontal floating-nav navbar-dark navbar-shadow menu-border container-xxl"
           role="navigation" data-menu="menu-wrapper" data-menu-type="floating-nav">
           <div class="navbar-header">
               <ul class="nav navbar-nav flex-row">
                   <li class="nav-item me-auto"><a class="navbar-brand" href="{{ route('clients.index') }}"><span
                               class="brand-logo">
                           </span>
                           <h2 class="brand-text mb-0">Vuexy</h2>
                       </a></li>
                   <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pe-0"
                           data-bs-toggle="collapse"><i class="d-block d-xl-none text-primary toggle-icon font-medium-4"
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
                                       href="{{ route('clients.index') }}" data-bs-toggle="" data-i18n="Email"> <i
                                           data-feather="message-square"></i><span data-i18n="Email">Clients
                                           List</span></a>
                               </li>
                               <li @class(['active' => request()->routeIs('clients.create')]) data-menu=""><a
                                       class="dropdown-item d-flex align-items-center"
                                       href="{{ route('clients.create') }}" data-bs-toggle="" data-i18n="Chat">
                                       <i data-feather="message-square"></i>
                                       <span data-i18n="Chat">Add New</span></a>
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
