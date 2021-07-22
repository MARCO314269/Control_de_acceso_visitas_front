<template>
              <div class="card">
              <div class="card-header">Información</div>
              <div class="card-body">
                  <div class="form-group">
                      <h6>Tu registro fue exitoso, favor de mostrar este QR al entrar:</h6>
                      <p>{{this.url_visitante_id}}</p>
                      <img :src="'data:image/jpeg;base64,'+img_data">
                  </div>
                  <div class="form-group my-4" style="text-align: right;">
                  </div>
              </div>
          </div>
</template>


<script>
import axios from 'axios';

export default {
data(){
    return{
   url_visitante_id: "",
   url_visitante: 'http://localhost:5000/api/visitas-ingreso/',
   mensaje: ""
    }
},
methods: {
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
    }
}
}
</script>