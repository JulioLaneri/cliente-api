<template>
    <div class="container mt-4">
      <label for="cliente" class="form-label">Selecciona un cliente:</label>
      <select v-model="selectedCliente" @change="clienteSeleccionado" class="form-select">
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre }}
        </option>
      </select>
  
      <div class="mb-3">
        <label for="ruc" class="form-label">RUC del Cliente:</label>
        <input type="text" v-model="factura.rucCliente" class="form-control">
      </div>
  
      <div class="mb-3">
        <label for="total" class="form-label">Total:</label>
        <input type="text" v-model="factura.total" class="form-control">
      </div>
  
      <!-- Otros campos de la factura y sus detalles -->
  
      <div class="mb-3">
        <label for="precio" class="form-label">Precio del Detalle:</label>
        <input type="text" v-model="factura.detalles.precio" class="form-control">
      </div>
  
      <button @click="generarFactura" class="btn btn-primary">Generar Factura</button>
      <button @click="guardarFactura" class="btn btn-success">Guardar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        clientes: [],
        selectedCliente: null,
        factura: {
          clienteid: null,
          total: '',
          rucCliente: '',
          detalles: {
            precio: '',
            // Otros campos de detalles
          },
        },
      };
    },
    mounted() {
      this.obtenerClientes();
    },
    methods: {
      async obtenerClientes() {
        try {
          const response = await axios.get('http://localhost:8081/clientes/page/0');
          this.clientes = response.data;
        } catch (error) {
          console.error('Error al obtener la lista de clientes:', error);
        }
      },
      async clienteSeleccionado() {
        // Espera a que se obtengan los clientes antes de asignar automáticamente el nombre
        await this.obtenerClientes();
  
        // Encuentra el cliente seleccionado
        const clienteSeleccionado = this.clientes.find(cliente => cliente.id === this.selectedCliente);
  
        // Asigna automáticamente el nombre del cliente
        if (clienteSeleccionado) {
          this.factura.clienteid = this.selectedCliente;
          this.factura.nombreCliente = clienteSeleccionado.nombre;
        //   this.factura.clienteid = clienteSeleccionado.cliente.id;
        }
      },
      generarFactura() {
        console.log('Generando factura:', this.factura);
      },
      guardarFactura() {
        axios.post('http://localhost:8081/factura-cliente/save', this.factura)
          .then(response => {
            console.log('Factura guardada:', response.data);
            this.selectedCliente = null;
            this.factura = {
              clienteid: null,
              total: '',
              nombreCliente: '',
              ruc: '',
              detalles: {
                precio: '',
              },
            };
          })
          .catch(error => {
            console.error('Error al guardar la factura:', error);
          });
      },
    },
  };
  </script>
  