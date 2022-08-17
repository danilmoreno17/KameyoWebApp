/* eslint-disable prettier/prettier */
<template>
  <div id="left-sidebar" class="sidebar">
    <div class="">
      <div class="user-account">
        <img :src="'../../../assets/user.png'" class="rounded-circle user-photo" alt="User Profile Picture" />
        <div class="dropdown" v-bind:class="{ show: dropActive }" @click="dropActive = !dropActive">
          <!-- v-clickOutside="outside" -->
          <span>Welcome, </span>
          <a
            href="javascript:void(0);"
            class="dropdown-toggle user-name"
            data-toggle="dropdown"
            :aria-expanded="dropActive ? 'true' : 'false'"
            ><strong>{{ this.userName }}</strong></a
          >
          <ul
            class="dropdown-menu dropdown-menu-right account"
            v-bind:class="{ show: dropActive }"
            :style="
              dropActive
                ? 'top: 100%; position: absolute; transform: translate3d(-52px, 42px, 0px); left: 0px; will-change: transform;'
                : 'top: 80%; position: absolute; transform: translate3d(-52px, 42px, 0px); left: 0px; will-change: transform;'
            "
          >
            <li>
              <router-link to="/pages/page-profile2"><i class="icon-user"></i>My Profile</router-link>
            </li>
            <!-- <li>
              <router-link to="/app/app-inbox"
                ><i class="icon-envelope-open"></i>Messages</router-link
              >
            </li> -->
            <!--
            <li>
              <a href="javascript:void(0);"
                ><i class="icon-settings"></i>Settings</a
              >
            </li>

            -->
            <li class="divider"></li>
            <li>
              <router-link to="/authentication/page-login"><i class="icon-power"></i>Logout</router-link>
            </li>
          </ul>
        </div>
        <hr />
        <ul class="row list-unstyled">
          <li class="col-4">
            <small>Sales</small>
            <h6>456</h6>
          </li>
          <li class="col-4">
            <small>Order</small>
            <h6>1350</h6>
          </li>
          <li class="col-4">
            <small>Revenue</small>
            <h6>$2.13B</h6>
          </li>
        </ul>
      </div>
      <!-- Nav tabs -->
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            v-on:click="setActiveNavtab('Menu')"
            :class="{ 'active show': openNavtab('Menu') }"
            data-toggle="tab"
            >Menu</a
          >
        </li>
        <!-- <li class="nav-item">
          <a
            class="nav-link"
            v-on:click="setActiveNavtab('Book')"
            :class="{ 'active show': openNavtab('Book') }"
            data-toggle="tab"
            ><i class="icon-book-open"></i
          ></a>
        </li> -->
        <!--
        <li class="nav-item">
          <a
            class="nav-link"
            v-on:click="setActiveNavtab('Setting')"
            :class="{ 'active show': openNavtab('Setting') }"
            data-toggle="tab"
            ><i class="icon-settings"></i
          ></a>
        </li>
        -->
        <li class="nav-item">
          <a
            class="nav-link"
            v-on:click="setActiveNavtab('Question')"
            :class="{ 'active show': openNavtab('Question') }"
            data-toggle="tab"
            ><i class="icon-question"></i
          ></a>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content p-l-0 p-r-0">
        <div class="tab-pane" :class="{ 'active show': openNavtab('Menu') }" id="menu">
          <nav id="left-sidebar-nav" class="sidebar-nav">
            <ul id="main-menu" class="metismenu">
              <li
                v-for="(m, idx) of this.menus.filter((x) => x.menuParentId == null)"
                :key="idx"
                v-bind:class="{ active: currentActiveMenu == m.name }"
              >
                <a class="has-arrow" v-on:click="setActive(m.name)">
                  <i :class="m.icon"></i> <span>{{ m.name }}</span>
                </a>
                <ul v-if="currentActiveMenu === m.name">
                  <li
                    v-for="(sm, idx1) of this.menus.filter((x) => x.menuParentId == m.menuId)"
                    :key="idx1"
                    v-bind:class="{ active: currentRoutePath == sm.url }"
                  >
                    <router-link :to="sm.url">{{ sm.name }}</router-link>
                  </li>
                </ul>
              </li>

              <!-- <li v-bind:class="{ active: currentActiveMenu == 'dashboard' }">
                <a class="has-arrow" v-on:click="setActive('dashboard')">
                  <i class="icon-home"></i> <span>Dashboard</span>
                </a>
                <ul v-if="currentActiveMenu === 'dashboard'">
                  <li v-bind:class="{ active: currentRoutePath == '/dashboard/index' }">
                    <router-link to="/dashboard/index">Analytical</router-link>
                  </li>
                </ul>
              </li> -->

              <!-- <li :class="{ active: currentActiveMenu === 'maintenance' }">
                <a class="has-arrow" v-on:click="setActive('maintenance')">
                  <i class="icon-grid"></i> <span>Mantenimientos</span>
                </a>
                <ul v-if="currentActiveMenu === 'maintenance'">
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/maintenance-company' }">
                    <router-link to="/maintenance/maintenance-company">Empresas</router-link>
                  </li>
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/maintenance-clients' }">
                    <router-link to="/maintenance/maintenance-clients">Clientes</router-link>
                  </li>
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/maintenance-projects' }">
                    <router-link to="/maintenance/maintenance-projects">Proyectos</router-link>
                  </li>
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/maintenance-catalogs' }">
                    <router-link to="/maintenance/maintenance-catalogs">Catalogos</router-link>
                  </li>
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/maintenance-users' }">
                    <router-link to="/maintenance/maintenance-users">Usuarios</router-link>
                  </li>
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/roles' }">
                    <router-link to="/maintenance/roles">Roles</router-link>
                  </li>
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/maintenance-subsidiary' }">
                    <router-link to="/maintenance/maintenance-subsidiary">Filiales</router-link>
                  </li>
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/maintenance-contact' }">
                    <router-link to="/maintenance/maintenance-contact">Contactos de Clientes</router-link>
                  </li>
                  <li v-bind:class="{ active: currentRoutePath == '/maintenance/maintenance-employee' }">
                    <router-link to="/maintenance/maintenance-employee">Empleados</router-link>
                  </li>
                </ul>
              </li> -->

              <!-- <li :class="{ active: currentActiveMenu === 'movements' }">
                <a class="has-arrow" v-on:click="setActive('movements')"
                  ><i class="icon-folder"></i> <span>Movimientos</span></a
                >
                <ul v-if="currentActiveMenu === 'movements'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/movements/movement-billing',
                    }"
                  >
                    <router-link to="/movements/movement-billing">Facturacion</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/movements/movement-project-activities',
                    }"
                  >
                    <router-link to="/movements/movement-project-activities">Actividades proyecto</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/movements/movement-project-reporte',
                    }"
                  >
                    <router-link to="/movements/movement-project-report">Reporte de Proyectos</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active:
                        currentRoutePath ==
                        '/movements/movement-subsidiary',
                    }"
                  >
                    <router-link to="/movements/movement-subsidiary"
                      >Filiales</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active:
                        currentRoutePath == '/movements/movement-contact',
                    }"
                  >
                    <router-link to="/movements/movement-contact"
                      >Contactos de Clientes</router-link
                    >
                  </li>
                </ul>
              </li> -->

              <!-- <li :class="{ active: currentActiveMenu === 'reports' }">
                <a class="has-arrow" v-on:click="setActive('reports')"
                  ><i class="icon-globe"></i> <span>Reportes</span></a
                >
                <ul v-if="currentActiveMenu === 'reports'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/reports/report-projects-activities',
                    }"
                  >
                    <router-link to="/reports/report-projects-activities">Proyectos y actividades</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/reports/report-billing-activities',
                    }"
                  >
                    <router-link to="/reports/report-billing-activities">Facturación vs Actividades</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/reports/report-unified-client-states',
                    }"
                  >
                    <router-link to="/reports/report-unified-client-states">Estados de Clientes Unificados</router-link>
                  </li>
                </ul>
              </li> -->

              <!-- <li :class="{ active: currentActiveMenu === 'ui-elements' }">
                <a class="has-arrow" v-on:click="setActive('ui-elements')"
                  ><i class="icon-diamond"></i> <span>UI Elements</span></a
                >
                <ul v-if="currentActiveMenu === 'ui-elements'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-typography',
                    }"
                  >
                    <router-link to="/ui-elements/ui-typography"
                      >Typography</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-tabs',
                    }"
                  >
                    <router-link to="/ui-elements/ui-tabs">Tabs</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-buttons',
                    }"
                  >
                    <router-link to="/ui-elements/ui-buttons"
                      >Buttons</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-bootstrap',
                    }"
                  >
                    <router-link to="/ui-elements/ui-bootstrap"
                      >Bootstrap UI</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-icons',
                    }"
                  >
                    <router-link to="/ui-elements/ui-icons">Icons</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active:
                        currentRoutePath == '/ui-elements/ui-notifications',
                    }"
                  >
                    <router-link to="/ui-elements/ui-notifications"
                      >Notifications</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-colors',
                    }"
                  >
                    <router-link to="/ui-elements/ui-colors"
                      >Colors</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-listgroup',
                    }"
                  >
                    <router-link to="/ui-elements/ui-listgroup"
                      >List Group</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-media',
                    }"
                  >
                    <router-link to="/ui-elements/ui-media"
                      >Media Object</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/ui-elements/ui-modals',
                    }"
                  >
                    <router-link to="/ui-elements/ui-modals"
                      >Modals</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active:
                        currentRoutePath == '/ui-elements/ui-progressbars',
                    }"
                  >
                    <router-link to="/ui-elements/ui-progressbars"
                      >Progress Bars</router-link
                    >
                  </li>
                </ul>
              </li>
              <li :class="{ active: currentActiveMenu === 'widgets' }">
                <a class="has-arrow" v-on:click="setActive('widgets')"
                  ><i class="icon-puzzle"></i> <span>Widgets</span></a
                >
                <ul v-if="currentActiveMenu === 'widgets'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/widgets/widgets-data',
                    }"
                  >
                    <router-link to="/widgets/widgets-data">Data</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/widgets/widgets-weather',
                    }"
                  >
                    <router-link to="/widgets/widgets-weather"
                      >Weather</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/widgets/widgets-blog',
                    }"
                  >
                    <router-link to="/widgets/widgets-blog">Blog</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/widgets/widgets-ecommerce',
                    }"
                  >
                    <router-link to="/widgets/widgets-ecommerce"
                      >eCommerce</router-link
                    >
                  </li>
                </ul>
              </li>
              <li :class="{ active: currentActiveMenu === 'authentication' }">
                <a class="has-arrow" v-on:click="setActive('authentication')"
                  ><i class="icon-lock"></i> <span>Authentication</span></a
                >
                <ul v-if="currentActiveMenu === 'authentication'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/authentication/page-login',
                    }"
                  >
                    <router-link to="/authentication/page-login"
                      >Login</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active:
                        currentRoutePath == '/authentication/page-register',
                    }"
                  >
                    <router-link to="/authentication/page-register"
                      >Register</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active:
                        currentRoutePath == '/authentication/page-lockscreen',
                    }"
                  >
                    <router-link to="/authentication/page-lockscreen"
                      >Lockscreen</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active:
                        currentRoutePath ==
                        '/authentication/page-forgot-password',
                    }"
                  >
                    <router-link to="/authentication/page-forgot-password"
                      >Forgot Password</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/authentication/page-404',
                    }"
                  >
                    <router-link to="/authentication/page-404"
                      >Page 404</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/authentication/page-403',
                    }"
                  >
                    <router-link to="/authentication/page-403"
                      >Page 403</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/authentication/page-500',
                    }"
                  >
                    <router-link to="/authentication/page-500"
                      >Page 500</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/authentication/page-503',
                    }"
                  >
                    <router-link to="/authentication/page-503"
                      >Page 503</router-link
                    >
                  </li>
                </ul>
              </li>
              <li :class="{ active: currentActiveMenu === 'pages' }">
                <a class="has-arrow" v-on:click="setActive('pages')"
                  ><i class="icon-docs"></i> <span>Pages</span></a
                >
                <ul v-if="currentActiveMenu === 'pages'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-blank',
                    }"
                  >
                    <router-link to="/pages/page-blank">Blank Page</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-profile',
                    }"
                  >
                    <router-link to="/pages/page-profile"
                      >Profile
                      <span class="badge badge-default float-right"
                        >v2</span
                      ></router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-profile2',
                    }"
                  >
                    <router-link to="/pages/page-profile2"
                      >Profile
                      <span class="badge badge-warning float-right"
                        >v2</span
                      ></router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-gallery',
                    }"
                  >
                    <router-link to="/pages/page-gallery"
                      >Image Gallery</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-timeline',
                    }"
                  >
                    <router-link to="/pages/page-timeline"
                      >Timeline</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-pricing',
                    }"
                  >
                    <router-link to="/pages/page-pricing">Pricing</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-invoices',
                    }"
                  >
                    <router-link to="/pages/page-invoices"
                      >Invoices</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-invoices2',
                    }"
                  >
                    <router-link to="/pages/page-invoices2"
                      >Invoices<span class="badge badge-warning float-right"
                        >v2</span
                      ></router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-search-results',
                    }"
                  >
                    <router-link to="/pages/page-search-results"
                      >Search Results</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-helper-class',
                    }"
                  >
                    <router-link to="/pages/page-helper-class"
                      >Helper Classes</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-teams-board',
                    }"
                  >
                    <router-link to="/pages/page-teams-board"
                      >Teams Board</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-projects-list',
                    }"
                  >
                    <router-link to="/pages/page-projects-list"
                      >Projects List</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-maintanance',
                    }"
                  >
                    <router-link to="/pages/page-maintanance"
                      >Maintenance</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-testimonials',
                    }"
                  >
                    <router-link to="/pages/page-testimonials"
                      >Testimonials</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/pages/page-faq',
                    }"
                  >
                    <router-link to="/pages/page-faq">FAQ</router-link>
                  </li>
                </ul>
              </li>
              <li :class="{ active: currentActiveMenu === 'forms' }">
                <a class="has-arrow" v-on:click="setActive('forms')"
                  ><i class="icon-pencil"></i> <span>Forms</span></a
                >
                <ul v-if="currentActiveMenu === 'forms'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/forms/forms-validation',
                    }"
                  >
                    <router-link to="/forms/forms-validation"
                      >Form Validation</router-link
                    >
                  </li>
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/forms/forms-basic',
                    }"
                  >
                    <router-link to="/forms/forms-basic"
                      >Basic Elements</router-link
                    >
                  </li>
                </ul>
              </li>
              <li :class="{ active: currentActiveMenu === 'tables' }">
                <a v-on:click="setActive('tables')" class="has-arrow"
                  ><i class="icon-tag"></i> <span>Tables</span></a
                >
                <ul v-if="currentActiveMenu === 'tables'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/table/table-normal',
                    }"
                  >
                    <router-link to="/table/table-normal"
                      >Normal Tables</router-link
                    >
                  </li>
                </ul>
              </li>
              <li :class="{ active: currentActiveMenu === 'charts' }">
                <a class="has-arrow" v-on:click="setActive('charts')"
                  ><i class="icon-bar-chart"></i> <span>Charts</span></a
                >
                <ul v-if="currentActiveMenu === 'charts'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/charts/chart-echarts',
                    }"
                  >
                    <router-link to="/charts/chart-echarts"
                      >E-Charts</router-link
                    >
                  </li>
                </ul>
              </li>
              <li :class="{ active: currentActiveMenu === 'maps' }">
                <a class="has-arrow" v-on:click="setActive('maps')"
                  ><i class="icon-map"></i> <span>Maps</span></a
                >
                <ul v-if="currentActiveMenu === 'maps'">
                  <li
                    v-bind:class="{
                      active: currentRoutePath == '/maps/map-leaflet',
                    }"
                  >
                    <router-link to="/maps/map-leaflet">Leaflet</router-link>
                  </li>
                </ul>
              </li> -->
            </ul>
          </nav>
        </div>
        <!-- <div
          class="tab-pane p-l-15 p-r-15"
          :class="{ 'active show': openNavtab('Book') }"
          id="Chat"
        >
          <form>
            <div class="input-group m-b-20">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="icon-magnifier"></i
                ></span>
              </div>
              <input type="text" class="form-control" placeholder="Search..." />
            </div>
          </form>
          <ul class="right_chat list-unstyled">
            <li class="online">
              <a href="javascript:void(0);">
                <div class="media">
                  <img
                    class="media-object"
                    src="../../../assets/user.png"
                    alt=""
                  />
                  <div class="media-body">
                    <span class="name">Chris Fox</span>
                    <span class="message">Designer, Blogger</span>
                    <span class="badge badge-outline status"></span>
                  </div>
                </div>
              </a>
            </li>
            <li class="online">
              <a href="javascript:void(0);">
                <div class="media">
                  <img
                    class="media-object"
                    src="../../../assets/user.png"
                    alt=""
                  />
                  <div class="media-body">
                    <span class="name">Joge Lucky</span>
                    <span class="message">Java Developer</span>
                    <span class="badge badge-outline status"></span>
                  </div>
                </div>
              </a>
            </li>
            <li class="offline">
              <a href="javascript:void(0);">
                <div class="media">
                  <img
                    class="media-object"
                    src="../../../assets/user.png"
                    alt=""
                  />
                  <div class="media-body">
                    <span class="name">Isabella</span>
                    <span class="message">CEO, Thememakker</span>
                    <span class="badge badge-outline status"></span>
                  </div>
                </div>
              </a>
            </li>
            <li class="offline">
              <a href="javascript:void(0);">
                <div class="media">
                  <img
                    class="media-object"
                    src="../../../assets/user.png"
                    alt=""
                  />
                  <div class="media-body">
                    <span class="name">Folisise Chosielie</span>
                    <span class="message">Art director, Movie Cut</span>
                    <span class="badge badge-outline status"></span>
                  </div>
                </div>
              </a>
            </li>
            <li class="online">
              <a href="javascript:void(0);">
                <div class="media">
                  <img
                    class="media-object"
                    src="../../../assets/user.png"
                    alt=""
                  />
                  <div class="media-body">
                    <span class="name">Alexander</span>
                    <span class="message">Writter, Mag Editor</span>
                    <span class="badge badge-outline status"></span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div> -->
        <div class="tab-pane p-l-15 p-r-15" :class="{ 'active show': openNavtab('Setting') }" id="setting">
          <h6>Choose Mode</h6>
          <ul class="choose-skin list-unstyled">
            <li data-theme="white" :class="{ active: data_theme === '' }" v-on:click="setactiveTheme('')">
              <div class="white"></div>
              <span>Light</span>
            </li>
            <li
              data-theme="black"
              :class="{ active: data_theme === 'full-dark' }"
              v-on:click="setactiveTheme('full-dark')"
            >
              <div class="black"></div>
              <span>Dark</span>
            </li>
          </ul>
          <hr />
          <h6>Choose Skin</h6>
          <ul class="choose-skin list-unstyled">
            <li
              data-theme="purple"
              v-bind:class="{ active: activeColor === 'purple' }"
              v-on:click="changeBodycolor('purple')"
            >
              <div class="purple"></div>
              <span>Purple</span>
            </li>
            <li
              data-theme="blue"
              v-bind:class="{ active: activeColor === 'blue' }"
              v-on:click="changeBodycolor('blue')"
            >
              <div class="blue"></div>
              <span>Blue</span>
            </li>
            <li
              data-theme="cyan"
              v-bind:class="{ active: activeColor === 'cyan' }"
              v-on:click="changeBodycolor('cyan')"
            >
              <div class="cyan"></div>
              <span>Cyan</span>
            </li>
            <li
              data-theme="green"
              v-bind:class="{ active: activeColor === 'green' }"
              v-on:click="changeBodycolor('green')"
            >
              <div class="green"></div>
              <span>Green</span>
            </li>
            <li
              data-theme="orange"
              v-bind:class="{ active: activeColor === 'orange' }"
              v-on:click="changeBodycolor('orange')"
            >
              <div class="orange"></div>
              <span>Orange</span>
            </li>
            <li
              data-theme="blush"
              v-bind:class="{ active: activeColor === 'blush' }"
              v-on:click="changeBodycolor('blush')"
            >
              <div class="blush"></div>
              <span>Blush</span>
            </li>
          </ul>
          <hr />
          <h6>General Settings</h6>
          <ul class="setting-list list-unstyled">
            <li>
              <label class="fancy-checkbox">
                <input type="checkbox" name="checkbox" />
                <span>Report Panel Usag</span>
              </label>
            </li>
            <li>
              <label class="fancy-checkbox">
                <input type="checkbox" name="checkbox" checked />
                <span>Email Redirect</span>
              </label>
            </li>
            <li>
              <label class="fancy-checkbox">
                <input type="checkbox" name="checkbox" checked />
                <span>Notifications</span>
              </label>
            </li>
            <li>
              <label class="fancy-checkbox">
                <input type="checkbox" name="checkbox" />
                <span>Auto Updates</span>
              </label>
            </li>
            <li>
              <label class="fancy-checkbox">
                <input type="checkbox" name="checkbox" />
                <span>Offline</span>
              </label>
            </li>
            <li>
              <label class="fancy-checkbox">
                <input type="checkbox" name="checkbox" />
                <span>Location Permission</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="tab-pane p-l-15 p-r-15" :class="{ 'active show': openNavtab('Question') }" id="question">
          <form>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="icon-magnifier"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Search..." />
            </div>
          </form>
          <ul class="list-unstyled question">
            <li class="menu-heading">HOW-TO</li>
            <li><a href="javascript:void(0);">How to Create Campaign</a></li>
            <li><a href="javascript:void(0);">Boost Your Sales</a></li>
            <li><a href="javascript:void(0);">Website Analytics</a></li>
            <li class="menu-heading">ACCOUNT</li>
            <li><a href="javascript:void(0);">Cearet New Account</a></li>
            <li><a href="javascript:void(0);">Change Password?</a></li>
            <li><a href="javascript:void(0);">Privacy &amp; Policy</a></li>
            <li class="menu-heading">BILLING</li>
            <li><a href="javascript:void(0);">Payment info</a></li>
            <li><a href="javascript:void(0);">Auto-Renewal</a></li>
            <li class="menu-button m-t-30">
              <a href="javascript:void(0);" class="btn btn-primary"><i class="icon-question"></i> Need Help?</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="js">
