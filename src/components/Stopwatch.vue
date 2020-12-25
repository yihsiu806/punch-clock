<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" sm="8" md="8" >
        <div style="position: relative; width: 250px; height: 250px; display: inline-block;">
          <div class="wave" v-bind:class="{waving: running}">
            <div v-for="n in 60" :key="n"></div>
          </div>
          <div class="day-hour">
            <span v-if="day">{{ day }}</span>
            <span class="pa-1"></span>
            <span v-if="hour">{{ hour }}</span>
          </div>
          <div class="minute-second">
            {{ minute }} : {{ second }}
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="4" align-self="center">
        <v-row justify="start">
          <v-col cols="12">
            <v-btn v-if="!running" color="green" elevation="2" rounded small dark @click="start" large>
              start
            </v-btn>
            <v-btn v-if="running" color="red" elevation="2" rounded small dark @click="stop" large>
              stop
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Stopwatch",

  data() {
    return {
      counter: 0,
      running: false,
      intervalID: null,
    }
  },

  methods: {
    start() {
      this.running = true
      this.intervalID = setInterval(() => {
        this.counter++
      }, 1000);
      this.$root.$emit('watchStart')
    },
    stop() {
      this.running = false
      clearInterval(this.intervalID)
      this.counter = 0
      this.$root.$emit('watchStop')
    },
  },

  computed: {
    second() {
      return ('00' + this.counter % 60).slice(-2)
    },
    minute() {
      return ('00' + (Math.floor(this.counter / 60) % 60)).slice(-2)
    },
    hour() {
      let hour = Math.floor((this.counter / 3600) % 24)
      if (hour > 1) {
        return `${hour} hours`
      } else if (hour == 1) {
        return `${hour} hour`
      } else {
        return null
      }
    },
    day() {
      let day = Math.floor(this.counter / 86400)
      if (day > 1) {
        return `${day} days`
      } else if (day == 1) {
        return `${day} day`
      } else {
        return null
      }
    }
  },

};
</script>

