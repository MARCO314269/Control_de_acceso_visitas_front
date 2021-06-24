<template>
  <div class="container my-5">
    <img :src="video" width="700" height="600">
        <br><br>
         <div class="form-inline">
            <label for="nombre" class="col-form-label mr-2"> Visita</label>
                <input type="text" required class="form-control mr-3" :class="className" placeholder="123" v-model="id_visita">
                <!--small class="notValid">{{msgName}}</small-->
      <button type="button" @click="enviarValidacion" class="btn btn-primary mr-2">
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
                            <th scope="col">Tiempo restante</th>
                            <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{visitas.nombre}}</td>
                            <td>{{visitas.fecha_inicio}}</td>
                            <td>{{visitas.fecha_fin}}</td>
                            <td>{{this.countdown}}</td>
                            <td width="200">
                                <button type="button" @click="openRev()" class="btn btn-success mb-2 mr-4">
                                    <i aria-hidden="true"></i>Revisar</button>
                                <button type="button" @click="openDelete()" class="btn btn-danger mb-2 mr-4">
                                    <i aria-hidden="true"></i></button>
                            </td>
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
import axios from 'axios'
import * as moment from 'moment';
export default {
  name: 'Main',
 props: {
    seconds: {
        type: Number,
        required: true,
    }
},
    data () {
    return {
      video: 'http://localhost:5000/video_capture',
      visitas: [],
      validacion: [],
      id_visita: '',
      countdown: null,
      expires_in: null,
      interval: null,
      fecha_fin: null,
      fecha_inicio: null,
    }
    },
    mounted () {
        this.seconds = this.resta1
        this.expires_in = this.seconds;
        this._setInterval();
    },
    destroyed () {
        clearInterval(this.interval);
    },
  methods: {
    submition()  {
      console.log("submition");
      const path_visitas_ingreso = 'http://localhost:5000/api/visitas-ingreso/'+this.id_visita
          axios.get(path_visitas_ingreso).then(response => {
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
    submition2()  {
     const path_video_vigilancia = 'http://localhost:5000/videos_vigilancia/results'
      console.log("submition2");
          axios.get(path_video_vigilancia).then(response => {
              console.log(response);
              this.validacion=response.data;
          }).catch(error => {
              console.log(error.response.status);
              console.log(error.response.data);
              this.msgErr = error.response.data['exceptionLongDescription'];
              this.msnErrorIrreconocible = this.msgErr;
              this.$modal.show('modal-general');
          })
  },
    enviarValidacion()  {
      this.submition();
      console.log("enviarValidacion");
      const path_visitas_ingreso = 'http://localhost:5000/api/visitas-ingreso/'+this.id_visita
      console.log(typeof this.validacion)
      this.visitas.resultado_prediccion=this.validacion;
      console.log(this.visitas)
      if(this.id_visita){
          axios.put(path_visitas_ingreso,this.visitas).then(response => {
             console.log("enviado");
             console.log(response);
          }).catch(error => {
              console.log(error.response.data);
              this.msgErr = error.response.data['exceptionLongDescription'];
              this.msnErrorIrreconocible = this.msgErr;
              this.$modal.show('modal-general');
          })
      }
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
    convertirFecha: function(fecha){
        var dia = parseInt(fecha.substring(0,2))
        var mes = parseInt(fecha.substring(3,5))-1
        var anio = parseInt(fecha.substring(6,10))
        var hora = parseInt(fecha.substring(11,13))
        var min = parseInt(fecha.substring(14,16))
        var seg = parseInt(fecha.substring(17,19))
        var fi =(new Date(anio, mes, dia, hora, min, seg))
        return fi;
    },
    restarFecha: function(fecha_inicio, fecha_fin){
        var resta = this.convertirFecha(fecha_fin)-this.convertirFecha(fecha_inicio)
        console.log(resta)
        return resta;
    },
    obtenerSegundos: function(){
        axios.get('http://localhost:5000/api/visitas-ingreso/4',{
        }).then(response => {
        var resta1 = this.restarFecha(response.data.fecha_inicio,response.data.fecha_fin)
        console.log(typeof resta1)
        return resta1;
        }).catch(error => {
          console.log(error.response.data);
  })
    },
    _setInterval: function() {
        this.interval = setInterval(() => {
            if (this.expires_in === 0) {
                clearInterval(this.interval);
            } else {
                this.expires_in -= 1;
                this.countdown = moment.utc(this.expires_in).subtract(1, 'seconds').format('HH:mm:ss');
            }
        }, 1000);
    },
}
}
</script>