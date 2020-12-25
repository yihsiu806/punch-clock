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
              <RecordBoard />
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
    name: 'Records',
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
    totalSpendTime: 0,
    totalSpendTimeString: '',
    tasks: defaultTasks,
    records: [],
  }),

  methods: {
    reload() {
      location.reload()
      return false
    },
  },

  watch: {
    
  },

  mounted() {
    this.$root.$on("recordChange", (val) => {
      this.totalSpendTime = val
      this.totalSpendTimeString = Utils.parseDate(val)
    })
    this.$root.$on('test', () => {
      
    })
  },
};
</script>

<style scoped>

</style>