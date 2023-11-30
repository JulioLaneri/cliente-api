<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 text-center mt-5">
          <img src="@/assets/error-gral.webp" alt="Error General" class="img-fluid mb-4" style="max-width: 150px; max-height: 150px;" />
          <h1 class="display-4">Error</h1>
          <p class="lead">Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.</p>
          <router-link to="/" class="btn btn-primary">Volver a la página anterior</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ErrorGeneral',
  };
  </script>
  
  <style scoped>

  </style>
  