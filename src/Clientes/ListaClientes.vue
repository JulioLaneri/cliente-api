<template>
  <div>
    <HomePage />

    <button
      @click="mostrarModalAgregar = true"
      type="button"
      class="btn btn-primary float-end"
    >
      Agregar Cliente
    </button>
    <!-- Modal Agregar -->
    <div v-if="mostrarModalAgregar" class="modal">
      <AgregarCliente @cerrar="cerrarModalAgregar" />
    </div>

    <h2>Lista de Clientes</h2>
    <!--Busqueda-->
    <div class="d-flex justify-content-center mb-3">
      <input
        v-model="searchTerm"
        class="form-control"
        type="text"
        placeholder="Buscar cliente"
      />
      <div class="input-group-append">
        <span class="input-group-text">
          <!-- Puedes cambiar "fas fa-search" según el icono que prefieras de Font Awesome -->
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
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
        <tr v-for="cliente in filteredClientes" :key="cliente.clienteID">
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.cedula }}</td>
          <td>{{ cliente.correoElectronico }}</td>

          <td>
            {{ cliente.telefono }}
            <button
              type="button"
              @click="confirmarEliminar(cliente)"
              class="btn btn-danger float-end"
            >
              Eliminar
            </button>

            <button
              @click="
                mostrarModalEditar = true;
                clienteSeleccionado = cliente;
              "
              class="btn btn-warning float-end"
            >
              Editar
            </button>

            <!-- Modal Editar -->
            <div v-if="mostrarModalEditar" class="modal">
              <EditarCliente
                :mostrar="mostrarModalEditar"
                :clienteEditar="clienteSeleccionado"
                @cerrar="cerrarModalEditar"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EditarCliente from "./EditarCliente.vue";
import AgregarCliente from "./AgregarCliente.vue";

import HomePage from "@/components/HomePage.vue";

import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      clientes: [],
      mostrarModalAgregar: false,
      mostrarModalEditar: false,
      clienteSeleccionado: null,
      searchTerm: "",
      cargando: false, // Agregado
    };
  },
  methods: {
    async obtenerClientes() {
      try {
        this.cargando = true;
        const response = await axios.get(
          "http://localhost:8081/clientes/page/0"
        );
        this.clientes = response.data;
      } catch (error) {
        console.error("Error al obtener los datos de los clientes:", error);
        if (error.response && error.response.status === 404) {
          this.$router.push("/error-404");
        } else if (error.response && error.response.status === 500) {
          this.$router.push("/error-500");
        } else {
          this.$router.push("/error");
        }
      } finally {
        this.cargando = false;
      }
    },

    async confirmarEliminar(cliente) {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminará el Cliente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (isConfirmed) {
        this.eliminarCliente(cliente);
      }
    },

    async eliminarCliente(cliente) {
      try {
        const response = await axios.delete(
          `http://localhost:8081/clientes/${cliente.clienteId}`
        );
        console.log("cliente eliminado:", response.data);
        this.obtenerClientes(); // Actualizar la lista de clientes después de eliminar
        this.cerrarModal();
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    },

    cerrarModalAgregar() {
      this.mostrarModalAgregar = false;
    },
    cerrarModalEditar() {
      this.mostrarModalEditar = false;
    },
  },
  mounted() {
    this.obtenerClientes();
  },

  components: {
    AgregarCliente,
    HomePage,
    EditarCliente,
  },
  computed: {
    //  propiedad computada para los clientes filtrados
    filteredClientes() {
      if (this.clientes) {
        return this.clientes.filter((cliente) =>
          cliente.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        return [];
      }
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

.modal {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<style scoped>
/* Estilos para los botones de Acciones */
.btn-warning {
  margin-right: 30px;
}

.btn-primary {
  margin-top: 30px;
}

.btn-danger {
  margin-right: 0px;
}

h2 {
  margin-left: 10rem;
}

i {
  color: #495057;
  font-size: 25px;
  cursor: pointer;
}

input {
  background-color: transparent;
  border: none;
  box-shadow: none;
  font-size: 14px !important;
  width: 30%;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-left: 200px;
  padding: 8px;
}
</style>
