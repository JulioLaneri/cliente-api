<template>
    <HomePage/>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Historial de Facturas</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-center">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Total</th>
              <th>Nombre del Cliente</th>
              <th>RUC Cliente</th>
              <th>Precio Detalle</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="factura in facturas" :key="factura.facturaid">
              <td>{{ new Date(factura.fecha).toLocaleString() }}</td>
              <td>{{ factura.total }}</td>
              <td>{{ factura.nombreCliente }}</td>
              <td>{{ factura.rucCliente }}</td>
              <td v-if="factura.detalles.length > 0">{{ factura.detalles[0].precio }}</td>
              <td v-else>-</td>
              
              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import HomePage from '@/components/HomePage.vue';
  export default {
    props: {
      mostrar: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        facturas: [],
      };
    },
    mounted() {
      this.mostrarHistorial();
    },
    methods: {
      async mostrarHistorial() {
        try {
          const response = await axios.get('http://localhost:8081/factura-cliente/page/0');
          this.facturas = response.data;
          console.log("Historial cargado exitosamente");
        } catch (error) {
          console.error('Error al obtener el historial de facturas:', error);
        }
      },
    },
    components: {
       
        HomePage,
        
    },
  };
  </script>
  
  <style scoped>
  /* No es necesario agregar estilos adicionales aquí, ya que estamos utilizando clases de Bootstrap */
  </style>
  