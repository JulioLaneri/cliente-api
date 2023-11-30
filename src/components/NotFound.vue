<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 text-center mt-5">
          <img src="@/assets/pagina-error-404.avif" alt="Error 404" class="img-fluid mb-4" style="max-width: 150px; max-height: 150px;" />
          <h1 class="display-4">404 Not Found</h1>
          <p class="lead">La página que estás buscando no existe.</p>
          <router-link to="/" class="btn btn-primary">Volver a la página anterior</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos adicionales aquí si es necesario */
  </style>
  