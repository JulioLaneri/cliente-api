import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue';
import ListaClientes from './components/ListaClientes.vue';
import HomePage from './components/HomePage.vue';
import ListaEmpleados from './Empleados/ListaEmpleados.vue';
import AgregarEmpleado from './Empleados/AgregarEmpleado.vue';

const routes = [
   { path: '/', redirect: '/login' },
   { path: '/login', component: LoginComponent },
   { path: '/clientes', component: ListaClientes },
   { path: '/home', component: HomePage },
   { path: '/empleados', component: ListaEmpleados },
   { path: '/empleados', component: AgregarEmpleado },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
