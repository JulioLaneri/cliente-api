<template>
  <div>
    <HomePage/>
    <h1>Lista de Clientes</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Email</th>
          <th>Celular</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.cedula }}</td>
          <td>{{ cliente.correoElectronico }}</td>
          <td>{{ cliente.telefono }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HomePage from './HomePage.vue';

export default {
    data() {
        return {
            clientes: [],
        };
    },
    mounted() {
        this.obtenerClientes();
    },
    methods: {
        async obtenerClientes() {
            try {
                const response = await fetch('http://localhost:8081/clientes/page/0');
                const data = await response.json();
                this.clientes = data;
            }
            catch (error) {
                console.error('Error al obtener los datos de los clientes:', error);
            }
        },
    },
    components: { HomePage }
};
</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
