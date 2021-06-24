<template>
    <div>
        <div v-if="seconds">
            <div>
                <h5>{{ countdown }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import * as moment from 'moment';
    import axios from 'axios'
    export default {
        name: 'CountDown',
        props: {
            seconds: {
                type: Number,
                required: true,
            }
        },
        data () {
            return {
                countdown: null,
                expires_in: null,
                interval: null,
                fecha_fin: null,
                fecha_inicio: null,
            }
        },
        mounted () {
            this.countdown = moment.utc(this.seconds).format('HH:mm:ss');
            this.expires_in = this.seconds;
            //this._setInterval();
            this.convertirFecha();
        },
        destroyed () {
            clearInterval(this.interval);
        },
        methods: {
            _setInterval: function() {
                this.interval = setInterval(() => {
                    if (this.expires_in === 0) {
                        clearInterval(this.interval);
                    } else {
                        this.expires_in -= 1;
                        this.countdown = moment.utc(this.expires_in * 1000).subtract(1, 'seconds').format('HH:mm:ss');
                    }
                }, 1000);
            },
            convertirFecha: function(){
                axios.get('http://localhost:5000/api/visitas-ingreso/2',{
                }).then(response => {
                this.fecha_fin =response.data.fecha_fin
                this.fecha_inicio =response.data.fecha_inicio
                console.log(this.fecha_fin)
                var dia = parseInt(this.fecha_fin.substring(0,2))
                var mes = parseInt(this.fecha_fin.substring(3,5))-1
                var anio = parseInt(this.fecha_fin.substring(6,10))
                var hora = parseInt(this.fecha_fin.substring(11,13))
                console.log(hora);
                var fi =(new Date(anio, mes, dia, hora, 56, 1))
                console.log(new Date(anio, mes, dia, hora, 56, 1))
                return fi;
                }).catch(error => {
                  console.log(error.response.data);
          })
            }
        }
    }
</script>