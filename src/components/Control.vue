<template>
  <div class="container my-5">
    <img :src="video" width="700" height="600">
        <br><br>
         <div class="form-inline">
      <button type="button" @click="submition" class="btn btn-primary mr-2">
      <i class="fa fa-search fa-fw" aria-hidden="true"></i>Consultar</button>
        </div>
        <br><br>
            <div class="row">
                <table class="table table-hover table-sm table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha Inicio</th>
                            <th scope="col">Fecha Fin</th>
                            <th scope="col">Accion</th>
                            <th scope="col">Tiempo restante</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{visitas.nombre}}</td>
                            <td>{{visitas.fecha_inicio}}</td>
                            <td>{{visitas.fecha_fin}}</td>
                            <td width="200">
                                <button type="button" @click="openRev()" class="btn btn-success mb-2 mr-4">
                                    <i aria-hidden="true"></i>Revisar</button>
                                <button type="button" @click="openDelete()" class="btn btn-danger mb-2 mr-4">
                                    <i aria-hidden="true"></i></button>
                            </td>
                            <td><CuentaAtras :seconds="1500"/></td>
                             <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!--  end row -->


        <!-- Modal info visitante-->

        <modal 
            name="editarPais" 
            :clickToClose="false" 
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Informacion adiconal</div>
                <div class="card-body">
<div class="table-wrapper-scroll-y my-custom-scrollbar">
          <b-list-group>
            <b-list-group-item> EVENTO: {{visitas.nombre_visita}}</b-list-group-item>
            <b-list-group-item> CONDOMINIO: {{visitas.id_condominio}}</b-list-group-item>
          </b-list-group>
        </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="primary" class="btn btn-success mr-2">Confirmar acceso</b-button>
                        <b-button variant="danger" class="mr-2" @click="closeModalEdit">Cancelar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <modal 
            name="mensaje-exito" 
            :clickToClose="false" 
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Actualización Exitosa</div>
                <div class="card-body">
                    <h5 class="card-title">El pais se actualizo correctamente</h5>
                    <p class="h1 mb-2" style="text-align:center;font-size:4em">
                        <b-icon icon="check-circle" variant="success"></b-icon>
                    </p>
                    <div style="text-align: right;">
                        <b-button variant="success" @click="closeModalExito">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->
  </div>
  

  
  
</template>

<script>
import CuentaAtras from '@/components/CuentaAtras.vue'
import axios from 'axios'
export default {
  name: 'Main',
  components: {
    CuentaAtras
  },
  data () {
    return {
      video: 'http://localhost:5000/video_capture',
      visitas: [],
      id_visita: 3,
    }
  },
  methods: {
    submition()  {
      console.log("submition");
          axios.get('http://localhost:5000/api/visitas-ingreso/'+this.id_visita, { 
          }).then(response => {
              console.log(response);
              this.visitas=response.data;
          }).catch(error => {
              console.log(error.response.status);
              console.log(error.response.data);
              this.msgErr = error.response.data['exceptionLongDescription'];
              this.msnErrorIrreconocible = this.msgErr;
              this.$modal.show('modal-general');
          })
  },
     openRev(){
      this.$modal.show('editarPais');
  },
     closeModalEdit: function() {
      this.$modal.hide('editarPais');
  },
     openGen(){
      this.$modal.hide('mensaje-exito');
  },
    closeModalExito: function() {
      this.$modal.hide('mensaje-exito');
  },
}
}
</script>
