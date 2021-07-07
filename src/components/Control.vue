<template>
  <div class="container my-5">
    <img :src="video" width="700" height="600" />
    <br /><br />
    <div class="form-inline">
      <label for="nombre" class="col-form-label mr-2"> Visita</label>
      <input
        type="text"
        ref="id_visita"
        required
        class="form-control mr-3"
        placeholder="123"
        v-model="id_visita"
      />
      <!--small class="notValid">{{msgName}}</small-->
      <button type="button" @click="submition2" class="btn btn-primary mr-2">
        <i class="fa fa-search fa-fw" aria-hidden="true"></i>Registrar ingreso
      </button>
      <button type="button" @click="actualizarTabla" class="btn btn-primary mr-2">
        <i class="fa fa-search fa-fw" aria-hidden="true"></i> Actualizar tabla
      </button>
    </div>
    <br /><br />
    <div class="row">
      <table class="table table-hover table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha Ingreso</th>
            <th scope="col">Fecha Fin</th>
            <th scope="col">Tiempo restante</th>
            <th scope="col">Alertas</th>
          </tr>
        </thead>
        <tbody v-for = "oa in resultadoFinal" :key ="oa.id_visita">
          <tr @click="openRev(oa.id_visita)">
            <td>{{ oa.nombre }}</td>
            <td>{{ oa.fecha_ingreso_visitante }}</td>
            <td>{{ oa.fecha_fin }}</td>
            <td>
                <vue-countdown-timer
                  :start-time="start_at?start_at:startAt"
                  :end-time="end_at?end_at:oa.fecha_fin"
                  :interval="1000"
                  :end-text="'TIEMPO FINALIZADO'"
                  :day-txt="'dias'"
                  :hour-txt="'horas'"
                  :minutes-txt="'minutos'"
                  :seconds-txt="'segundos'">
                </vue-countdown-timer>
         </td>
            <td class="center"><h4><span v-if="oa.alerta_tiempo_visita_activa == 1" class="badge badge-success ml-4">Permitido</span><span v-else class="badge badge-danger">No permitido</span></h4></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--  end row -->

        <!--  modal inicial info visitante -->
      <modal  
          ref="my-modal"
          name="info-visitate" 
          :reset="true"
           hide-footer
           hide-header
          :width= 560
          :height= 600
          >
                <div class="card-body">
                    <div>
                    <div class="row">
                        <div class="col-6">
                            <h4 style="text-align:center">Infomación completa:</h4>
                            <table class="table table-bordered table-striped mb-0">
                                    <tbody v-for = "oa in resultadoFinal" :key ="oa.id_visita" class="inf_visit">
                                <tr>
                                  <td>EVENTO:</td>
                                  <td>{{ oa.nombre_visita }}</td>
                                </tr>
                                <tr>
                                  <td>CONDOMINIO</td>
                                  <td>{{ oa.id_condominio }}</td>
                                </tr>
                                <tr>
                                  <td>NOMBRE</td>
                                  <td>{{ oa.nombre }} </td>
                                </tr>
                                <tr>
                                  <td>APELLIDO PATERNO</td>
                                  <td>{{ oa.apellido_paterno }}</td>
                                </tr>
                                <tr>
                                  <td>APELLIDO MATERNO</td>
                                  <td>{{ oa.apellido_materno }}</td>
                                </tr>
                                <tr>
                                  <td>TELEFONO CELULAR</td>
                                  <td>{{ oa.telefono_celular }}</td>
                                </tr>
                                <tr>
                                  <td>TELEFONO PARTICULAR</td>
                                  <td>{{ oa.telefono_particular}}</td>
                                </tr>
                                <tr>
                                  <td>EMAIL</td>
                                  <td>{{ oa.email }}</td>
                                </tr>
                                <tr>
                                  <td>NOMBRE CONTACTO DE EMERGENCIA</td>
                                  <td>{{ oa.nombre_contacto_emergencia}}</td>
                                </tr>
                                <tr>
                                  <td>NUMERO DE EMERGENCIA</td>
                                  <td>{{ oa.numero_emergencia }}</td>
                                </tr>
                                 <tr>
                                  <td colspan="2" style="text-align: right; background-color: white"><b-button variant="danger" @click="RegistrarSalida(oa.id_visita)">Registrar salida</b-button></td>
                                </tr>
                                      </tbody>
                            </table>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="mr-3" style="text-align: right;">
             </div>
        </modal><!-- ends modal-->
    


     <modal
      name="mensaje-exito"
      :clickToClose="false"
      :reset="true"
      :width="480"
      :height="245"
    >
      <div class="card">
        <div class="card-header">Actualización Exitosa</div>
        <div class="card-body">
          <h5 class="card-title">La salida se actualizo correctamente</h5>
          <p class="h1 mb-2" style="text-align: center; font-size: 4em">
            <b-icon icon="check-circle" variant="success"></b-icon>
          </p>
          <div style="text-align: right">
            <b-button variant="success" @click="closeModalExito"
              >Aceptar</b-button
            >
          </div>
        </div>
      </div> </modal
    ><!-- ends modal-->

     <modal 
            name="registrarSalida" 
            :clickToClose="false" 
            :reset="true"
            :width="480"
            :height="200">
            <div class="card">
                <div class="card-header">Registrar Salida</div>
                <div class="card-body">
                      <p class="card-text">¿Está seguro que desea registar la salida?</p>
                    <div class="my-4" style="text-align: right;">
                        <b-button variant="warning" class="mr-4" @click="confirmarSalida">Si</b-button>
                        <b-button variant="danger" class="mr-4" @click="closeModalSalida">Cerrar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import * as moment from "moment";
