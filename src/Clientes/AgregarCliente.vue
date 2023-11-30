<template>
    <div class="modal-background">
      <div class="modal-container">
        <div class="modal-content">
  
  
          <h2 class="mb-4">Agregar Nuevo Cliente</h2>
  
          <form @submit.prevent="agregarCliente">
            <div class="mb-3" >
              <label for="nombre" class="form-label">Nombre:</label>
              <input type="text" v-model="nombre" class="form-control" />
            </div>
  
            <div class="mb-3">
              <label for="cedula" class="form-label">Cédula:</label>
              <input type="text" v-model="cedula" class="form-control" />
            </div>
  
            <div class="mb-3">
              <label for="correoElectronico" class="form-label">Correo:</label>
              <input type="correoElectronico" v-model="correoElectronico" class="form-control" />
            </div>
  
            <div class="mb-3">
              <label for="telefono" class="form-label">Teléfono:</label>
              <input type="text" v-model="telefono" class="form-control" />
            </div>
  
            
  
            <div class="mb-3">
              <label for="deporte" class="form-label">Deporte:</label>
              <select v-model="deporte" class="form-select">
                <option value="futbol">Fútbol</option>
                <option value="tenis">Tenis</option>
                <option value="padel">Padel</option>
              </select>
            </div>
  
  
            <button type="submit" class="btn btn-primary">Agregar</button>
            <button @click="cerrarModal" class="btn btn-secondary close-button" aria-label="Close">
              <span aria-hidden="true">X</span>
            </button>
  
          </form>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';

  
  export default {
    props: {
      mostrar: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        nombre: '',
        cedula: '',
        correoElectronico: '',
        telefono: '',
        
      };
    },
    methods: {
      async agregarCliente() {
    try {
      await axios.post('http://localhost:8081/clientes/save', {
        nombre: this.nombre,
        cedula: this.cedula,
        correoElectronico: this.correoElectronico,
        telefono: this.telefono,
      });

      this.cerrarModal(); // Cierra el modal al guardar correctamente

      // Muestra el mensaje de confirmación con SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Cliente agregado con éxito',
        showConfirmButton: false,
        timer: 1500, // Cerrar automáticamente después de 1.5 segundos
      });
    } catch (error) {
      console.error('Error al agregar empleado:', error);

      // Muestra un mensaje de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar cliente',
        text: 'Ha ocurrido un error al intentar agregar el cliente. Por favor, inténtalo nuevamente.',
      });
    }
  },
      cerrarModal() {
        // Puedes emitir un evento para que el componente padre maneje la visibilidad del modal
        this.$emit('cerrar');
      },
    },
  
  };
  </script>
  <style scoped>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    /* Fondo semi-transparente */
    backdrop-filter: blur(1px);
    /* Desenfoque del fondo */
    z-index: 9998;
    /* Asegura que esté por debajo del modal */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    /* Sombra alrededor del contenedor */
  }
  
  .modal-content {
    padding: 40px;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    background: none;
    border: none;
    color: #333;
    /* Color del botón de cierre */
  }
  .form-label {
    margin-right: 20rem;
    margin-bottom: 0.5rem;
    display: inline-block;
   
    
  }
  
  </style>