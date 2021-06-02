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
          v-model="form.nombre_visita"
          placeholder="Ingresa el nombre de tu evento"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Selecciona la fecha y hora inicio de tu evento:" label-for="input-2">
          <div>
            <datetime
                  type="datetime"
                  v-model="form.fecha_inicio"
                  input-class="my-class"
                  value-zone="America/Mexico_City"
                  placeholder="DD/MM/YYYY   00:00"
                  :format="{ day: 'numeric', month: 'numeric', year: 'numeric',  hour: 'numeric', minute: 'numeric'}"
                  :phrases="{ok: 'Continue', cancel: 'Exit'}"
                  :hour-step="1"
                  :minute-step="10"
                  :week-start="7"
                  use12-hour
                  auto
                  required
              ></datetime>
              <br>
        <b-card-text>Selecciona la fecha y hora fin de tu evento:</b-card-text>
          <div>
            <datetime
                  type="datetime"
                  v-model="form.fecha_fin"
                  input-class="my-class"
                  value-zone="America/Mexico_City"
                  placeholder="DD/MM/YYYY   00:00"
                  :format="{ day: 'numeric', month: 'numeric', year: 'numeric',  hour: 'numeric', minute: 'numeric'}"
                  :phrases="{ok: 'Continue', cancel: 'Exit'}"
                  :hour-step="1"
                  :minute-step="10"
                  :week-start="7"
                  use12-hour
                  auto
                  required
              ></datetime>
        </div>
    </div>

      </b-form-group>

      <b-form-group id="input-group-3" label="¿Esta será una visita recurrente semanal?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.visita_semanal_recurrente_activa"
          id="checkboxes-3"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="true">Si</b-form-checkbox>
          <b-form-checkbox value="false">No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group id="input-group-4" label="¿Esta será una visita recurrente mensual?" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.visita_mensual_recurrente_activa"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="true">Si</b-form-checkbox>
          <b-form-checkbox value="false">No</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

            <b-button type="submit" @submit="onSubmit" variant="primary">Guardar</b-button>

          </b-form>
      </b-tab>
    </b-tabs>
  </b-card>
          



</div>

</template>

<script>
//import Datepicker from 'vuejs-datepicker';
import moment from "moment";
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import axios from 'axios'


  export default {
  components: { 
   Datetime,
    

    },
    data() {
      return {
        form: {
          id_condominio: 1,
          fecha_inicio: null,
          fecha_fin: null,
          nombre_visita: '',
          visita_semanal_recurrente_activa: ["false"],
          visita_mensual_recurrente_activa: ["false"],
          visita_permitida_activa: ["true"]
        },
        inicio: null,
        fin: null,        

      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        this.form.fecha_inicio = moment(new Date(this.form.fecha_inicio)).format('DD/MM/YYYY hh:mm:ss');
        this.form.fecha_fin = moment(new Date(this.form.fecha_fin)).format('DD/MM/YYYY hh:mm:ss');
        alert(JSON.stringify(this.form))
        axios.post('http://127.0.0.1:5000/detalle_visita', JSON.stringify(this.form)).then(response => {
          console.log(response.data);
           alert("enviado");
        }).catch(error => {
          this.msgErr = error;
          if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
          }
          this.$modal.show('mensaje-exito');
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