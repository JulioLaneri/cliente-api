<template>
  <div>
    <Navbar />
    <router-view />
  </div>

  <nav class="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Gestion Deportiva</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item px-lg-5">
            <router-link to="/empleados" class="nav-link">Empleados</router-link>
          </li>
          <li class="nav-item px-lg-5">
            <router-link to="/clientes" class="nav-link">Clientes</router-link>
          </li>
          <li class="nav-item px-lg-5">
            <router-link to="/reportes" class="nav-link">Reportes</router-link>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
</template>

<script setup>

</script>

<style scoped>
/* Estilos del navbar */
.navbar {
  transition: background-color 0.3s ease;
}

.navbar-brand, .nav-link {
  color: #fff;
}

.navbar-toggler-icon {
  background-color: #fff;
}

.nav-item {
  transition: transform 0.3s ease;
}

.nav-item:hover {
  transform: scale(1.1);
}


.btn-outline-light {
  border-color: #fff;
  color: #fff;
}

.btn-outline-light:hover {
  background-color: #fff;
  color: #000;
}
</style>
