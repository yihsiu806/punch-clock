<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="250">
      <v-card>
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-text-field :rules="taskNameRules" v-model="taskName" label="Task name" autofocus></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Cancle
          </v-btn>
          <v-btn color="green darken-1" text @click="saveNewTask">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="text-center">
      <v-col cols="12">
        <h2 class="headline font-weight-bold">Tasks</h2>
      </v-col>
      <v-col cols="12">
        <v-btn
          color="lime lighten-1"
          elevation="1"
          block
          small
          @click="createNewTask"
        >
          <v-icon color="white"> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-tabs v-model="currentTab" center-active vertical color="lime darken-1">
      <v-tab v-for="(task, index) in tasks" :key="task.uuid" :index="index" class="task-tab" @click="activateTask" @dragover="dragoverHandler" @drop="dropHandler">
        <v-icon v-if="task.order == 0" left> mdi-clipboard-list </v-icon>
        {{ task.name }}
      </v-tab>
    </v-tabs>
  </v-container>
</template>

<script>
import * as Utils from '../utils/Utils'

export default {
  name: "Tasks",

  data: () => ({
    dialog: false,
    valid: true,
    taskName: '',
    taskNameRules: [
      v => v.length > 0,
    ],
    currentTaskIndex: 0,
    targetTaskIndex: 0,
    records: [],
    running: false,
    newTaskCreated: false,
    uuid: null,
    currentTab: null,
  }),

  props: {
    tasks: Array,
  },

  methods: {
    createNewTask() {
      if (!this.valid) {
        this.$refs.form.resetValidation()
      }
      this.dialog = true
    },
    saveNewTask() {
      this.$refs.form.validate()
      if (!this.valid) {
        return
      }
      this.tasks.push({
        uuid: Utils.generateUUID(),
        name: this.taskName,
        records: [],
      })
      this.newTaskCreated = true
      this.taskName = ''
      this.$refs.form.resetValidation()
      this.dialog = false
      this.currentTab = this.tasks.length - 1
      this.targetTaskIndex = this.tasks.length - 1
    },
    activateTask(evt) {
      this.targetTaskIndex = evt.target.getAttribute('index')
    },
    dragoverHandler(evt) {
      evt.preventDefault()
    },
    dropHandler(evt) {
      evt.preventDefault()
      const data = evt.dataTransfer.getData('application/json')
      console.log(data)
    }
  },

  watch: {
    targetTaskIndex() {
      this.currentTaskIndex = this.targetTaskIndex
      this.$root.$emit('switchTask', Object.assign([], this.tasks[this.targetTaskIndex].records))
    },
    uuid(val) {
      console.log(val)
    }
  },

  mounted() {
    this.$root.$on('updateRecord', val => {
      this.tasks[this.currentTaskIndex].records = [...val]
    })
  },

  updated() {
    // this.$nextTick(() => {
    //   if (!this.newTaskCreated) {
    //     return
    //   }
    //   this.$el.querySelectorAll('.task-tab:last-child')[0].dispatchEvent(new Event('click'))
    //   this.newTaskCreated = false
    // })
  }
};
</script>
