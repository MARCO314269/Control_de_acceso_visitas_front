<template>
  <div>
    <img :src="video">
    <p>Visitantes: {{ video }}</p>
    <p>Visitas: {{ visitas }}</p>
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
