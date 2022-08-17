import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import DummyView from "../components/admin/dashboard/DummyView.vue";
// import IndexComponent from "../components/admin/dashboard/IndexComponent.vue";
// import IotComponent from "../components/admin/dashboard/IotComponent.vue";
import LoginComponent from "../components/admin/authentication/LoginComponent.vue";
import RegisterComponent from "../components/admin/authentication/RegisterComponent.vue";
import LockscreenComponent from "../components/admin/authentication/LockscreenComponent.vue";
import ForgotPasswordComponent from "../components/admin/authentication/ForgotPasswordComponent.vue";

//import ActivitiesView from "../views/projectActivities/ActivitiesView.vue";
import { authUserStore } from "../stores/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    name: "dashboard",
    redirect: "/dashboard/index",
    component: DummyView,
    meta: {
      breadCrumb: "Dashboard",
    },
    children: [
      {
        path: "dashboard/index",
        component: () => import("../components/admin/dashboard/IndexComponent.vue"),
        meta: { breadCrumb: "Index", title: "Dashboard", auth: true },
      },
      {
        path: "dashboard/iot",
        component: () => import("../components/admin/dashboard/IotComponent.vue"),
        meta: {
          breadCrumb: "Iot Dashboard",
          title: "Iot Dashboard",
          auth: true,
        },
      },
    ],
  },
  {
    path: "/mantenimientos",
    redirect: "/mantenimientos-*",
    component: DummyView,
    meta: {
      breadCrumb: "mantenimientos",
    },
    children: [
      {
        path: "/mantenimientos/empresas",
        component: () => import("../views/company/CompaniesView.vue"),
        meta: { breadCrumb: "Empresas", title: "Empresas", auth: true },
      },
      {
        path: "/mantenimientos/clientes",
        component: () => import("../views/client/ClientsView.vue"),
        meta: { breadCrumb: "Clientes", title: "Clientes", auth: true },
      },
      {
        path: "/mantenimientos/clientes/:id",
        name: "clientView",
        component: () => import("../views/client/ClientView.vue"),
        meta: { breadCrumb: "Cliente", title: "Cliente", auth: true },
      },
      {
        path: "/mantenimientos/proyectos",
        component: () => import("../views/project/ProjectsView.vue"),
        meta: { breadCrumb: "Proyectos", title: "Proyectos", auth: true },
      },
      {
        path: "/mantenimientos/proyectos/:id",
        name: "projectView",
        component: () => import("../views/project/ProjectView.vue"),
        meta: { breadCrumb: "Proyecto", title: "Proyecto", auth: true },
      },
      {
        path: "/mantenimientos/proyectos/tareas",
        component: () => import("../views/projectTask/ProjectTasksView.vue"),
        meta: { breadCrumb: "Tareas", title: "Tareas", auth: true },
      },
      {
        path: "/mantenimientos/proyectos/tareas/:id",
        name: "projectTaskView",
        component: () => import("../views/projectTask/ProjectTaskView.vue"),
        meta: { breadCrumb: "Tarea", title: "Tarea", auth: true },
      },
      {
        path: "/mantenimientos/menus",
        component: () => import("../views/menus/MenusUserTypeView.vue"),
        meta: { breadCrumb: "Menus", title: "Menus", auth: true },
      },
      {
        path: "/mantenimientos/catalogos",
        component: () => import("../views/catalog/CatalogsView.vue"),
        meta: { breadCrumb: "Catalogos", title: "Catalogos", auth: true },
      },
      {
        path: "/mantenimientos/usuarios",
        component: () => import("../views/user/UsersView.vue"),
        name: "usersView",
        meta: { breadCrumb: "Usuarios", title: "Usuarios", auth: true },
      },
      {
        path: "/mantenimientos/usuarios/:id",
        name: "userView",
        component: () => import("../views/user/UserView.vue"),
        meta: { breadCrumb: "Usuario", title: "Usuario", auth: true },
      },

      {
        path: "/mantenimientos/roles",
        component: () => import("../views/roles/RolesView.vue"),
        meta: { breadCrumb: "Roles", title: "Roles", auth: true },
      },
      {
        path: "/mantenimientos/filiales",
        component: () => import("../views/subsidiary/SubsidiaryView.vue"),
        meta: { breadCrumb: "Subsidiarias", title: "Subsidiarias", auth: true },
      },
      {
        path: "/mantenimientos/empresas/contactos",
        component: () => import("../views/contact/ContactView.vue"),
        meta: { breadCrumb: "Empresas", title: "Empresas", auth: true },
      },
      {
        path: "/mantenimientos/empleados",
        component: () => import("../views/employee/EmployeesView.vue"),
        meta: { breadCrumb: "Empleados", title: "Empleados", auth: true },
      },
      {
        path: "/mantenimientos/empleados/:id",
        name: "employeeView",
        component: () => import("../views/employee/EmployeeView.vue"),
        meta: { breadCrumb: "Empleado", title: "Empleado", auth: true },
      },

      //----------------------------
      //-- mantenimientos/agregar --
      //----------------------------
      {
        path: "/mantenimientos/agregar/usuarios",
        name: "userCreateView",
        component: () => import("../views/user/UserCreateView.vue"),
        meta: { breadCrumb: "Usuario", title: "Usuario", auth: true },
      },

      /*{
        path: "/mantenimientos/menus",
        name: "employeeView",
        component: () => import("../views/menus/MenusUserTypeView.vue"),
        meta: { breadCrumb: "Menu", title: "Menu", auth: true },
      },*/
    ],
  },

  {
    path: "/authentication",
    redirect: "/page-*",
    component: DummyView,
    children: [
      {
        path: "page-login",
        component: LoginComponent,
        name: "login",
        meta: { title: "Login", auth: false },
      },
      {
        path: "page-register",
        component: RegisterComponent,
        name: "register",
        meta: { title: "Register" },
      },
      {
        path: "page-lockscreen",
        component: LockscreenComponent,
        name: "lockscreen",
        meta: { title: "Lockscreen" },
      },
      {
        path: "page-forgot-password",
        component: ForgotPasswordComponent,
        name: "fpassword",
        meta: { title: "Forgot Password" },
      },
    ],
  },

  {
    path: "/movimientos",
    redirect: "/movimientos-*",
    component: DummyView,
    meta: {
      breadCrumb: "movimientos",
    },
    children: [
      {
        path: "/movimientos/facturacion",
        component: () => import("../views/projectActivities/ActivitiesView.vue"),
        meta: {
          breadCrumb: "Facturación",
          title: "Facturación",
          auth: true,
        },
      },
      {
        path: "/movimientos/proyectos/actividades",
        component: () => import("../views/projectActivities/ActivitiesView.vue"),
        meta: {
          breadCrumb: "Actividades de Proyectos",
          title: "Actividades de Proyectos",
          auth: true,
        },
      },
      {
        path: "/movimientos/proyectos/reportes",
        component: () => import("../views/projectReport/ProjectReportView.vue"),
        meta: {
          breadCrumb: "Reportes de Proyectos",
          title: "Reportes de Proyectos",
          auth: true,
        },
      },
      {
        path: "/movimientos/proyectos/reportes-pm",
        component: () => import("../views/projectReport/ProjectReportViewPM.vue"),
        meta: {
          breadCrumb: "Reporte de Proyectos PM",
          title: "Reporte de Proyectos PM",
          auth: true,
        },
      },
      {
        path: "/movimientos/proyectos/reportes-customer",
        component: () => import("../views/projectReport/ProjectReportViewCustomer.vue"),
        meta: {
          breadCrumb: "Reporte de Proyectos Cliente",
          title: "Reporte de Proyectos Cliente",
          auth: true,
        },
      },
      {
        path: "/participaciones/general",
        component: () => import("../views/participations/ParticipationsView.vue"),
        meta: {
          breadCrumb: "Participaciones",
          title: "Participaciones",
          auth: true,
        },
      },
      {
        path: "/participaciones/movimientos",
        component: () => import("../views/participations/ParticipationsDiscretionalView.vue"),
        meta: {
          breadCrumb: "Parcitipaciones por Movimientos",
          title: "Parcitipaciones por Movimientos",
          auth: true,
        },
      },
      {
        path: "/participaciones/aprobacion",
        component: () => import("../views/participations/ApproveParticipationsView.vue"),
        meta: {
          breadCrumb: "Aprobación de Participaciones",
          title: "Aprobación de Participaciones",
          auth: true,
        },
      },
      {
        path: "/Participaciones/directa/:id",
        name: "DirectParticipation",
        component: () => import("../views/participations/ParticipationsDetailsView.vue"),
        meta: { breadCrumb: "Detalle de Participación", title: "Detalle de Participación", auth: true },
      },
      {
        path: "/Participaciones/tablaproductividad/",
        name: "ProductivityTable",
        component: () => import("../views/participations/ProductivityTable.vue"),
        meta: { breadCrumb: "Tabla de Productividad", title: "Tabla de Productividad", auth: true },
      },
      {
        path: "/movimientos/reporteproyecto/:id",
        name: "ProjectReportViewDetails",
        component: () => import("../views/projectReport/ProjectReportViewDetails.vue"),
        meta: { breadCrumb: "Detalle de Reporte", title: "Detalle de Reporte", auth: true },
      },
      {
        path: "movement-subsidiary",
        component: () => import("../views/subsidiary/SubsidiaryView.vue"),
        meta: { breadCrumb: "Subsidiarias", title: "Subsidiarias", auth: true },
      },
      {
        path: "movement-contact",
        component: () => import("../views/contact/ContactView.vue"),
        meta: { breadCrumb: "Contactos", title: "Contactos", auth: true },
      },
    ],
  },
  {
    path: "/reportes",
    redirect: "/reportes-*",
    component: DummyView,
    meta: {
      breadCrumb: "reportes",
    },
    children: [
      {
        path: "/reportes/proyectos/actividades",
        component: () => import("../views/report/ReportsView.vue"),
        meta: {
          breadCrumb: "proyectos actividades",
          title: "proyectos actividades",
          auth: true,
        },
      },
      {
        path: "/reportes/facturacion/actividades",
        component: () => import("../views/report/ReportsView.vue"),
        meta: {
          breadCrumb: "proyectos actividades",
          title: "proyectos actividades",
          auth: true,
        },
      },
      {
        path: "/reportes/clientes/unificados",
        component: () => import("../views/report/ReportsView.vue"),
        meta: {
          breadCrumb: "proyectos actividades",
          title: "proyectos actividades",
          auth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(), //createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// this routine will ensure that any pages marked as `auth` in the `meta` section are
// protected from access by unauthenticated users.
router.beforeEach((to, from, next) => {
  const authUser = authUserStore();

  // Use the page's router title to name the page
  // if (to.meta && to.meta.title) {
  //   document.title = to.meta.title;
  // }

  // is there a meta and auth attribute?
  if (to.meta && to.meta.auth !== undefined) {
    // if the page requires auth
    if (to.meta.auth) {
      console.log("authUser.isAuthenticated", authUser.isAuthenticated);
      // and we are authenticated?
      if (authUser.isAuthenticated) {
        next(); // route normally
        return;
      }
      // otherwise off to the sign in page
      //authentication/page-login
      router.push({ name: "login" });
      return;
    }
    next(); // route normally
    return;
  }
  next(); // route normally
  return;
});

export default router;
