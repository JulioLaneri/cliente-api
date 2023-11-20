<template>
    <div class="home-page">
      <h1>Bienvenido a la Página de Inicio</h1>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </template>

  import router from '@/router';
  
  <script>
import router from '@/router';

  export default {
    methods: {
      logout() {
        router.replace("/login")
        sessionStorage.removeItem('user');
      },
    },
  };
  </script>
  
  <style scoped>
  .home-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  </style>
  