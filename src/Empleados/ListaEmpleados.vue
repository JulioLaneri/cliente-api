<template>
    <div>
        <HomePage />


        <button @click="mostrarModalAgregar = true" type="button" class="btn btn-primary float-end">
            Agregar Empleado
        </button>
        <!-- Modal Agregar -->
        <div v-if="mostrarModalAgregar" class="modal">
            <AgregarEmpleado @cerrar="cerrarModalAgregar" />
        </div>

        <h2>Lista de Empleados</h2>
        <!--Busqueda-->
        <div class="d-flex justify-content-center mb-3">
            <input v-model="searchTerm" class="form-control" type="text" placeholder="Buscar empleado" />
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


                <tr v-for="empleado in filteredEmpleados" :key="empleado.empleadoID">
                    <td>{{ empleado.nombre }}</td>
                    <td>{{ empleado.cedula }}</td>
                    <td>{{ empleado.email }}</td>

                    <td>
                        {{ empleado.telefono }}
                        <button type="button" @click="confirmarEliminar(empleado)"
                            class="btn btn-danger float-end">Eliminar</button>

                        <button @click="mostrarModalEditar = true; empleadoSeleccionado = empleado"
                            class="btn btn-warning float-end">Editar</button>
                        <!-- Modal Editar -->
                        <div v-if="mostrarModalEditar" class="modal">
                            <EditarEmpleado :mostrar="mostrarModalEditar" :empleadoEditar="empleadoSeleccionado"
                                @cerrar="cerrarModalEditar" />

                        </div>
                    </td>

                </tr>

            </tbody>
        </table>
    </div>
</template>
  
<script>
import HomePage from '@/components/HomePage.vue';
import AgregarEmpleado from './AgregarEmpleado.vue';
import EditarEmpleado from './EditarEmpleado.vue';
import axios from 'axios';
import Swal from 'sweetalert2';






export default {

    data() {
        return {
            empleados: [],
            mostrarModalAgregar: false,
            mostrarModalEditar: false,
            empleadoSeleccionado: null,
            searchTerm: '',
        };
    },
    methods: {
        async obtenerEmpleados() {
            try {
                this.cargando = true;
                const response = await axios.get('http://localhost:8085/empleados/page/0');
                this.empleados = response.data.content;
                this.cargando = false;
                // Nuevo: Filtrar empleados según el término de búsqueda
                this.filteredEmpleados = this.empleados.filter(empleado =>
                    empleado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            } catch (error) {
                console.error('Error al obtener los datos de los clientes:', error);
                this.cargando = false;
            }
        },

        async confirmarEliminar(empleado) {
            const { isConfirmed } = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Se eliminará el Empleado.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (isConfirmed) {
                this.eliminarEmpleado(empleado);
            }
        },

        async eliminarEmpleado(empleado) {
            try {
                const response = await axios.delete(`http://localhost:8085/empleados/${empleado.empleadoID}`);
                console.log('Empleado eliminado:', response.data);
                this.obtenerEmpleados();  // Actualizar la lista de empleados después de eliminar
                this.cerrarModal();
            } catch (error) {
                console.error('Error al eliminar empleado:', error);
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
        this.obtenerEmpleados();

    },

    components: {
        AgregarEmpleado,
        HomePage,
        EditarEmpleado,
    },
    computed: {
        //  propiedad computada para los empleados filtrados
        filteredEmpleados() {
            return this.empleados.filter(empleado =>
                empleado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
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

.btn-primary{
    margin-top: 30px;
}
.btn-danger {
    margin-right: 0px;
}
h2{
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
  