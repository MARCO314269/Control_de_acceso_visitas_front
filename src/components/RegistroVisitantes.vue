<template>
<div class="container my-6" >
  <!-- INICIO DE PROCESOS-->
   <div class="card-header" v-if="mostrarForm">
         <h1>Bienvenido</h1>
         <h4>Aqui inicia el proceso de registro para tu visita a "{{this.nombre_visita}}" </h4>
         <h4>que se llevara a cabo del {{this.fecha_inicio}} al {{this.fecha_fin}}</h4>
         <br>
         <br>
            <div class="row">
                    <label for="idvisita" class="col-form-label mr-4">Correo electronico:</label>
                            <b-form-input
                                v-model="$v.form3.email.$model"
                                placeholder="ejemplo@gmail.com"
                                :state="validateState2('email')"
                                ></b-form-input>
                                <b-form-invalid-feedback id="input-1-live-feedback">Este es un campo obligatorio y debe ser una dirección de correo electronico valida.</b-form-invalid-feedback>
                    <!--small class="notValid">{{msgName}}</small-->
                    <button :disabled="habilitaBoton5" type="button" @click="buscaInfoPrevia()" class="btn btn mr-2 button_color">
                        <i aria-hidden="true"></i> Continuar</button>           
              </div>
            </div> <!-- end row -->

      <!-- INFO DE CORREO SI EXISTE-->
   <div class="card-header" v-if="mostrarDatosCorreo">
              <div class="card-body">
                    <div>
                    <div class="row">
                        <div class="col-6">
                            <h4 style="text-align:center" class="inf_visit">Encontramos esta informacion con tu correo:</h4>
                            <table class="table table-bordered table-striped mb-0">
                                    <tbody class="inf_visit"> 
                                <tr>
                                  <td>NOMBRE</td>
                                  <td>{{ infovisitante.nombre }} </td>
                                </tr>
                                <tr>
                                  <td>APELLIDO PATERNO</td>
                                  <td>{{ infovisitante.apellido_paterno }}</td>
                                </tr>
                                <tr>
                                  <td>APELLIDO MATERNO</td>
                                  <td>{{ infovisitante.apellido_materno }}</td>
                                </tr>
                                <tr>
                                  <td>TELEFONO CELULAR</td>
                                  <td>{{ infovisitante.telefono_celular }}</td>
                                </tr>
                                <tr>
                                  <td>TELEFONO PARTICULAR</td>
                                  <td>{{ infovisitante.telefono_particular}}</td>
                                </tr>
                                <tr>
                                  <td>EMAIL</td>
                                  <td>{{ infovisitante.email }}</td>
                                </tr>
                                <tr>
                                  <td>NOMBRE CONTACTO DE EMERGENCIA</td>
                                  <td>{{ infovisitante.nombre_contacto_emergencia}}</td>
                                </tr>
                                <tr>
                                  <td>NUMERO DE EMERGENCIA</td>
                                  <td>{{ infovisitante.numero_emergencia }}</td>
                                </tr>
                                      </tbody>
                            </table>
                        </div>
                    </div>
                  </div>

                  <br>
                    <button class="btn btn mr-2 button_color" @click="onSubmitFast(); closeDatosCorreo();">Registrar visita</button>
                    <button class="btn btn mr-2 button_color_red"  @click="openInicio(); closeDatosCorreo(); resetForm3();">¿No eres tu?</button>
              </div>
        </div>
  <!-- AQUI COMIENZA PROCESO DE REGISTRO-->
   <div>
  <div class="card" v-if="mostrarForm1">
  <div class="container my-4">
    <b-form v-if="condition && !match"> 
      <b-form-group>
            <div class="card-header" >
                <label class="control-label h1">Registro de Visitantes</label>
                <h5>Para dar de alta a un visitante se requiere verificar su identidad.</h5>
                <h5>Se debe tomar una fotografía de frente y una imagen de su identificación.</h5>
                <h5>El lugar debe estar bien iluminado y se debe revisar que los datos de la identificación sean legibles en la imagen.</h5>
            </div>
            <br>
            <h5>FAVOR DE CAPTURAR UNA IMAGEN DE TU ROSTRO.</h5>
        <div style="display: flex; justify-content: flex-start;">
            <img style="height: 100px;" v-if="isCameraOpen" src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png" @click="capture"/>
            <div class="camera-button">
                <button type="button" style="margin-left: 10%; background-color: white; border: 0px;" @click="toggleCamera">
                <div v-show="!isCameraOpen">
                <h6>ROSTRO</h6>
                </div>
                <div>
                 <span v-if="!isCameraOpen"><img style="height: 100px;" class="button-img"
                                src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"></span>
                 <span v-else><img style="height: 100px;" class="button-img"
                                src="https://img.icons8.com/material-outlined/50/000000/cancel.png"></span>
                </div>
                </button>
            </div>
        </div>
        <div>
            <div v-if="isCameraOpen" class="camera-canvas">
                <video v-show="!isPhotoTaken"  ref="camera" :width="canvasWidth" :height="canvasHeight" playsinline autoplay></video>
                <canvas v-show="true" id="photoTaken" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
            </div>
            <br>
              <button :disabled="habilitaBoton3" class="btn btn mr-2 button_color" @click="mostrarCamaraRostro = !mostrarCamaraRostro; toggleCamera2();">Continuar</button>
              <button :disabled="habilitaBoton3" class="btn btn mr-2 button_color_red" @click="onResetCamRostro" variant="danger">Reiniciar</button>
        </div>
        </b-form-group>
      </b-form>

     <b-form @submit="postRespuesta" v-if="condition2"> 
        <b-form-group>
        <div class="camera-box">
            <br>
                <h5>FAVOR DE CAPTURAR UNA IMAGEN DE TU IDENTIFICACIÓN.</h5>
        <div style="display: flex; justify-content: flex-start;">
            <img style="height: 100px;" v-if="isCameraOpen2"
                 src="https://img.icons8.com/material-outlined/50/000000/camera--v1.png"
                 class="button-img camera-shoot" @click="capture2"/>
            <div class="camera-button">
                <button type="button" class="button is-rounded cam-button"
                        style="margin-left: 10%; background-color: white; border: 0px;"
                        @click="toggleCamera2"
                >
                <div v-show="!isCameraOpen2">
                <h6>IDENTIFICACIÓN</h6>
                </div>
                <div>
                 <span v-if="!isCameraOpen2"><img style="height: 100px;" class="button-img"
                                src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"></span>
                 <span v-else><img style="height: 100px;" class="button-img"
                                src="https://img.icons8.com/material-outlined/50/000000/cancel.png"></span>
                </div>
                </button>
            </div>
        </div>
        <div>
            <div v-if="isCameraOpen2" class="camera-canvas">
                <video v-show="!isPhotoTaken2"  ref="camera" :width="canvasWidth" :height="canvasHeight" playsinline autoplay></video>
                <canvas v-show="true" id="photoTaken" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
            </div>
         </div>
       </div>
      </b-form-group>

      <button :disabled="habilitaBoton" class="btn btn mr-2 button_color" type="submit" @submit="postRespuesta" variant="primary">Validar</button>
      <button :disabled="habilitaBoton4" class="btn btn mr-2 button_color_red" type="reiniciar" @click="onResetCamIdentificacion"  variant="danger">Reiniciar</button>
    </b-form>
    </div>
    <div>
    <b-form @submit="onSubmit" v-if="match" >
      <div v-if="mostrarFormDatPers">
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

      <button variant="success" class="btn btn mr-2 button_color"  @click="openDatosContact(); closeDatosPers();">Continuar</button>
    </div>

      <div v-if="mostrarFormDatCont">
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
            <button :disabled="habilitaBoton2" class="btn btn mr-2 button_color" type="submit" @submit="onSubmit" variant="primary">Guardar</button>
          </div>
      </b-form>
  </div>
    </div>
  </div> 
   <!-- MOSTRAMOS QR DE EXITO-->
  <div v-if="insert">
    <div class="container my-6">
      <div class="card">
              <div class="card-header">Información</div>
              <div class="card-body">
                  <div class="form-group">
                      <h6>Tu registro fue exitoso, favor de mostrar este QR al entrar:</h6>
                      <p>{{this.url_visitante_id}}</p>
                      <img :src="'data:image/jpeg;base64,'+img_data">
                  </div>
              </div>
          </div>
       </div>
    </div>

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
                      <b-button variant="info" @click="closeModalCamaras(); condition();">Aceptar</b-button>
                  </div>
              </div>
          </div>
        </modal><!-- ends modal-->
        

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
  import router from '../router'
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
        nombre_visita: '',
        fecha_inicio: '',
        fecha_fin: '',
        email:'',
        idvisita: '',
        infovisitante: '',
        imagen: this.$refs.imagenrostro,
        generos: [{ text: 'Seleccionar', value: null }, 'Masculino', 'Femenino'],
        isCameraOpen: false,
        isCameraOpen2: false,
        canvasHeight:470,
        canvasWidth:470,
        items: null,
        match: '',
        mostrarForm: true,
        mostrarForm1: '',
        formRegRapido: '',
        mostrarCamaras: true,
        mostrarCamaraRostro: true,
        mostrarFormDatPers: true,
        mostrarFormDatCont: false,
        mostrarDatosCorreo: false,
        mensaje: '',
        uuid_visitante: '',
        ruta_imagen_rostro: '',
        ruta_imagen_identificacion: '',
        insert: false,
        id_detalle_visita_aux: 0,
        url_visitante: 'http://localhost:5000/api/visitas-ingreso/',
        url_visitante_id: "",
        img_data: [],
        auto: 0,
        isPhotoTaken: false,
        isPhotoTaken2: false,
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
          genero: null,
          email: '',
        },
        
        form2:{
          rostro_b64: '',
          identificacion_b64: ''
        },
        form3:{
          email: '',
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
    },
    form3: {
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
          return !dato;
      },
      habilitaBoton3: function() {
        var dato = true
          && this.form2.rostro_b64
          return !dato;
      },
      habilitaBoton4: function() {
        var dato = true
          && this.form2.identificacion_b64
          return !dato;
      },
      habilitaBoton5: function() {
        var dato = true
         && this.form3.email && emaiRegex.test(this.form3.email)
          return !dato;
      },
      condition() {
        this.mostrarCamaras;
        this.mostrarCamaraRostro
        return this.mostrarCamaras == true && this.mostrarCamaraRostro == true;
      }, 
      condition2(){
        this.mostrarCamaras
        return this.mostrarCamaras == true && this.mostrarCamaraRostro == false;
      },
    },
    created(){
      this.obetenerinfoVisita()
    },
    methods: {
      validateState(nombre) {
       const { $dirty, $error } = this.$v.form[nombre];
       return $dirty ? !$error : null;
      },
      validateState2(email) {
       const { $dirty, $error } = this.$v.form3[email];
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
      obetenerinfoVisita(){
        axios.get('http://127.0.0.1:5000/detalle-visita/' +this.$route.params.id_detalle_visita, {
        }).then((response =>{
        this.nombre_visita = response.data.nombre_visita
        this.fecha_inicio =response.data.fecha_inicio
        this.fecha_fin = response.data.fecha_fin
        console.log(this.evento)
       }
       ))},
      closeModalCamaras(){
        this.$modal.hide('modal-camaras');
      },
      closeModalFallo(){
        this.$modal.hide('modal-fallo');
      },
      toggleCamera(){
        if(this.isCameraOpen){
          this.isCameraOpen =false;
          this.isPhotoTaken = false;
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
          this.isPhotoTaken = !this.isPhotoTaken;
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
          this.isPhotoTaken2 = false;
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
          this.isPhotoTaken2 = !this.isPhotoTaken2;
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
        this.form.email=this.form3.email
        this.form.uuid_visitante=this.uuid_visitante;
        this.form.ruta_imagen_rostro=this.ruta_imagen_rostro;
        this.form.ruta_imagen_identificacion=this.ruta_imagen_identificacion;
        this.id_detalle_visita_aux =this.form.id_detalle_visita;
        console.log(this.form);
        axios.post('http://127.0.0.1:5000/visitantes/visita', this.form).then(response => {
          this.uuid_visitante = response.data.uuid_visitante;
          this.url_visitante_id = this.url_visitante+response.data.id_visita;
          this.insert= response.data.insert;
          this.getQR (this.url_visitante_id)
          this.$refs['my-modal'].show();
          console.log(response.data);
          this.$v.form.$touch();
        }).catch(error => {
          this.msgErr = error;
        }).finally(
          () => this.loading = false
        );
      },
      onSubmitFast() {
        this.form.id_detalle_visita = this.$route.params.id_detalle_visita
        this.form.uuid_visitante = this.infovisitante.uuid_visitante
        this.form.email = this.infovisitante.email
        console.log(this.form);
        axios.post('http://127.0.0.1:5000/visitantes/visita-rapida', this.form).then(response => {
          this.uuid_visitante = response.data.uuid_visitante;
          this.url_visitante_id = this.url_visitante+response.data.id_visita;
          this.insert = response.data.insert
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
      buscaInfoPrevia() {
        if(this.form3.email){
      axios.post('http://localhost:5000/visitantes/correo', this.form3, {
      }).then((response =>{
        this.infovisitante = response.data
        console.log("VIENDO INFORMACION COMPLETA DEL VISITANTE = " + this.infovisitante.id_visita)
        console.log(this.infovisitante)
        this.closeInicio();
      }))
      .catch(
        (error) => {
        console.log(error)
        alert(error)
      }
      )
        }
        else{
        console.log("NO ENCONTTRE NADA");
        }
      //this.$refs['my-modal'].show();
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
      resetForm3(){
        this.form3 = {
        email: ''
        }
      },
      onResetCamRostro(){
        this.isPhotoTaken = !this.isPhotoTaken;
        this.form2.rostro_b64 = null;
        this.toggleCamera()
        this.stopCameraStream()
        
      },
      onResetCamIdentificacion(){
        this.isPhotoTaken2 = !this.isPhotoTaken2;
        this.form2.identificacion_b64 = null;
        this.toggleCamera2()
        this.stopCameraStream()
      },
      openConfirmaPage: function() {
        router.push({'name':'ConfirmaRegistro'});
      },
      openRegistro(){
      this.mostrarForm1 = true;
      },
     closeInicio(){
      if(this.infovisitante.id_visitante){
        this.mostrarDatosCorreo = true;
        this.mostrarForm = false;
      }else{
        this.mostrarForm1 = true;
        this.mostrarForm = false;
        this.toggleCamera();
      }
      },
      openInicio(){
      this.mostrarForm = true;
      },
      openDatosContact(){
      this.mostrarFormDatCont = true;
      },
      closeDatosPers(){
      this.mostrarFormDatPers = false;
      },
      openRegRapido(){
      this.formRegRapido = true;
      },
      claseRegRapido(){
      this.formRegRapido = false;
      },
      closeModalQR(){
      this.insert = false
      },
    closeDatosCorreo(){
      this.mostrarDatosCorreo = false
      },
    openDatosCorreo(){
      if(this.infovisitante != null){
        this.mostrarDatosCorreo = true      
        }
      },
    }
  }
</script>

<style scoped>
.inf_visit>tr>td:first-child{
min-width: 300px;
}
.overflow-clip {
  text-overflow: clip;
}
.button_color{
  color: #27ae60;
}
.button_color_red{
  color: rgb(209, 14, 8);
}
video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
<style type='text/css'>
    h1, h2, h3, h4, h5, h6 {
    font-family: sans-serif;
    color: rgb(2, 68, 27);
    }
</style>