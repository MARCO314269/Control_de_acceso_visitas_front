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
                <canvas v-show="true" id="photoTaken" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
            </div>
        </div>
        <vue-picture-swipe :items="items"></vue-picture-swipe>
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
         <vue-picture-swipe :items="items"></vue-picture-swipe>
       </div>
      </b-form-group>

      <b-button type="submit" @submit="postRespuesta" variant="primary">Validar</b-button>
      <b-button type="reiniciar" @click="onResetCam"  variant="danger">Reiniciar</b-button>
    </b-form>

    <b-form @submit="onSubmit" v-if="match">
      <div class="form-header">       <!-- form header Datos personales -->    
        <h3><i class="fa fa-user"></i> Datos personales </h3>
      </div>

      <b-form-group id="input-group-1" label="Nombre(s):" label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.nombre"
          type="Nombre(s)"
          placeholder="Ingresa tu nombre"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Apellido Paterno:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.apellido_paterno"
          placeholder="Ingresa tu apellido paterno"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Apellido Materno:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.apellido_materno"
          placeholder="Ingresa tu apellido materno"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Genero:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="form.genero"
          :options="generos"
          required
        ></b-form-select>
      </b-form-group>

      <div class="form-header">         <!-- form header Datos de contacto -->   
        <h3><i class="fa fa-user"></i> Datos de contacto </h3>
      </div>

      <b-form-group id="input-group-5" label="Telefono celular:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.telefono_celular"
          placeholder="Ingresa tu telefono celular"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Telefono particular:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.telefono_particular"
          placeholder="Ingresa tu telefono particular"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Telefono de emergencia:" label-for="input-7">
        <b-form-input
          id="input-7"
          v-model="form.telefono_emergencia"
          placeholder="Ingresa tu telefono para emergencias"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-8" label="Nombre de tu contacto de emergencia:" label-for="input-8">
        <b-form-input
          id="input-8"
          v-model="form.nombre_contacto_emergencia"
          placeholder="Ingresa el nombre de tu contacto de emergencia"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-9" label="Correo electronico:" label-for="input-9">
      <b-form-input
          id="input-9"
          v-model="form.email"
          type="email"
          placeholder="Ingresa tu correo electronico"
          required
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" @submit="onSubmit" variant="primary">Guardar</b-button>    </b-form>
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
                      <h6>Tu informacion se guardo correctamente</h6>
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
  import axios from 'axios';
  import "vue-range-slider/dist/vue-range-slider.css";
  import VuePictureSwipe from 'vue-picture-swipe';

  //import { mapMutations } from 'vuex'

  export default {
//    name: "Camera",
    components: {
        VuePictureSwipe,
    },
    data() {
      return {
        form: {
          user_id: '',
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          telefono_particular: null,
          telefono_celular: null,
          telefono_emergencia: null,
          nombre_contacto_emergencia: '',
          email: '',
          genero: null
        },
        form2:{
          id_detalle_visita: '1',
          rostro_b64: '',
          identificacion_b64: ''
        },
        generos: [{ text: 'Seleccionar', value: null }, 'Masculino', 'Femenino'],
        isCameraOpen: false,
        isCameraOpen2: false,
        canvasHeight:470,
        canvasWidth:470,
        items: null,
        match: '',
        mostrarCamaras: true,
        mensaje: ''


     }
    },
    methods: {
      postRespuesta(event) {
        event.preventDefault()
        axios.post('http://127.0.0.1:5000/analiza-imagenes',this.form2).then(response => {
          console.log(response.data);
          this.id_detalle_visita=response;
          this.mensaje=response.data.mensaje;
          this.match=response.data.match;
          this.mostrarCamaras=!this.match;
        this.toggleCamera()
        this.toggleCamera2()
        this.stopCameraStream()
          // alert(response.data.mensaje);
        }).catch(error => {
          this.msgErr = error;
          if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
          }
        }).finally(
          () => this.loading = false
        );
        this.$modal.show('modal-camaras');
      },
      closeModalCamaras(){
        this.$modal.hide('modal-camaras');
      },
      closeModalExito(){
        this.$modal.hide('modal-exito');
        this.form.nombre = ''
        this.form.apellido_paterno = ''
        this.form.apellido_materno = ''
        this.form.genero = null
        this.form.telefono_celular = null
        this.form.telefono_particular = null
        this.form.telefono_emergencia = null
        this.form.nombre_contacto_emergencia = ''
        this.form.email = ''
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
        axios.post('http://127.0.0.1:5000/detalle_visita', this.form).then(response => {
          this.user_id=response.data.user_id;
          console.log(response.data);
           alert("enviado");
        }).catch(error => {
          this.msgErr = error;
          if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
          }
          this.$modal.show('modal-exito');
        }).finally(
          () => this.loading = false
        );
      },
      onResetCam(){
        this.toggleCamera()
        this.toggleCamera2()
        this.stopCameraStream()
      },
    }
      
  }
</script>