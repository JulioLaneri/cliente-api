
<template>
  <div class="contenedor-login">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <label for="email">Correo electrónico:</label>
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
  .contenedor-login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  h2 {
    text-align: center;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    background-color: green;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0C3E11;
  }
</style>