export default {
  name: "Main",
  props: {
    seconds: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      video: "http://localhost:5000/video_capture",
      visitas: {
        id_visita: "",
        id_visitante: "",
        uuid_visitante: "",
        resultado_reconocimiento: {
          id: "0",
          prob: 0,
        },
      },
      infovisitante: null,
      validacion: {},
      id_visita: "",
      countdown: null,
      expires_in: null,
      interval: null,
      fecha_fin: null,
      fecha_inicio: null,
      permiso_ingreso: false,
      resultadoFinal: [],
      objetoActual: [],
      evento: '',
      condominio: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      telefono_celular: '',
      telefono_particular: '',
      email: '',
      nombre_contacto_emergencia: '',
      numero_emergencia: '',
      fecha_salida_visitante: null,
      startAt:  moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      fecha_fin_set: null,
      id_visita_aux: "",
    };
  },
  mounted() {
    this.seconds = this.resta1;
    this.expires_in = this.seconds;
    this.actualizarTabla();
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    submition() {
      console.log("submition");
      const path_visitas_ingreso =
        "http://localhost:5000/api/visitas-ingreso/" + this.id_visita;
      axios
        .get(path_visitas_ingreso)
        .then((response) => {
          console.log(response.data);
          this.visitas.id_visita = response.data.id_visita;
          this.visitas.id_visitante = response.data.id_visitante;
          this.visitas.uuid_visitante = response.data.uuid_visitante;
          this.fecha_fin = response.data.fecha_fin;
          console.log("VIENDO FECHA***************************")
          console.log(this.fecha_fin)
          this.enviarValidacion();
        })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.data);
          this.msgErr = error.response.data["exceptionLongDescription"];
          this.msnErrorIrreconocible = this.msgErr;
          this.$modal.show("modal-general");
          store.commit("setSession", {});
        });
    },
    submition2() {
      this.id_visita = this.$refs.id_visita.value;
      const path_video_vigilancia =
        "http://localhost:5000/videos_vigilancia/results";
      console.log("submition2");
      axios
        .get(path_video_vigilancia)
        .then((response) => {
          console.log(response.data);
          this.validacion = response.data;
          this.visitas.resultado_reconocimiento = response.data;
          this.submition();
        })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.data);
          this.msgErr = error.response.data["exceptionLongDescription"];
          this.msnErrorIrreconocible = this.msgErr;
          this.$modal.show("modal-general");
          store.commit("setSession", {});
        });
    },
    enviarValidacion() {
      console.log("enviarValidacion");
      const path_visitas_ingreso =
        "http://localhost:5000/api/visitas-ingreso/" + this.id_visita;
      console.log(this.visitas);
      if (this.id_visita) {
        axios
          .put(path_visitas_ingreso, this.visitas)
          .then((response) => {
            console.log("enviado******************");
            console.log(response.data);
            this.permiso_ingreso = response.data.permiso_ingreso;
            this.actualizarTabla();
            alert(response.data.mensaje);
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log("no encontre informacion");
            this.msgErr = error.response.data["exceptionLongDescription"];
            this.msnErrorIrreconocible = this.msgErr;
            this.$modal.show("modal-general");
            store.commit("setSession", {});
          });
      }
    },
    realTimeInfo(nuevoObjeto) {
      this.objetoActual.push(nuevoObjeto);
      //const returnedTarget = Object.assign(this.resultado_final, obj)
      console.log("objetoActual******************" + this.objetoActual.length);
      //console.log(returnedTarget)
      console.log(JSON.stringify(this.objetoActual));
    },
    openRev(id_visita) {
      const path_visitas_ingreso =
        "http://localhost:5000/api/visitas-ingreso/" + id_visita;
      axios
      .get(path_visitas_ingreso)
      .then((response =>{
        this.infovisitante = response.data
        console.log("VIENDO INFO VISITANTE***")
        console.log(this.infovisitante)
      }))
      this.$modal.show('info-visitate');
      //this.$refs['my-modal'].show();
    },
    closeModalRev: function () {
      this.$modal.hide('info-visitate')
     //this.$refs['my-modal'].hide();
    },
    openGen() {
      this.$modal.hide("mensaje-exito");
    },
    closeModalExito: function () {
      this.$modal.hide("mensaje-exito");
    },
    RegistrarSalida(id_visita){
      this.id_visita_aux = id_visita
      console.log(this.id_visita_aux)
      var fecha_actual = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      console.log(fecha_actual)
      this.$modal.show('registrarSalida');
    },
    confirmarSalida(){
      console.log("confirmandoSalida");
      const path_visitas_salida =
        "http://localhost:5000/api/visitas-salida/" + this.id_visita_aux;
      console.log(this.id_visita_aux);
        axios
          .put(path_visitas_salida, {
            id_visita:this.id_visita_aux,
            fecha_salida_visitante:this.fecha_actual,
            }).then((response) => {
            console.log("SE REGISTRA SALIDA");
            this.actualizarTabla();
            console.log(response);
            this.$modal.hide('registrarSalida');
            this.$modal.hide('info-visitate')
          })
          .catch((error) => {
            console.log(error.response.data);
            store.commit("setSession", {});
          });
    },
    closeModalSalida: function() {
      this.$modal.hide('registrarSalida');
    },
    convertirFecha: function (fecha) {
      var dia = parseInt(fecha.substring(0, 2));
      var mes = parseInt(fecha.substring(3, 5)) - 1;
      var anio = parseInt(fecha.substring(6, 10));
      var hora = parseInt(fecha.substring(11, 13));
      var min = parseInt(fecha.substring(14, 16));
      var seg = parseInt(fecha.substring(17, 19));
      var fi = new Date(anio, mes, dia, hora, min, seg);
      return fi;
    },
    restarFecha: function (fecha_inicio, fecha_fin) {
      var resta =
        this.convertirFecha(fecha_fin) - this.convertirFecha(fecha_inicio);
      console.log(resta);
      return resta;
    },
    obtenerSegundos: function () {
      axios
        .get("http://localhost:5000/api/visitas-ingreso/4", {})
        .then((response) => {
          var resta1 = this.restarFecha(
            response.data.fecha_inicio,
            response.data.fecha_fin
          );
          console.log(typeof resta1);
          return resta1;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    _setInterval: function () {
      this.interval = setInterval(() => {
        if (this.expires_in === 0) {
          clearInterval(this.interval);
        } else {
          this.expires_in -= 1;
          this.countdown = moment
            .utc(this.expires_in)
            .subtract(1, "seconds")
            .format("HH:mm:ss");
        }
      }, 1000);
    },
    startCallBack: function(x) {
      console.log(x);
    },
    endCallBack: function(x) {
      console.log(x);
    },
    actualizarTabla(){
      console.log("actualiza tabla");
      const path_visitas_activas =
        "http://localhost:5000/api/visitas-activas"
      console.log(this.id_visita);
        axios
          .get(path_visitas_activas)
          .then((response) => {
            console.log("viendo visitas activas******************");
            this.resultadoFinal = response.data;
            console.log(this.resultadoFinal)
          })
          .catch((error) => {
            console.log(error.response.data);
            store.commit("setSession", {});
          });
       },
    },
  };
</script>

<style scoped>
.inf_visit>tr>td:first-child{
min-width: 300px;
}

</style>