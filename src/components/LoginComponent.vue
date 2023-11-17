<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="text" v-model="email" required />
  
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
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:8081/auth/login', {
            email: this.email,
            password: this.password,
          });

          localStorage.setItem('user', JSON.stringify(response.data));
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
  