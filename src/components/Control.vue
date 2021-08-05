<template>
  <div class="container my-5">
    <img :src="video" class="video" alt="..." />
    <br /><br />
    <div class="form-inline">
      <!-- <label for="nombre" class="col-form-label mr-2"> Visita</label> -->
      <!--       <input
        type="text"
        ref="id_visita"
        required
        class="form-control mr-3"
        placeholder="123"
        v-model="id_visita"
      /> -->
      <!--small class="notValid">{{msgName}}</small-->
      <button type="button" @click="submition2" class="btn btn-primary mr-2">
        Registrar ingreso
      </button>
      <!--       <button type="button" @click="actualizarTabla" class="btn btn-primary mr-2">
        <i class="fa fa-search fa-fw" aria-hidden="true"></i> Actualizar tabla
      </button> -->
    </div>
    <br /><br />
    <div class="row">
      <table class="table table-hover table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Fecha Ingreso</th>
            <th scope="col">Fecha Límite</th>
            <th scope="col">Tiempo restante</th>
            <th scope="col">Estatus</th>
          </tr>
        </thead>
        <tbody v-for="oa in resultadoFinal" :key="oa.id_visita">
          <tr @click="openRev(oa.id_visita)">
            <td>{{ oa.nombre }}</td>
            <td>{{ oa.fecha_ingreso_visitante }}</td>
            <td>{{ oa.fecha_fin }}</td>
            <td>
              <vue-countdown-timer
                :start-time="start_at ? start_at : startAt"
                :end-time="end_at ? end_at : oa.fecha_fin"
                :interval="1000"
                :end-text="'TIEMPO FINALIZADO'"
                :day-txt="'dias '"
                :hour-txt="':'"
                :minutes-txt="':'"
                :seconds-txt="''"
              >
              </vue-countdown-timer>
            </td>
            <td class="center">
              <h4>
                <span
                  v-if="oa.alerta_tiempo_visita_activa == 0"
                  class="badge badge-success ml-4"
                  >Visita activa</span
                ><span v-else class="badge badge-danger">Tiempo excedido</span>
              </h4>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--  end row -->

    <!--  modal info visitante -->
    <modal
      ref="my-modal"
      name="info-visitate"
      :reset="true"
      hide-footer
      hide-header
      :width="560"
      :height="600"
    >
      <div class="card-body">
        <div>
          <div class="row">
            <div class="col-6">
              <h4 style="text-align: center">Detalle de la visita</h4>
              <table class="table table-bordered table-striped mb-0">
                <tbody
                  v-for="(value, key) in resultadoConsulta"
                  :key="key"
                  class="inf_visit"
                >
                  <tr v-if="key != 'id_visita'">
                    <td>{{ key }}:</td>
                    <td>{{ value }}</td>
                  </tr>
                  <!-- <tr>
                                  <td>EVENTO:</td>
                                  <td>{{ resultadoConsulta.nombre_visita }}</td>
                                </tr>
                                <tr>
                                  <td>CONDOMINIO</td>
                                  <td>{{ resultadoConsulta.id_condominio }}</td>
                                </tr>
                                <tr>
                                  <td>NOMBRE</td>
                                  <td>{{ resultadoConsulta.nombre }} </td>
                                </tr>
                                <tr>
                                  <td>APELLIDO PATERNO</td>
                                  <td>{{ resultadoConsulta.apellido_paterno }}</td>
                                </tr>
                                <tr>
                                  <td>APELLIDO MATERNO</td>
                                  <td>{{ resultadoConsulta.apellido_materno }}</td>
                                </tr>
                                <tr>
                                  <td>TELEFONO CELULAR</td>
                                  <td>{{ resultadoConsulta.telefono_celular }}</td>
                                </tr>
                                <tr>
                                  <td>TELEFONO PARTICULAR</td>
                                  <td>{{ resultadoConsulta.telefono_particular}}</td>
                                </tr>
                                <tr>
                                  <td>EMAIL</td>
                                  <td>{{ resultadoConsulta.email }}</td>
                                </tr>
                                <tr>
                                  <td>NOMBRE CONTACTO DE EMERGENCIA</td>
                                  <td>{{ resultadoConsulta.nombre_contacto_emergencia}}</td>
                                </tr>
                                <tr>
                                  <td>NUMERO DE EMERGENCIA</td>
                                  <td>{{ resultadoConsulta.numero_emergencia }}</td>
                                </tr> -->
                </tbody>
                <tr>
                  <td
                    colspan="2"
                    style="text-align: right; background-color: white"
                  >
                    <b-button
                      variant="primary"
                      @click="RegistrarSalida(resultadoConsulta.id_visita)"
                      >Registrar salida</b-button
                    >
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="mr-3" style="text-align: right"></div></modal
    ><!-- ends modal-->

    <!--  modal salida exitosa -->
    <!-- <modal
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
    > -->
    <!-- ends modal-->

    <!--  modal confirmar salida -->
    <modal
      name="registrarSalida"
      :clickToClose="false"
      :reset="true"
      :width="480"
      :height="200"
    >
      <div class="card">
        <div class="card-header">Registrar Salida</div>
        <div class="card-body">
          <p class="card-text">¿Está seguro que desea registar la salida?</p>
          <div class="my-4" style="text-align: right">
            <b-button variant="primary" class="mr-4" @click="confirmarSalida"
              >Si</b-button
            >
            <b-button variant="secondary" class="mr-4" @click="closeModalSalida"
              >Cerrar</b-button
            >
          </div>
        </div>
      </div> </modal
    ><!-- ends modal-->
    <!--  modal error -->
    <modal
      name="modal-error"
      :clickToClose="true"
      :reset="true"
      :width="480"
      :height="200"
    >
      <p class="card-text">{{ mensaje_error }}</p>
      <!-- <div class="card">
                <div class="card-header">ERROR</div>
                <div class="card-body">
                      
                    <div class="my-4" style="text-align: right;">
                        <b-button variant="primary" class="mr-4" @click="confirmarSalida">Si</b-button>
                        <b-button variant="secondary" class="mr-4" @click="closeModalSalida">Cerrar</b-button>
                    </div>
                </div>
            </div> --> </modal
    ><!-- ends modal-->
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import * as moment from "moment";
import Vue from "vue";

