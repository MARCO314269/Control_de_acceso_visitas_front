<template>
  <div>
    <p>Visitantes: {{ visitantes }}</p>
    <p>Visitas: {{ visitas }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Main',
  data () {
    return {
      visitantes: 'Sin visitantes',
      visitas: 'Sin visitas'
    }
  },
  methods: {
    getVisitantes () {
      const path = 'http://localhost:5000/video_capture'
      axios.get(path).then((respuesta) => {
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
