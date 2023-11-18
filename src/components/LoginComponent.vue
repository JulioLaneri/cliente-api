<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Usuario:</label>
      <input type="text" v-model="username" required />

      <label for="password">Contraseña:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8085/api/auth', {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('user', JSON.stringify(response.data));
        // Puedes agregar la lógica de redirección aquí si es necesario
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
</style>
