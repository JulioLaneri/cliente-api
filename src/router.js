import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue';
import ListaClientes from './components/ListaClientes.vue';


const routes = [
   { path: '/', redirect: '/login' },
   { path: '/login', component: LoginComponent },
   { path: '/clientes', component: ListaClientes },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
