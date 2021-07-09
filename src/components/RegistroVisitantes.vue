<template>
<div class="ancho centra" style="max-width:1900px">
  <div class="card defaultColor">
    <div class="card-header">
         <label class="control-label h1">Registro de Visitantes</label>
         <h5>Para dar de alta a un visitante se requiere verificar su identidad.</h5>
         <h5>Se debe tomar una fotografía de frente y una imagen de su identificación.</h5>
         <h5>El lugar debe estar bien iluminado y se debe revisar que los datos de la identificación sean legibles en la imagen.</h5>
    </div>
  <div class="container my-4">
  <div>
    <b-form @submit="postRespuesta" v-if="mostrarCamaras"> 
      <b-form-group id="input-group-10" label="Rostro:" label-for="input-10">
        <div style="display: flex; justify-content: flex-start;">
            <img style="height: 100px;" v-if="isCameraOpen"
                 src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                 class="button-img camera-shoot" @click="capture"/>
            <div class="camera-button">
                <button type="button" class="button is-rounded cam-button"
                        style="margin-left: 10%; background-color: white; border: 0px;"
                        @click="toggleCamera"
                >
                 <span v-if="!isCameraOpen"><img style="height: 100px;" class="button-img"
                                src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"></span>
                 <span v-else><img style="height: 100px;" class="button-img"
                                src="https://img.icons8.com/material-outlined/50/000000/cancel.png"></span>
                </button>
            </div>
        </div>
        <div>
            <div v-if="isCameraOpen" class="camera-canvas">
                <video ref="camera" :width="canvasWidth" :height="canvasHeight" autoplay></video>
                <canvas v-show="true" style="position:absolute" id="photoTaken" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
            </div>
        </div>
      </b-form-group>

      <b-form-group id="input-group-11" label="Identificacion:" label-for="input-11">
        <div class="camera-box">
        <div style="display: flex; justify-content: flex-start;">
            <img style="height: 100px;" v-if="isCameraOpen2"
                 src="https://img.icons8.com/material-outlined/50/000000/camera--v1.png"
                 class="button-img camera-shoot" @click="capture2"/>
            <div class="camera-button">
                <button type="button" class="button is-rounded cam-button"
                        style="margin-left: 10%; background-color: white; border: 0px;"
                        @click="toggleCamera2"
                >
                 <span v-if="!isCameraOpen2"><img style="height: 100px;" class="button-img"
                                src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"></span>
                 <span v-else><img style="height: 100px;" class="button-img"
                                src="https://img.icons8.com/material-outlined/50/000000/cancel.png"></span>
                </button>
            </div>
        </div>
        <div>
            <div v-if="isCameraOpen2" class="camera-canvas">
                <video ref="camera" :width="canvasWidth" :height="canvasHeight" autoplay></video>
                <canvas v-show="true" id="photoTaken" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
            </div>
         </div>
       </div>
      </b-form-group>

      <b-button :disabled="habilitaBoton" type="submit" @submit="postRespuesta" variant="primary">Validar</b-button>
      <b-button :disabled="habilitaBoton3" type="reiniciar" @click="onResetCam"  variant="danger">Reiniciar</b-button>
    </b-form>

    <b-form @submit="onSubmit" v-if="match" >
      <div class="form-header">       <!-- form header Datos personales -->    
        <h3><i class="fa fa-user"></i> Datos personales </h3>
      </div>

      <b-form-group id="input-group-1" label="Nombre(s):" :class="className" :v="$v.form.nombre" label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="$v.form.nombre.$model"
          :state="validateState('nombre')"
          type="Nombre(s)"
          placeholder="Ingresa tu nombre"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio, no debe contener numeros y debe contener al menos 3 letras.</b-form-invalid-feedback>
      </b-form-group>
      

      <b-form-group id="input-group-2" label="Apellido Paterno:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="$v.form.apellido_paterno.$model"
          :state="validateState('apellido_paterno')"
          placeholder="Ingresa tu apellido paterno"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio, no debe contener numeros y debe contener al menos 3 letras.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-3" label="Apellido Materno:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="$v.form.apellido_materno.$model"
          :state="validateState('apellido_materno')"
          placeholder="Ingresa tu apellido materno"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">Este campo no debe contener numeros y debe contener al menos 3 letras.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-4" label="Genero:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="$v.form.genero.$model"
          :state="validateState('genero')"
          :options="generos"
          required
        ></b-form-select>
        <b-form-invalid-feedback id="input-1-live-feedback">Debes elegir una opción.</b-form-invalid-feedback>
      </b-form-group>

      <div class="form-header">         <!-- form header Datos de contacto -->   
        <h3><i class="fa fa-user"></i> Datos de contacto </h3>
      </div>

      <b-form-group id="input-group-5" label="Telefono celular:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="$v.form.telefono_celular.$model"
          :state="validateState('telefono_celular')"
          placeholder="Ingresa tu telefono celular"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio y debe contener 10 digitos.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-6" label="Telefono particular:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="$v.form.telefono_particular.$model"
          :state="validateState('telefono_particular')"
          placeholder="Ingresa tu telefono particular"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio y debe contener 10 digitos.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-7" label="Telefono de emergencia:" label-for="input-7">
        <b-form-input
          id="input-7"
          v-model="$v.form.numero_emergencia.$model"
          :state="validateState('numero_emergencia')"
          placeholder="Ingresa tu telefono para emergencias"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio y debe contener 10 digitos.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-8" label="Nombre de tu contacto de emergencia:" label-for="input-8">
        <b-form-input
          id="input-8"
          v-model="$v.form.nombre_contacto_emergencia.$model"
          :state="validateState('nombre_contacto_emergencia')"
          placeholder="Ingresa el nombre de tu contacto de emergencia"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio, no debe contener numeros y debe contener al menos 3 letras.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-9" label="Correo electronico:" label-for="input-9">
      <b-form-input
          id="input-9"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          type="email"
          placeholder="Ingresa tu correo electronico"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio y debe ser una dirección de correo electronico valida.</b-form-invalid-feedback>
      </b-form-group>

      <b-button :disabled="habilitaBoton2" type="submit" @submit="onSubmit" variant="primary">Guardar</b-button>    </b-form>
  </div>
      
    </div>
  </div><!-- ends header-->

        <modal 
          name="modal-camaras" 
          :clickToClose="false" 
          :reset="true"
          :width="480"
          :height="245">
          <div class="card">
              <div class="card-header">Información</div>
              <div class="card-body">
                  <div class="form-group">
                      <h6>El sistema detecta lo siguiente:</h6>
                      <p>{{this.mensaje}}</p>
                  </div>

                  <div class="form-group my-4" style="text-align: right;">
                      <b-button variant="info" @reset="onResetCam" @click="closeModalCamaras">Aceptar</b-button>
                  </div>
              </div>
          </div>
        </modal><!-- ends modal-->
        
      <b-modal scrollable
          ref="my-modal"
          name="modal-exito" 
          hide-footer
          hide-header
          :reset="true"
          :width= auto
          :height= auto
          >
          <div class="card">
              <div class="card-header">Información</div>
              <div class="card-body">
                  <div class="form-group">
                      <h6>Tu registro fue exitoso, favor de mostrar este QR al entrar:</h6>
                      <p>{{this.url_visitante_id}}</p>
                      <img :src="'data:image/jpeg;base64,'+img_data">
                  </div>
                  <div class="form-group my-4" style="text-align: right;">
                      <b-button variant="info" @click="closeModalExito">Aceptar</b-button>
                  </div>
              </div>
          </div>
        </b-modal><!-- ends modal-->

        <modal 
          name="modal-fallo" 
          :clickToClose="false" 
          :reset="true"
          :width="480"
          :height="245">
          <div class="card">
              <div class="card-header">Información</div>
              <div class="card-body">
                  <div class="form-group">
                      <h6>Tu informacion NO se guardo correctamente, intenta nuevamnete</h6>
                  </div>
                  <div class="form-group my-4" style="text-align: right;">
                      <b-button variant="info" @click="closeModalFallo" @submit="resetForm">Aceptar</b-button>
                  </div>
              </div>
          </div>
        </modal><!-- ends modal-->