export default {
  name: "Main",
  data() {
    return {
      video: "http://127.0.0.1:5000/video_capture",
      datos_QR: {},
      infovisitante: null,
      /* validacion: {}, */
      id_visita: "",
      countdown: null,
      expires_in: null,
      interval: null,
      mensaje_error: "",
      fecha_fin: null,
      fecha_inicio: null,
      permiso_ingreso: false,
      resultadoFinal: [],
      resultadoConsulta: {
        "id_visita": "",
        "EVENTO": "this.resultadoFinal.nombre_visita",
        "CONDOMINIO": "this.resultadoFinal.id_condominio",
        "NOMBRE": "this.resultadoFinal.nombre",
        "APELLIDO PATERNO": "this.resultadoFinal.apellido_paterno",
        "APELLIDO MATERNO": "this.resultadoFinal.apellido_materno",
        "TELEFONO CELULAR": "this.resultadoFinal.telefono_celular",
        "TELEFONO PARTICULAR": "this.resultadoFinal.telefono_particular",
        "EMAIL": "this.resultadoFinal.email",
        "NOMBRE CONTACTO DE EMERGENCIA":
          "this.resultadoFinal.nombre_contacto_emergencia",
        "NUMERO DE EMERGENCIA": "this.resultadoFinal.numero_emergencia",
      },
      objetoActual: [],
      fecha_salida_visitante: null,
      startAt: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      fecha_fin_set: null,
      id_visita_aux: "",
      start_at: null,
      end_at: null,
      visitas: {
        id_visita: "",
        id_visitante: "",
        uuid_visitante: "",
        resultado_reconocimiento: {
          id: "0",
          prob: 0,
        },
      },
    };
  },
  mounted() {
    this.actualizarTabla();
  },
  methods: {
    /* submition() {
      console.log("submition");
      this.obtenerDatosVisitaIngreso() */
      /* const path_visitas_ingreso =
        "/api/visitas-ingreso/" + this.id_visita; */
      /* if (!this.datos_QR[0]) {
        this.mensaje_error = "No se ha detectado QR";
        Vue.$toast.open({
          message: this.mensaje_error,
          type: "error",
          duration: 2000,
        });
      } else if (this.visitas.resultado_reconocimiento.id == ""){
        this.mensaje_error = "No se ha detectado ningún rostro";
        Vue.$toast.open({
          message: this.mensaje_error,
          type: "error",
          duration: 2000,
        });
      }else { */
        /* console.log(this.datos_QR[0]);

        axios
          .get(this.datos_QR[0])
          .then((response) => {
            console.log(response.data);
            this.visitas.id_visita = response.data.id_visita;
            this.visitas.id_visitante = response.data.id_visitante;
            this.visitas.uuid_visitante = response.data.uuid_visitante;
            this.fecha_fin = response.data.fecha_fin;
            console.log("VIENDO FECHA***************************");
            console.log(this.visitas);
            this.enviarValidacion();
          })
          .catch((error) => {
            this.mensaje_error = "Código QR inválido";
          console.log(error);
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
            store.commit("setSession", {});
          }); */
    /* } */
   /*  }, */
    obtenerResultadosReconocimientoFacial(){
      const path_video_vigilancia = "/videos_vigilancia/results";
      axios
        .get(path_video_vigilancia)
        .then((response) => {
          this.visitas.resultado_reconocimiento = response.data;
          console.log("Se obtienen los datos de reconocimiento facial");
          console.log(this.visitas.resultado_reconocimiento);
        })
        .catch((error) => {
          this.mensaje_error = "El rostro no se ha identificado correctamente";
          console.log(error);
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          store.commit("setSession", {});
        });

    },
    obtenerDatosCodigoQR(){
      const path_QR = "/videos_vigilancia/QR";
      axios
        .get(path_QR)
        .then((response) => {
          this.datos_QR = response.data.data;
          console.log("Se obtienen los datos del QR: " + this.datos_QR[0]);
        })
        .catch((error) => {
          this.mensaje_error = "El código QR no se ha leído correctamente";
          console.log(error);
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          store.commit("setSession", {});
        });
    },
    obtenerDatosVisitaIngreso(){
       console.log("obtenerDatosVisitaIngreso");
      console.log(this.datos_QR[0]);

        axios
          .get(this.datos_QR[0])
          .then((response) => {
            console.log(response.data);
            this.visitas.id_visita = response.data.id_visita;
            this.visitas.id_visitante = response.data.id_visitante;
            this.visitas.uuid_visitante = response.data.uuid_visitante;
            this.fecha_fin = response.data.fecha_fin;
            console.log("VIENDO FECHA***************************");
            console.log(this.visitas);
            this.enviarValidacion();
          })
          .catch((error) => {
            this.mensaje_error = "Código QR inválido";
          console.log(error);
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
            store.commit("setSession", {});
          });
    },
    submition2() {
      /* this.id_visita = this.$refs.id_visita.value; */
      /* const path_video_vigilancia = "/videos_vigilancia/results"; */
      /* const path_QR = "/videos_vigilancia/QR"; */
      console.log("submition2");

      this.obtenerResultadosReconocimientoFacial()
      this.obtenerDatosCodigoQR()

      if (!this.datos_QR[0]) {
        this.mensaje_error = "No se ha detectado QR";
        Vue.$toast.open({
          message: this.mensaje_error,
          type: "error",
          duration: 2000,
        });
      } else if (this.visitas.resultado_reconocimiento.id == ""){
        this.mensaje_error = "No se ha detectado ningún rostro";
        Vue.$toast.open({
          message: this.mensaje_error,
          type: "error",
          duration: 2000,
        });
      }else {
        this.obtenerDatosVisitaIngreso()
      }

      /* axios
        .get(path_video_vigilancia)
        .then((response) => {
          console.log("Se obtienen los datos de reconocimiento facial");
          console.log(response.data);
          this.visitas.resultado_reconocimiento = response.data;
        })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.data);
          this.msnErrorIrreconocible =
            error.response.data["exceptionLongDescription"];
          this.mensaje_error = "No se ha detectado QR";
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          store.commit("setSession", {});
        }); */

      /* axios
        .get(path_QR)
        .then((response) => {
          this.datos_QR = response.data.data;
          console.log("QR: " + this.datos_QR[0]);
          this.submition();
        })
        .catch((error) => {
          this.mensaje_error = "El código QR no se ha leído correctamente";
          console.log(error);
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          store.commit("setSession", {});
        }); */
    },
    enviarValidacion() {
      console.log("enviarValidacion");
      /* const path_visitas_ingreso =
        "/api/visitas-ingreso/" + this.id_visita; */
      console.log(this.visitas);
      if (this.datos_QR[0]) {
        console.log(this.datos_QR[0]);
        axios
          .put(this.datos_QR[0], this.visitas)
          .then((response) => {
            console.log("enviado******************");
            console.log(response.data);
            this.permiso_ingreso = response.data.permiso_ingreso;
            this.actualizarTabla();
            if (this.permiso_ingreso==true) {
              Vue.$toast.open({
              message: response.data.mensaje,
              type: "info",
              duration: 8000,
            });
            } else {
              Vue.$toast.open({
              message: response.data.mensaje,
              type: "warning",
              duration: 8000,
            });
            }
            
            /* alert(response.data.mensaje); */
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log("No encontre información");
            this.msnErrorIrreconocible =
              error.response.data["exceptionLongDescription"];
            /* this.$modal.show("modal-general"); */
            this.mensaje_error = "No encontre información";
            Vue.$toast.open({
              message: this.mensaje_error,
              type: "error",
              duration: 8000,
            });
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
      console.log(id_visita);
      const path_visitas_ingreso = "/api/visitas-ingreso/" + id_visita;
      axios.get(path_visitas_ingreso).then((response) => {
        /* this.resultadoConsulta = response.data */
        console.log("VIENDO INFORMACION COMPLETA DEL VISITANTE = " + id_visita);
        this.resultadoConsulta["id_visita"] = response.data.id_visita;
        this.resultadoConsulta["EVENTO"] = response.data.nombre_visita;
        this.resultadoConsulta["CONDOMINIO"] = response.data.id_condominio;
        this.resultadoConsulta["NOMBRE"] = response.data.nombre;
        this.resultadoConsulta["APELLIDO PATERNO"] =
          response.data.apellido_paterno;
        this.resultadoConsulta["APELLIDO MATERNO"] =
          response.data.apellido_materno;
        this.resultadoConsulta["TELEFONO CELULAR"] =
          response.data.telefono_celular;
        this.resultadoConsulta["TELEFONO PARTICULAR"] =
          response.data.telefono_particular;
        this.resultadoConsulta["EMAIL"] = response.data.email;
        this.resultadoConsulta["NOMBRE CONTACTO DE EMERGENCIA"] =
          response.data.nombre_contacto_emergencia;
        this.resultadoConsulta["NUMERO DE EMERGENCIA"] =
          response.data.numero_emergencia;
      });
      this.$modal.show("info-visitate");
      //this.$refs['my-modal'].show();
    },
    closeModalRev: function () {
      this.$modal.hide("info-visitate");
      //this.$refs['my-modal'].hide();
    },
    /* openGen() {
      this.$modal.hide("mensaje-exito");
    },
    closeModalExito: function () {
      this.$modal.hide("mensaje-exito");
    }, */
    RegistrarSalida(id_visita) {
      this.id_visita_aux = id_visita;
      var fecha_actual = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      console.log("obteniendo fecha de salida/fecha actual del sistema");
      console.log(fecha_actual);
      this.$modal.show("registrarSalida");
    },
    confirmarSalida() {
      console.log("confirmandoSalida");
      console.log(this.id_visita_aux);
      const path_visitas_salida = "/api/visitas-salida/" + this.id_visita_aux;
      console.log(this.id_visita_aux);
      axios
        .put(path_visitas_salida, {
          id_visita: this.id_visita_aux,
          fecha_salida_visitante: this.fecha_actual,
        })
        .then((response) => {
          console.log("SE REGISTRA SALIDA");
          this.actualizarTabla();
          console.log(response);
          this.$modal.hide("registrarSalida");
          this.$modal.hide("info-visitate");
        })
        .catch((error) => {
          console.log(error.response.data);
          store.commit("setSession", {});
        });
    },
    closeModalSalida: function () {
      this.$modal.hide("registrarSalida");
    },
    actualizarTabla() {
      console.log("invocando servicio inicial");
      const path_visitas_activas = "/api/visitas-activas";
      axios
        .get(path_visitas_activas)
        .then((response) => {
          console.log("Recibiendo información de visitas activas");
          console.log(response.data);
          this.resultadoFinal = response.data;
          console.log(this.resultadoFinal);
        })
        .catch((error) => {
          this.mensaje_error =
            "Existe un problema con el servidor. Intenta nuevamente.";
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          console.log(this.mensaje_error);
          console.log(error);
          store.commit("setSession", {});
        });
    },
  },
};
</script>

<style scoped>
.inf_visit > tr > td:first-child {
  min-width: 300px;
}
.video {
  height: auto;
  width: auto;
}
</style>