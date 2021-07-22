<template>
<div class="container my-6">
    <div class="card">
        <div class="card-header">
            <label class="control-label h4">Consulta de visitas</label>
        </div>
        <div class="card-body align" style="margin:20px;">

            <div class="row">
                <div class="form-inline">
                    <label for="nombre" class="col-form-label mr-4">Correo electronico:</label>
                    <input type="text" required class="form-control mr-4"  placeholder="ejemplo@gmail.com" v-model="name">
                    <!--small class="notValid">{{msgName}}</small-->

                    <button type="button" @click="submition" class="btn btn-primary mr-2">
                        <i class="fa fa-search fa-fw" aria-hidden="true"></i> Buscar</button>
                </div>
            </div> <!-- end row -->

    <br><br>

            <div class="row">
                <table class="table table-hover table-sm table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Evento</th>
                            <th scope="col">Fecha Inicio</th>
                            <th scope="col">Fecha Fin</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pais in paises" :key="pais.id">
                            <td>{{pais.id}}</td>
                            <td>{{pais.nombre}}</td>
                            <td>
                                <button type="button" @click="openEdit(pais.id, pais.nombre)" class="btn btn-success mb-2 mr-4">
                                    <i class="fa fa-edit" aria-hidden="true"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!--  end row -->
        </div>
    </div><!-- ends header-->

        <!-- Modal -->

        <modal
            name="modal-general"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Error</div>
                <div class="card-body">
                    <div class="form-group">
                        <h4>Favor de comunicar este Código de error con el administrador del sistema.</h4>
                        <p>{{msnErrorIrreconocible}}</p>
                        <small></small>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="info" @click="openGen">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->
</div>
</template>



<script>
    import "vue-range-slider/dist/vue-range-slider.css";
    import { BootstrapVue } from 'bootstrap-vue';
    import Vue from "vue";
    Vue.use(BootstrapVue);
    export default {
        components: {
        },
        data() {
            return {
            }
        },
        watch: {
        },
        methods: {
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>