</div>

</template>



<script>
  import axios from 'axios';
  import "vue-range-slider/dist/vue-range-slider.css";
  import { validationMixin } from "vuelidate";
  import { required, alpha, minLength, maxLength , integer, email} from "vuelidate/lib/validators";
  const emaiRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  export default {
    mixins: [validationMixin],
    components: {
    },
    data() {
      return {
        generos: [{ text: 'Seleccionar', value: null }, 'Masculino', 'Femenino'],
        isCameraOpen: false,
        isCameraOpen2: false,
        canvasHeight:470,
        canvasWidth:470,
        items: null,
        match: '',
        mostrarCamaras: true,
        mensaje: '',
        uuid_visitante: '',
        ruta_imagen_rostro: '',
        ruta_imagen_identificacion: '',
        insert: true,
        id_detalle_visita_aux: 0,
        url_visitante: 'http://localhost:5000/api/visitas-ingreso/',
        url_visitante_id: "",
        img_data: [],
        auto: 0,
        form: {
          id_detalle_visita: this.$route.params.id_detalle_visita,
          uuid_visitante: '',
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          telefono_particular: null,
          telefono_celular: null,
          numero_emergencia: null,
          nombre_contacto_emergencia: '',
          email: '',
          genero: null
        },
        
        form2:{
          rostro_b64: '',
          identificacion_b64: ''
        }
     }
    },
    validations: {
    form: {
      nombre: { required, minLength: minLength(3) },
      apellido_paterno: { required, alpha, minLength: minLength(3) },
      apellido_materno: { alpha, minLength: minLength(3) },
      genero: { required },
      telefono_celular: { required, integer, maxLength: maxLength(10), minLength: minLength(10) },
      telefono_particular: { required, integer, maxLength: maxLength(10), minLength: minLength(10) },
      numero_emergencia: { required, integer, maxLength: maxLength(10), minLength: minLength(10) },
      nombre_contacto_emergencia: { required, minLength: minLength(3) },
      email: { required, email },
      
    }
  },
    computed: {
      habilitaBoton: function() {
        var dato = true
          && this.form2.rostro_b64
          && this.form2.identificacion_b64
          return !dato;
      },
      habilitaBoton2: function() {
        var dato = true
          && this.form.nombre && this.form.nombre.length>3
          && this.form.apellido_paterno && this.form.apellido_paterno.length>3
          && this.form.apellido_materno && this.form.apellido_materno.length>3
          && this.form.telefono_celular && this.form.telefono_celular.length==10
          && this.form.telefono_particular && this.form.telefono_particular.length==10
          && this.form.numero_emergencia && this.form.numero_emergencia.length==10
          && this.form.nombre_contacto_emergencia && this.form.nombre_contacto_emergencia.length>3
          && this.form.email && emaiRegex.test(this.form.email)
          return !dato;
      },
      habilitaBoton3: function() {
        var dato = true
          && this.form2.rostro_b64
          return !dato;
      },
    },
    methods: {
      validateState(nombre) {
       const { $dirty, $error } = this.$v.form[nombre];
       return $dirty ? !$error : null;
      },
      postRespuesta(event) {
        event.preventDefault()
        axios.post('http://127.0.0.1:5000/validacion-rostro-identificacion',this.form2).then(response => {
          console.log(response.data);
          this.uuid_visitante = response.data.uuid_visitante;
          this.ruta_imagen_rostro = response.data.ruta_imagen_rostro;
          this.ruta_imagen_identificacion = response.data.ruta_imagen_identificacion;
          this.mensaje=response.data.mensaje;
          this.match=response.data.match;
          this.mostrarCamaras=!this.match;
          this.toggleCamera()
          this.toggleCamera2()
          this.stopCameraStream()
          this.$modal.show('modal-camaras');
          // alert(response.data.mensaje);
        }).catch(error => {
          this.msgErr = error;
          if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
          }
        }).finally(
          () => this.loading = false
        );
      },
      closeModalCamaras(){
        this.$modal.hide('modal-camaras');
      },
      closeModalExito(){
        this.$refs['my-modal'].hide();
        //this.$modal.hide('modal-exito');
      },
      closeModalFallo(){
        this.$modal.hide('modal-fallo');
      },
      toggleCamera(){
        if(this.isCameraOpen){
          this.isCameraOpen =false;
        }else{
          this.isCameraOpen = true;
          this.startCameraStream();
        }
      },
      startCameraStream() {
        const constraints = (window.constraints = {
            audio: false,
            video: true
          });
          navigator.mediaDevices
              .getUserMedia(constraints)
              .then(stream => {
                  this.$refs.camera.srcObject = stream;
              }).catch(error => {
              alert("Browser doesn't support or there is some errors." + error);
          });
      },
      stopCameraStream() {
          let tracks = this.$refs.camera.srcObject.getTracks();
          tracks.forEach(track => {
              track.stop();
          });
      },
      capture() {
          const FLASH_TIMEOUT = 50;
          let self = this;
          setTimeout(() => {
              const context = self.$refs.canvas.getContext('2d');
              context.drawImage(self.$refs.camera, 0, 0, self.canvasWidth, self.canvasHeight);
              const dataUrl = self.$refs.canvas.toDataURL().replace("data:image/png;base64,", "");
              console.log(dataUrl)
              this.form2.rostro_b64 = dataUrl
              self.addToPhotoGallery(dataUrl);
              self.isCameraOpen = false;
              self.stopCameraStream();
          }, FLASH_TIMEOUT);
      },
      toggleCamera2(){
        if(this.isCameraOpen2){
          this.isCameraOpen2 =false;
        }else{
          this.isCameraOpen2 = true;
          this.startCameraStream2();
        }
      },
      startCameraStream2() {
        const constraints = (window.constraints = {
            audio: false,
            video: true
          });
          navigator.mediaDevices
              .getUserMedia(constraints)
              .then(stream => {
                  this.$refs.camera.srcObject = stream;
              }).catch(error => {
              alert("Browser doesn't support or there is some errors." + error);
          });
      },
      addToPhotoGallery(dataURI) {
          this.items.push(
              {
                  src: dataURI,
                  thumbnail: dataURI,
                  w: this.canvasWidth,
                  h: this.canvasHeight,
                  alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
              }
          )
      },
      capture2() {
          const FLASH_TIMEOUT = 50;
          let self = this;
          setTimeout(() => {
              const context = self.$refs.canvas.getContext('2d');
              context.drawImage(self.$refs.camera, 0, 0, self.canvasWidth, self.canvasHeight);
              const dataUrl = self.$refs.canvas.toDataURL().replace("data:image/png;base64,", "");
              console.log(dataUrl)
              this.form2.identificacion_b64 = dataUrl
              self.addToPhotoGallery(dataUrl);
              self.isCameraOpen = false;
              self.stopCameraStream();
          }, FLASH_TIMEOUT);
      },
      onSubmit(event) {
        event.preventDefault()
        this.form.uuid_visitante=this.uuid_visitante;
        this.form.ruta_imagen_rostro=this.ruta_imagen_rostro;
        this.form.ruta_imagen_identificacion=this.ruta_imagen_identificacion;
        this.id_detalle_visita_aux =this.form.id_detalle_visita;
        console.log(this.form);
        axios.post('http://127.0.0.1:5000/visitantes/visita', this.form).then(response => {
          this.uuid_visitante = response.data.uuid_visitante;
          this.url_visitante_id = this.url_visitante+response.data.id_visita;
          this.getQR (this.url_visitante_id)
          this.$refs['my-modal'].show();
          console.log(response.data);
          this.$v.form.$touch();
        }).catch(error => {
          this.msgErr = error;
          if(this.insert) {
             this.$modal.show('modal-exito');
          }
          else{
            this.$modal.show('modal-fallo');
          }
        }).finally(
          () => this.loading = false
        );
      },
      getQR (mensaje) {
      const path = 'http://localhost:5000/imagen_QR'
      const data = { "datos_para_qr": mensaje }
      axios.post(path,data).then(response => {
        this.img_data = response.data.encoded_qr_data
        console.log(this.img_data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
      resetForm(){
        this.form = {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        genero: null,
        telefono_celular: null,
        telefono_particular: null,
        numero_emergencia: null,
        nombre_contacto_emergencia: '',
        email: ''
        }
      },
      onResetCam(){
        this.toggleCamera()
        this.toggleCamera2()
        this.stopCameraStream()
      },
    }
      
  }
</script>

<style scoped>
video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>