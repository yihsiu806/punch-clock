<template>
  <v-app>
    <v-app-bar
      app
      color="lime lighten-1"
      dark
    >
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <v-icon x-large>mdi-clock-outline</v-icon>
        <span class="ml-2">Punch Clock</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="3">
            <Tasks/>
          </v-col>
          <v-col cols="9">
            <v-row>
              <Stopwatch/>
            </v-row>
            <v-row>
              <RecordBoard/>
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

export default {
  name: 'App',

  components: {
    Tasks,
    Stopwatch,
    RecordBoard,
  },

  data: () => ({
    //
  }),
};
</script>
