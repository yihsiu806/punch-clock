<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="250" @keydown="handleEnter">
      <v-card>
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="taskNameIsValid">
              <v-text-field v-model="taskName" :rules="taskNameRules"  label="Task Name" autofocus></v-text-field>
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
          @click="addNewTask"
        >
          <v-icon color="white"> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-tabs v-model="currentTab" vertical color="lime darken-1">
      <v-tab v-for="(task, index) in tasks" :key="task.uuid" :index="index" class="task-tab" @click="activateTask" @dragover="dragoverHandler" @drop="dropHandler" @dragenter="dragenterHandler" @dragleave="dragleaveHandler">
        {{ task.name }}
      </v-tab>
    </v-tabs>
  </v-container>
</template>

<script>
import * as Utils from '../utils/Utils'

export default {
  name: "Tasks",

  props: {
    tasks: Array,
  },

  data: () => ({
    dialog: false,
    taskNameIsValid: true,
    taskName: '',
    taskNameRules: [
      v => v.length > 0,
    ],
    currentTab: null,
    currentTaskIndex: 0,
  }),

  methods: {
    addNewTask() {
      if (!this.taskNameIsValid) {
        this.$refs.form.resetValidation()
      }
      this.dialog = true
    },

    saveNewTask() {
      this.$refs.form.validate()
      if (!this.taskNameIsValid) {
        return
      }
      this.tasks.push({
        order: this.tasks.length,
        name: this.taskName,
        uuid: Utils.generateUUID(),
        records: [],
      })
      this.taskName = ''
      this.$refs.form.resetValidation()
      this.dialog = false
      this.currentTab = this.tasks.length - 1
      this.currentTaskIndex = this.tasks.length - 1
    },
    
    activateTask(evt) {
      this.currentTaskIndex = evt.target.getAttribute('index')
    },

    dragoverHandler(evt) {
      evt.preventDefault()
      if (evt.target.getAttribute('index') == this.currentTaskIndex) {
        evt.dataTransfer.dropEffect = 'none'
      } else {
        evt.dataTransfer.dropEffect = "move"
      }
    },

    dropHandler(evt) {
      evt.preventDefault()
      evt.target.classList.remove('drag-over')
      const data = JSON.parse(evt.dataTransfer.getData('application/json'))
      const index = evt.target.getAttribute('index')
      this.tasks[index].records.push(data)
      Utils.sortRecordByStartTime(this.tasks[index].records)
    },

    dragenterHandler(evt) {
      if (evt.target.getAttribute('index') == this.currentTaskIndex) {
        return
      }
      evt.target.classList.add('drag-over')
    },

    dragleaveHandler(evt) {
      evt.target.classList.remove('drag-over')
    },

    handleEnter(evt) {
      if (evt.code == 'Enter') {
        evt.stopPropagation()
        evt.preventDefault()
      }
    }
  },

  watch: {
    currentTaskIndex(val) {
      this.$root.$emit('recordBoardNeedChange', {
        name: this.tasks[val].name,
        records: Object.assign([], this.tasks[val].records),
      })
    },
  },

  mounted() {
    this.$root.$on('recordChange', val => {
      this.tasks[this.currentTaskIndex].records = [...val]
    })
  },

};
</script>

<style scoped>
  .drag-over {
    background-color: silver;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.08);
    border: 1px solid silver;
  }
</style>