<template>
  <v-app>
    <v-app-bar
      app
      color="lime lighten-1"
      dark
    >
      <v-btn @click="reload"
        href="#"
        text
      >
        <v-icon x-large>mdi-clock-outline</v-icon>
        <span class="ml-3" style="text-transform: none; font-size: 24px;">Punch Clock</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="3">
            <Tasks :tasks="tasks"/>
          </v-col>
          <v-col cols="12" sm="9" md="9">
            <v-row>
              <Stopwatch/>
            </v-row>
            <v-row style="font-size: 18px; font-weight: bold;">
              <v-spacer></v-spacer>
              <v-col>
                Total: {{ totalSpendTimeString }}
              </v-col>
            </v-row>
            <v-row>
              <RecordBoard :defaultRecord="Object.assign([], tasks[0].records)" :defaultTaskName="tasks[0].name" />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      
      
    </v-main>
  </v-app>
</template>

<script>
import Tasks from './components/Tasks';
import Stopwatch from './components/Stopwatch';
import RecordBoard from './components/RecordBoard';
import * as Utils from './utils/Utils'

const defaultTasks = [
  {
    order: 0,
    name: 'Task 1',
    uuid: Utils.generateUUID(),
    records: []
  }
]

export default {
  name: 'App',

  components: {
    Tasks,
    Stopwatch,
    RecordBoard,
  },

  data: () => ({
    tasks: defaultTasks,
    totalSpendTimeString: '',
  }),

  methods: {
    reload() {
      location.reload()
      return false
    },
  },

  watch: {
    tasks(val) {
      localStorage.setItem('yihsiu-punch-clock', JSON.stringify(val))
    }
  },

  beforeMount() {
    if (localStorage.getItem('yihsiu-punch-clock')) {
      this.tasks = JSON.parse(localStorage.getItem('yihsiu-punch-clock'))
    }
  },

  mounted() {
    this.$root.$on("recordChange", (val) => {
      let totalSpendTime = val.reduce((arr, cur) => {
        return arr + cur.duration;
      }, 0);
      this.totalSpendTimeString = Utils.elapseTimeToDayHourMMSS(totalSpendTime)
      localStorage.setItem('yihsiu-punch-clock', JSON.stringify(this.tasks))
    })
  },
};
</script>

<style scoped>

</style>