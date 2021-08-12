<template>
  <div class="container my-1">
    <div class="card-header">
      <label class="control-label h1">Registro de Visita</label>
      <h5></h5>
    </div>
    <b-card no-body>
      <b-tabs card>
        <!-- <b-tab title="Visita" active>
        <b-card-text>Visita</b-card-text>
      </b-tab >  -->
        <!--end tab visita -->

        <b-tab title="Evento" style="text-aling: center" active>
          <b-form @submit="onSubmit" v-if="true">
            <b-form-group
              id="input-group-1"
              label="Nombre evento:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="$v.form.nombre_visita.$model"
                :state="validateState('nombre_visita')"
                placeholder="Ingresa el nombre de tu evento"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Selecciona la fecha y hora inicio y fin de tu evento:"
              label-for="input-2"
            >
              <div>
                <a-date-picker
                  v-model="form.fecha_inicio"
                  :disabled-date="disabledDate"
                  :show-time="{ format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Inicio"
                  @openChange="handleStartOpenChange"
                />
              </div>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Selecciona la fecha y hora inicio y fin de tu evento:"
              label-for="input-2"
            >
              <div>
                <a-date-picker
                  v-model="form.fecha_fin"
                  :disabled-date="disabledEndDate"
                  :show-time="{ format: 'HH:mm' }"
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Fin"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                />
              </div>
            </b-form-group>

            <!-- <b-form-group id="input-group-3" label="¿Esta será una visita recurrente semanal?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.visita_semanal_recurrente_activa"
          id="checkboxes-3"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value=1>Si</b-form-checkbox>
          <b-form-checkbox value=0>No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group id="input-group-4" label="¿Esta será una visita recurrente mensual?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.visita_mensual_recurrente_activa"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value=1>Si</b-form-checkbox>
          <b-form-checkbox value=0>No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->

            <b-button
              type="submit"
              :disabled="habilitaBoton"
              @submit="onSubmit"
              variant="primary"
              >Guardar</b-button
            >
          </b-form>
        </b-tab>
      </b-tabs>
    </b-card>

    <!--  modal visita registrada exito -->
    <b-modal
      scrollable
      ref="my-modal"
      name="modal-exito"
      hide-footer
      hide-header
      :reset="true"
      :width="auto"
      :height="auto"
    >
      <div class="card">
        <div class="card-header">Código de registro</div>
        <div class="card-body">
          <div class="form-group">
            <h6>
              Por favor comparte este código con tus visitantes para que se
              registren a tu evento.
            </h6>

            <img :src="'data:image/jpeg;base64,' + img_data" style='width:80%; padding-left:10%;'/>

            <h6>
              También pueden registrarse através de este
              <a v-bind:href="this.url_visitante_id"> enlace </a>
            </h6>
          </div>
          <div class="form-group my-4" style="text-align: right">
            <b-button variant="info" @click="closeModalExito">Aceptar</b-button>
          </div>
        </div>
      </div> </b-modal
    ><!-- ends modal-->
  </div>
</template>

<script>
//import Datepicker from 'vuejs-datepicker';
import Vue from "vue";
import store from "../store";
import "moment/locale/es.js";
import moment from "moment";
import "vue-datetime/dist/vue-datetime.css";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import es_ES from "ant-design-vue/lib/locale-provider/es_ES.js";

moment.locale("es-mx");

export default {
  mixins: [validationMixin],

  components: {},
  data() {
    return {
      form: {
        c: 1,
        id_condominio: 1,
        fecha_inicio: null,
        fecha_fin: null,
        nombre_visita: "",
        visita_semanal_recurrente_activa: 0,
        visita_mensual_recurrente_activa: 0,
        visita_permitida_activa: 1,
      },
      inicio: null,
      fin: null,
      url_visitante: process.env.VUE_APP_VISITANTES,
      es_ES,
      endOpen: false,
      url_visitante_id: "",
      id_detalle_visita: "",
      img_data: [],
    };
  },
  validations: {
    form: {
      nombre_visita: { required },
    },
  },
  computed: {
    habilitaBoton: function () {
      var dato =
        true &&
        this.form.nombre_visita &&
        this.form.fecha_inicio &&
        this.form.fecha_fin;
      return !dato;
    },
  },
  watch: {
    fecha_inicio(val) {
      console.log("fecha_inicio", val);
    },
    fecha_fin(val) {
      console.log("fecha_fin", val);
    },
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      this.form.fecha_inicio = dateStrings[0];
      this.form.fecha_fin = dateStrings[1];
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
    validateState(nombre_visita) {
      const { $dirty, $error } = this.$v.form[nombre_visita];
      return $dirty ? !$error : null;
    },
    closeModalExito() {
      //this.$modal.hide('modal-exito');
      //this.$bvModal.hide('modal-exito');

      this.$refs["my-modal"].hide();
    },
    onSubmit(event) {
      const path_detalle_visita = "/api/detalle-visita";
      event.preventDefault();
      this.form.fecha_inicio = moment(new Date(this.form.fecha_inicio)).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      this.form.fecha_fin = moment(new Date(this.form.fecha_fin)).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      axios
        .post(path_detalle_visita, this.form)
        .then((response) => {
          this.id_detalle_visita = response.data.id_detalle_visita;
          this.url_visitante_id = this.url_visitante + this.id_detalle_visita;
          this.getQR(this.url_visitante_id);
          this.$refs["my-modal"].show();
          //this.$bvModal.show('modal-exito');
          //this.$modal.show('modal-exito');
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
    getQR(mensaje) {
      const path_imagen_qr = "/api/imagen_QR";
      const data = { datos_para_qr: mensaje };
      axios
        .post(path_imagen_qr, data)
        .then((response) => {
          this.img_data = response.data.encoded_qr_data;
          console.log(this.img_data);
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
    disabledDate(current) {
      // Can not select days before today and today
      return current <= moment().add(-1, "days");
    },
    disabledStartDate(fecha_inicio) {
      const fecha_fin = this.form.fecha_fin;
      if (!fecha_inicio || !fecha_fin) {
        return false;
      }
      return fecha_inicio.valueOf() > fecha_fin.valueOf();
    },
    disabledEndDate(fecha_fin) {
      const fecha_inicio = this.form.fecha_inicio;
      return fecha_inicio.valueOf() >= fecha_fin.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
  },
};
</script>



<style>
</style>