<template>
    <HomePage />
    <div class="borde">
        <div class="container mt-5 ">
            <h2 class="mb-4">Crear Nueva Factura</h2>
            <form @submit.prevent="guardarFactura">
                <div class="mb-3 row">
                    <div class="col-md-6">
                        <label for="cliente" class="form-label">Nombre del Cliente:</label>
                        <select v-model="selectedCliente" @change="clienteSeleccionado" class="form-select">
                            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}
                            </option>
                        </select>
                    </div>

                    <div class="col-md-6">
                        <label for="rucCliente" class="form-label">Número de RUC:</label>
                        <input v-model="factura.rucCliente" type="text" class="form-control" id="rucCliente" required />
                    </div>
                </div>
                <h3>Detalles:</h3>

                <div v-for="(detalles, index) in factura.detalles" :key="index" class="mb-3 row">
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="precio" class="form-label">Precio:</label>
                            <input v-model.number="detalles.precio" type="number" class="form-control" id="precio"
                                required />
                        </div>
                    </div>

                    <!--
                    <div class="col-md-2">
                        <div class="mb-3">
                            <label for="subtotal" class="form-label">Subtotal:</label>
                            <input type="text" class="form-control" :value="formatoMoneda(detalles.subtotal)" readonly />
                        </div>
                    </div>-->
                    <div class="mb-3">
                        <label for="total" class="form-label">Total:</label>
                        <input v-model.number="factura.total" type="number" class="form-control" id="total" required />
                    </div>
                </div>

                <button type="submit" class="btn btn-success float-end">Crear Factura</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import HomePage from "@/components/HomePage.vue";


export default {
    data() {
        return {
            factura: {
                nombreCliente: "",
                rucCliente: "",
                clienteid: null,
                total: "",
                detalles: [
                    {
                        precio: ""
                    }
                ]
            },
            clientes: [],
            selectedCliente: null,
            mostrar: false,
        };
    },
    mounted() {
        this.obtenerClientes();
    },
    methods: {
        async obtenerClientes() {
            try {
                const response = await axios.get('http://localhost:8081/clientes/page/0');
                this.clientes = response.data.content;
            } catch (error) {
                console.error('Error al obtener la lista de clientes:', error);
            }
        },
        async clienteSeleccionado() {
            // Espera a que se obtengan los clientes antes de asignar automáticamente el nombre
            await this.obtenerClientes();

            // Encuentra el cliente seleccionado
            const clienteSeleccionado = this.clientes.find(cliente => cliente.id === this.selectedCliente);

            // Asigna automáticamente el nombre y el clienteid
            if (clienteSeleccionado) {
                this.factura.nombreCliente = clienteSeleccionado.nombre;
                this.factura.clienteid = clienteSeleccionado.clienteId;
            }
        },


        mostrarModal() {
            // Función para mostrar el modal cuando se hace clic en el botón
            this.mostrar = true;
        },

        eliminarDetalle(index) {
            this.factura.detalles.splice(index, 1);
        },
        async guardarFactura() {
            try {
                console.log(this.factura)
                const response = await axios.post('http://localhost:8081/factura-cliente/save', this.factura);

                console.log('factura:', response.data.content);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        },

        /*calcularSubtotal(index) {
        const detalles = this.factura.detalles[index];
        detalles.subtotal = detalles.cantidad * detalles.precio;
        },*/
        formatoMoneda(valor) {
            return valor.toLocaleString("es-ES", { style: "currency", currency: "PYG" });
        }
    },
    components: {
        HomePage,

    }
};
</script>
<style >
.borde {
    margin-top: 7rem;
}

.btn-primary {
    margin-left: 72rem;
}
</style>