<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h2 class="headline font-weight-bold">Tasks</h2>
      </v-col>
      <v-col cols="12">
        <v-btn color="lime lighten-1" elevation="1" block small>
          <v-icon color="white"> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-tabs vertical color="lime darken-1">
      <v-tab>
        <v-icon left> mdi-clipboard-list </v-icon>
        Records
      </v-tab>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    
  }),
};
</script>
