<template>
    <div>
        <HomePage />
        <div class="container mt-5">
            <h2 class="mb-4">Crear Nueva Factura</h2>
            <form @submit.prevent="guardarFactura">
                <div class="mb-3 text-center">
                    <label for="cliente" class="form-label">Nombre del Cliente:</label>
                    <select v-model="factura.nombreCliente" class="form-select">
                        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}
                        </option>
                    </select>
                </div>

                <div class="mb-3 text-center">
                    <label for="rucCliente" class="form-label">Número de RUC:</label>
                    <input v-model="factura.rucCliente" type="text" class="form-control" id="rucCliente" required />
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
                rucCliente: "",
                clienteid: 3,
                total: 0,
                detalles: [
                    {
                        precio: 0,
                        
                        suscripcionid: 1
                    }
                ]
            },
            clientes: []
        };
    },
    mounted() {
        axios
            .get("http://localhost:8081/clientes/page/0")
            .then((response) => {
                this.clientes = response.data;
            })
            .catch((error) => {
                console.error("Error al obtener la lista de clientes", error);
            });
    },
    methods: {
        
        eliminarDetalle(index) {
            this.factura.detalles.splice(index, 1);
        },
        async guardarFactura() {
            try {
                console.log(this.factura)
                const response = await axios.post('http://localhost:8081/factura-cliente/save', this.factura);

                console.log('factura:', response.data);
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
        HomePage
    }
};
</script>
<style>
#id{
    width: 100%
}

</style>