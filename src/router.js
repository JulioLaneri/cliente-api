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
import HistorialFacturacion from './Facturacion/HistorialFacturacion.vue';

const routes = [
   { path: '/', redirect: '/login' },
   { path: '/login', component: LoginComponent },
   { path: '/clientes', component: ListaClientes },
   { path: '/home', component: HomePage },
   { path: '/empleados', component: ListaEmpleados },
   { path: '/empleados', component: AgregarEmpleado },
   { path: '/clientes', component: AgregarCliente },
   { path: '/clientes', component: EditarCliente },
   { path: '/reportes', component: ReportesView },
   { path: '/facturacion', component: FacturacionView },
   { path: '/historial', component: HistorialFacturacion },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
