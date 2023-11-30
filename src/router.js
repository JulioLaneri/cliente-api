import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue';
import ListaClientes from './Clientes/ListaClientes.vue';
import AgregarCliente from './Clientes/AgregarCliente.vue';
import EditarCliente from './Clientes/EditarCliente.vue';
import HomePage from './components/HomePage.vue';
import ListaEmpleados from './Empleados/ListaEmpleados.vue';
import AgregarEmpleado from './Empleados/AgregarEmpleado.vue';
import ReportesView from './Reportes/ReportesView.vue';
import FacturacionView from './Facturacion/FacturacionView.vue';
import NotFound from './components/NotFound.vue'
import ServerError from './components/ServerError.vue'
import ErrorGeneral from './components/ErrorGeneral.vue'
const routes = [
   { path: '/', redirect: '/error' },
   { path: '/login', component: LoginComponent },
   { path: '/clientes', component: ListaClientes },
   { path: '/home', component: HomePage },
   { path: '/empleados', component: ListaEmpleados },
   { path: '/empleados', component: AgregarEmpleado },
   { path: '/clientes', component: AgregarCliente },
   { path: '/clientes', component: EditarCliente },
   { path: '/reportes', component: ReportesView },
   { path: '/facturacion', component: FacturacionView },
   { path: '/error-404', component: NotFound },
   { path: '/error-500', component: ServerError },
   { path: '/error', component: ErrorGeneral },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
