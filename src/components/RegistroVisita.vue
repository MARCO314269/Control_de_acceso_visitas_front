<template>
<div class="container my-1">
  <div class="card-header">
    <label class="control-label h1">Registro de Visita</label>
    <h5></h5>
   </div>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Visita" active>
        <b-card-text>Visita</b-card-text>
      </b-tab >  <!--end tab visita -->

      <b-tab title="Evento" style="text-aling: center">
      <b-form @submit="onSubmit" v-if="true">

      <b-form-group id="input-group-1" label="Nombre evento:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="$v.form.nombre_visita.$model"
          :state="validateState('nombre_visita')"
          placeholder="Ingresa el nombre de tu evento"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Selecciona la fecha y hora inicio de tu evento:" :state="validateState('fecha_inicio')" label-for="input-2">
          <div>
            <datetime
                  type="datetime"
                  v-model="$v.form.fecha_inicio.$model"
                  input-class="my-class"
                  value-zone="America/Mexico_City"
                  placeholder="DD/MM/YYYY   00:00"
                  :format="{ day: 'numeric', month: 'numeric', year: 'numeric',  hour: 'numeric', minute: 'numeric'}"
                  :phrases="{ok: 'Continuar', cancel: 'Salir'}"
                  :hour-step="1"
                  :minute-step="10"
                  :week-start="7"
                  :min-datetime="new Date().toISOString()"
                  use12-hour
                  auto
              ></datetime>
    </div>
      <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio, no debe contener numeros y debe contener al menos 3 letras.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-5" label="Selecciona la fecha y hora fin de tu evento:" label-for="input-5">
          <div>
              <datetime
              type="datetime"
              v-model="form.fecha_fin"
              input-class="my-class"
              value-zone="America/Mexico_City"
              placeholder="DD/MM/YYYY 00:00"
              :format="{ day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}"
              :phrases="{ok: 'Continuar', cancel: 'Salir'}"
              :hour-step="1"
              :minute-step="10"
              :week-start="7"
              :min-datetime="new Date().toISOString()"
              use12-hour
              auto
              ></datetime>
    </div>
      <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio, no debe contener numeros y debe contener al menos 3 letras.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-3" label="¿Esta será una visita recurrente semanal?" v-slot="{ ariaDescribedby }">
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
      </b-form-group>

            <b-button type="submit" :disabled="habilitaBoton" @submit="onSubmit" variant="primary">Guardar</b-button>

          </b-form>
      </b-tab>
    </b-tabs>
  </b-card>

      <modal 
          name="modal-exito" 
          :clickToClose="false" 
          :reset="true"
          :width="480"
          :height="245">
          <div class="card">
              <div class="card-header">Información</div>
              <div class="card-body">
                  <div class="form-group">
                      <h6>Favor de compartir esta url con tus visitantes:</h6>
                      <p>{{this.url_visitante}}</p>
                  </div>
                  <div class="form-group my-4" style="text-align: right;">
                      <b-button variant="info" @click="closeModalExito">Aceptar</b-button>
                  </div>
              </div>
          </div>
        </modal><!-- ends modal-->
          



</div>

</template>

<script>
//import Datepicker from 'vuejs-datepicker';
import moment from "moment";
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import axios from 'axios'
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";


  export default {
    mixins: [validationMixin],

  components: { 
   Datetime,
    //localhost:80807vistantes/1

    },
    data() {
      return {
        form: {
          id_condominio: 1,
          fecha_inicio: null,
          fecha_fin: null,
          nombre_visita: '',
          visita_semanal_recurrente_activa: 0,
          visita_mensual_recurrente_activa: 0,
          visita_permitida_activa: 1
        },
        inicio: null,
        fin: null,
        url_visitante: 'localhost:8080/visitantes/',
        id_detalle_visita: '',        

      }
    },
  validations: {
    form: {
      fecha_inicio: { required },
      nombre_visita: { required }
    }
  },
  computed: {
      habilitaBoton: function() {
        var dato = true
          && this.form.nombre_visita
          && this.form.fecha_inicio
          && this.form.fecha_fin
          && this.form.visita_semanal_recurrente_activa
          && this.form.visita_mensual_recurrente_activa
          return !dato;
      }
  },
    methods: {
      validateState(nombre_visita) {
       const { $dirty, $error } = this.$v.form[nombre_visita];
       return $dirty ? !$error : null;
      },
      closeModalExito(){
        this.$modal.hide('modal-exito');
      },
      onSubmit(event) {
        event.preventDefault()
        this.form.fecha_inicio = moment(new Date(this.form.fecha_inicio)).format('YYYY-MM-DD hh:mm:ss');
        this.form.fecha_fin = moment(new Date(this.form.fecha_fin)).format('YYYY-MM-DD hh:mm:ss');
        axios.post('http://127.0.0.1:5000/api/detalle-visita', this.form).then(response => {
          this.id_detalle_visita = response.data.id_detalle_visita;
          this.url_visitante = this.url_visitante+this.id_detalle_visita;
          console.log(response.data);
          this.$modal.show('modal-exito');
        }).catch(error => {
          this.msgErr = error;
          if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
          }
        }).finally(
          () => this.loading = false
        );
      }
    }

 }


</script>



<style>
.alinear{
  text-align: center;
}
</style>