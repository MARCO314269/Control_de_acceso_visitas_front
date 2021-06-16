<template>
  <div class="ancho centra" >>
    <img :src="video">
    <p>Visitantes: {{ video }}</p>
    <p>Visitas: {{ visitas }}</p>
        <br><br>
            <div class="container my-4">>
                <table class="table table-hover table-sm table-striped">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estatus</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="visitantes in visitantes" :key="visitantes.id">
                            <td>{{visitantes.id}}</td>
                            <td>{{}}</td>
                            <td>{{}}</td>
                            <td>{{}}</td>
                            <td width="200">
                                <button type="button" @click="openEdit()" class="btn btn-success mb-2 mr-4">
                                    <i class="fa fa-edit" aria-hidden="true"></i></button>
                                <button type="button" @click="openDelete()" class="btn btn-danger mb-2 mr-4">
                                    <i class="fa fa-trash" aria-hidden="true"></i></button>
                            </td>
                             <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!--  end row -->
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',
  data () {
    return {
      video: 'http://localhost:5000/video_capture',
      visitas: 'Sin visitas',
      visitantes: 'test'
    }
  },
  methods: {
    getVisitantes () {
      const path = 'http://localhost:5000/visitantes'
      axios.get(path).then((respuesta) => {
        console.log(respuesta)
        this.visitantes = respuesta.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getVisitantes()
  }
}
</script>