<style scoped>
.wave {
  display: block;
  position: absolute;
  width: 200px;
  height: 200px;
  /* border: 2px solid red; */
  transform: translate(25px, 25px);
}
.wave div {
  transform-origin: 100px 100px;
  opacity: 0.3;
  /* border: 1px solid blue; */
  /* transform: translateY(-80px); */
}
.wave div::after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 27px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #CDDC39;
}
.wave div:nth-child(1) {
  transform: rotate(6deg);
  animation-delay: -57s;
}
.wave div:nth-child(2) {
  transform: rotate(12deg);
  animation-delay: -56s;
}
.wave div:nth-child(3) {
  transform: rotate(18deg);
  animation-delay: -55s;
}
.wave div:nth-child(4) {
  transform: rotate(24deg);
  animation-delay: -54s;
}
.wave div:nth-child(5) {
  transform: rotate(30deg);
  animation-delay: -53s;
}
.wave div:nth-child(6) {
  transform: rotate(36deg);
  animation-delay: -52s;
}
.wave div:nth-child(7) {
  transform: rotate(42deg);
  animation-delay: -51s;
}
.wave div:nth-child(8) {
  transform: rotate(48deg);
  animation-delay: -50s;
}
.wave div:nth-child(9) {
  transform: rotate(54deg);
  animation-delay: -49s;
}
.wave div:nth-child(10) {
  transform: rotate(60deg);
  animation-delay: -48s;
}
.wave div:nth-child(11) {
  transform: rotate(66deg);
  animation-delay: -47s;
}
.wave div:nth-child(12) {
  transform: rotate(72deg);
  animation-delay: -46s;
}
.wave div:nth-child(13) {
  transform: rotate(78deg);
  animation-delay: -45s;
}
.wave div:nth-child(14) {
  transform: rotate(84deg);
  animation-delay: -44s;
}
.wave div:nth-child(15) {
  transform: rotate(90deg);
  animation-delay: -43s;
}
.wave div:nth-child(16) {
  transform: rotate(96deg);
  animation-delay: -42s;
}
.wave div:nth-child(17) {
  transform: rotate(102deg);
  animation-delay: -41s;
}
.wave div:nth-child(18) {
  transform: rotate(108deg);
  animation-delay: -40s;
}
.wave div:nth-child(19) {
  transform: rotate(114deg);
  animation-delay: -39s;
}
.wave div:nth-child(20) {
  transform: rotate(120deg);
  animation-delay: -38s;
}
.wave div:nth-child(21) {
  transform: rotate(126deg);
  animation-delay: -37s;
}
.wave div:nth-child(22) {
  transform: rotate(132deg);
  animation-delay: -36s;
}
.wave div:nth-child(23) {
  transform: rotate(138deg);
  animation-delay: -35s;
}
.wave div:nth-child(24) {
  transform: rotate(144deg);
  animation-delay: -34s;
}
.wave div:nth-child(25) {
  transform: rotate(150deg);
  animation-delay: -33s;
}
.wave div:nth-child(27) {
  transform: rotate(156deg);
  animation-delay: -32s;
}
.wave div:nth-child(28) {
  transform: rotate(162deg);
  animation-delay: -31s;
}
.wave div:nth-child(29) {
  transform: rotate(168deg);
  animation-delay: -30s;
}
.wave div:nth-child(30) {
  transform: rotate(174deg);
  animation-delay: -29s;
}
.wave div:nth-child(31) {
  transform: rotate(180deg);
  animation-delay: -28s;
}
.wave div:nth-child(32) {
  transform: rotate(186deg);
  animation-delay: -27s;
}
.wave div:nth-child(33) {
  transform: rotate(192deg);
  animation-delay: -26s;
}
.wave div:nth-child(34) {
  transform: rotate(198deg);
  animation-delay: -25s;
}
.wave div:nth-child(35) {
  transform: rotate(204deg);
  animation-delay: -24s;
}
.wave div:nth-child(36) {
  transform: rotate(210deg);
  animation-delay: -23s;
}
.wave div:nth-child(37) {
  transform: rotate(216deg);
  animation-delay: -22s;
}
.wave div:nth-child(38) {
  transform: rotate(222deg);
  animation-delay: -21s;
}
.wave div:nth-child(39) {
  transform: rotate(228deg);
  animation-delay: -20s;
}
.wave div:nth-child(40) {
  transform: rotate(234deg);
  animation-delay: -19s;
}
.wave div:nth-child(41) {
  transform: rotate(240deg);
  animation-delay: -18s;
}
.wave div:nth-child(42) {
  transform: rotate(246deg);
  animation-delay: -17s;
}
.wave div:nth-child(43) {
  transform: rotate(252deg);
  animation-delay: -16s;
}
.wave div:nth-child(44) {
  transform: rotate(258deg);
}
.wave div:nth-child(45) {
  transform: rotate(264deg);
  animation-delay: -15s;
}
.wave div:nth-child(46) {
  transform: rotate(270deg);
  animation-delay: -14s;
}
.wave div:nth-child(47) {
  transform: rotate(276deg);
  animation-delay: -13s;
}
.wave div:nth-child(48) {
  transform: rotate(282deg);
}
.wave div:nth-child(49) {
  transform: rotate(288deg);
  animation-delay: -12s;
}
.wave div:nth-child(50) {
  transform: rotate(294deg);
  animation-delay: -11s;
}
.wave div:nth-child(51) {
  transform: rotate(300deg);
  animation-delay: -10s;
}
.wave div:nth-child(52) {
  transform: rotate(306deg);
  animation-delay: -9s;
}
.wave div:nth-child(53) {
  transform: rotate(312deg);
  animation-delay: -8s;
}
.wave div:nth-child(54) {
  transform: rotate(318deg);
  animation-delay: -7s;
}
.wave div:nth-child(55) {
  transform: rotate(324deg);
  animation-delay: -6s;
}
.wave div:nth-child(56) {
  transform: rotate(330deg);
  animation-delay: -5s;
}
.wave div:nth-child(57) {
  transform: rotate(336deg);
  animation-delay: -4s;
}
.wave div:nth-child(58) {
  transform: rotate(342deg);
  animation-delay: -3s;
}
.wave div:nth-child(59) {
  transform: rotate(348deg);
  animation-delay: -2s;
}
.wave div:nth-child(60) {
  transform: rotate(354deg);
  animation-delay: -1s;
}
.wave div:nth-child(61) {
  transform: rotate(360deg);
  animation-delay: 0s;
}
.waving div {
  animation: waving 57s linear infinite;
}
@keyframes waving {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.minute-second {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; 
  font-size: 48px; 
  font-style: bold; 
  margin:0; top:0; left:0;bottom:0;right:0;
}
.day-hour {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; 
  font-size: 24px; 
  font-style: bold; 
  margin:0; left:0; right:0;
  top: 48px;
}
</style>