import { authUserStore } from "../../../stores/auth";
import { checkStatus, parseJSON } from "@/use/FetchService.js";
//import { RepositoryFactory } from "@/repositories/RepositoryFactory";

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL_MENU = `${BASE_DOMAIN}/api/menu`;

//const catalogRepository = RepositoryFactory.get("catalogs");
//const catalogMenus = await catalogRepository.Get("NAME", "MENUS");



export default {
  name: "SidebarComponent",
  data() {
    return {
      currentActiveMenu: window.location.pathname.split("/")[2],
      currentMenuTab: "Menu",
      activeColor: "cyan",
      dropActive: "",
      data_theme: "",
      userName:"Guest",
      menus: [],
      personTypeId:""
    };
  },
  methods: {
    changeBodycolor(color) {
      this.activeColor = color;
      document.body.className = "theme-" + color + " " + this.data_theme;
    },

    // getUrl(url) {
    //   let uri=  new URL(url, import.meta.url).href;
    //   return uri;
    // },

    outside: function () {
      this.dropActive = false;
    },

    setActive: function (menuItem) {
      if (this.currentActiveMenu === menuItem) {
        this.currentActiveMenu = null;
      } else {
        this.currentActiveMenu = menuItem;
      }
    },

    openNavtab: function (tab) {
      return this.currentMenuTab === tab;
    },
    setActiveNavtab: function (tab) {
      this.currentMenuTab = tab;
    },
    setactiveTheme: function (theme) {
      this.data_theme = theme;
      document.body.className = "theme-" + this.activeColor + " " + theme;
      Event.$emit("theme", theme);
    },

    async loadDataFetch(url) {
      return await fetch(`${url}`)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          return data;
        });
    },
    async loadMenu(userEmail) {
      const result = await this.loadDataFetch(`${URL_MENU}?userEmail=${userEmail}`).then((data) => data);

      if (result.succeeded) {
        if (result.status == 200) {
          console.log("result.data ->", result.data);
           return result.data;
        }
      }
       return [];
    },
  },

  directives: {
    // clickOutside: {
    //   bind: function (el, binding) {
    //     // Define Handler and cache it on the element
    //     const bubble = binding.modifiers.bubble;
    //     const handler = (e) => {
    //       if (bubble || (!el.contains(e.target) && el !== e.target)) {
    //         binding.value(e);
    //       }
    //     };
    //     el.__vueClickOutside__ = handler;

    //     // add Event Listeners
    //     document.addEventListener("click", handler);
    //     this.$emit("click", handler);
    //   },
    // },
  },
  computed: {
    currentRoutePath() {
      return this.$route.path;
    },
  },
  watch: {
    $route() {
      this.currentActiveMenu = window.location.pathname.split("/")[2];
      if (window.location.pathname.split("/")[2] == this.currentActiveMenu) {
        document.body.className =
          "theme-" + this.activeColor + " " + this.data_theme;
      }
    },
  },
  created() {
    const authStore= authUserStore();
    this.userName="guest";

    if (authStore.isAuthenticated){
    const authUser =  authStore.getAuthenticatedUser;
    console.log("authUser ",authUser)
    this.userName = authUser.userName;
    this.userEmail = authUser.email;
    }
   },

   async mounted() {
     this.menus =  await this.loadMenu(this.userEmail);
     console.log("this.menus ->", Object.entries(this.menus));
  },

};
</script>
<style scoped></style>
