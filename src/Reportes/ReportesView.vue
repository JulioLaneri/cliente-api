<template>
    <div>
        <HomePage />
        <!-- Menú desplegable -->
        <select class="form-select form-select-lg mb-3" aria-label="Large select example" v-model="selectedOption">
            <option value="clientes">Clientes</option>
            <option value="empleados">Empleados</option>
        </select>


        <!-- Lista de Clientes -->
        <div v-if="selectedOption === 'clientes'">
            <h1>Lista de Clientes</h1>
            <div class="table-container">
                <table class="table table-striped table-bordered display" id="clientes-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cliente in clientes" :key="cliente.clientesID">
                            <td>{{ cliente.nombre }}</td>
                            <td>{{ cliente.cedula }}</td>
                            <td>{{ cliente.correoElectronico }}</td>
                            <td>{{ cliente.telefono }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="float-end">
                    <button class="btn btn-outline-primary" @click="downloadPDF('clientes')">Descargar Clientes
                        (PDF)</button>
                </div>



                <!-- Botones de paginación -->
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="currentPage > 1 ? currentPage-- : null" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>

                        <li class="page-item" v-for="page in Math.ceil(totalItems / pageSize)" :key="page"
                            :class="{ active: page === currentPage }">
                            <button class="page-link" @click="currentPage = page">{{ page }}</button>
                        </li>

                        <li class="page-item" :class="{ disabled: currentPage === Math.ceil(totalItems / pageSize) }">
                            <button class="page-link"
                                @click="currentPage < Math.ceil(totalItems / pageSize) ? currentPage++ : null"
                                aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>

        <!-- Lista de Empleados -->
        <div v-if="selectedOption === 'empleados'">
            <h1>Lista de Empleados</h1>

            <div class="table-container">
                <table class="table table-striped table-bordered display" id="empleados-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="empleado in empleados" :key="empleado.empleadoID">
                            <td>{{ empleado.nombre }}</td>
                            <td>{{ empleado.cedula }}</td>
                            <td>{{ empleado.email }}</td>
                            <td>{{ empleado.telefono }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="float-end">
                    <button class="btn btn-outline-primary" @click="downloadPDF('empleados')">Descargar Empleados
                        (PDF)</button>
                </div>


                <!-- Botones de paginación -->
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="currentPage > 1 ? currentPage-- : null" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>

                        <li class="page-item" v-for="page in Math.ceil(totalItems / pageSize)" :key="page"
                            :class="{ active: page === currentPage }">
                            <button class="page-link" @click="currentPage = page">{{ page }}</button>
                        </li>

                        <li class="page-item" :class="{ disabled: currentPage === Math.ceil(totalItems / pageSize) }">
                            <button class="page-link"
                                @click="currentPage < Math.ceil(totalItems / pageSize) ? currentPage++ : null"
                                aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    </div>
</template>
  
<script>
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import HomePage from '@/components/HomePage.vue';

export default {
    data() {
        return {
            clientes: [],
            empleados: [],
            currentPage: 1,
            pageSize: 5,
            totalItems: 0,
            selectedOption: 'empleados',

        };
    },
    watch: {
        currentPage: 'obtenerLista',
        selectedOption: 'obtenerLista',
    },
    mounted() {
        this.obtenerLista();
    },
    components: {
        HomePage,
    },
    methods: {
        async obtenerLista() {
            try {
                const url = this.selectedOption === 'clientes'
                    ? `http://localhost:8081/clientes/page/${this.currentPage - 1}?size=${this.pageSize}`
                    : `http://localhost:8085/empleados/page/${this.currentPage - 1}?size=${this.pageSize}`;


                const response = await axios.get(url);
                this[this.selectedOption] = response.data.content;

                // Solo actualizar totalItems si estamos obteniendo la lista de empleados
                if (this.selectedOption === 'empleados') {
                    this[this.selectedOption] = response.data.content;
                    this.totalItems = response.data.totalElements;
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        },


        // ...

        async downloadPDF(type) {
            const elementId = type === 'clientes' ? 'clientes-table' : 'empleados-table';
            const element = document.getElementById(elementId);

            // Opciones para html2pdf
            const options = {
                margin: 10,
                filename: `lista_${type}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            // Utilizamos html2pdf de manera explícita
            try {
                const pdf = await html2pdf(element, options);

                // Descargamos el PDF
                pdf.save(options.filename);
            } catch (error) {
                console.error('Error al generar o descargar el PDF:', error);
            }
        },



    },
};
</script>
  
<style scoped>
.table-container {
    margin: 0 auto;
    /* Centra la tabla */
    max-width: 70%;
    /* Establece un ancho máximo para la tabla */
}

.empty-message {
    text-align: center;
    margin-top: 10px;
    color: #777;
    /* Color de texto gris para un aspecto sutil */
}

.pagination-container {
    margin-top: 10px;
}

.form-select-lg {
    width: 50%;
    margin-left: 25rem;
}
</style>
  