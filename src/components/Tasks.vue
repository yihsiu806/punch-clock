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
              <v-text-field
                v-model="taskName"
                :rules="taskNameRules"
                label="Task Name"
                autofocus
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Cancle
          </v-btn>
          <v-btn color="green darken-1" text @click="saveNewTask"> Save </v-btn>
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
      <v-tab
        draggable="true"
        v-for="(task, index) in tasks"
        :key="task.uuid"
        :index="index"
        drag-type="task"
        class="task-tab"
        @click="activateTask"
        @dragover="handleDragover"
        @drop="handleDrop"
        @dragenter="handleDragenter"
        @dragleave="handleDragleave"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
      >
        {{ task.name }}
      </v-tab>
    </v-tabs>
  </v-container>
</template>

<script>
import * as Utils from "../utils/Utils";

export default {
  name: "Tasks",

  props: {
    tasks: Array,
  },

  data: () => ({
    dialog: false,
    taskNameIsValid: true,
    taskName: "",
    taskNameRules: [(v) => v.length > 0],
    currentTab: null,
    currentTaskIndex: 0,
  }),

  methods: {
    addNewTask() {
      if (!this.taskNameIsValid) {
        this.$refs.form.resetValidation();
      }
      this.dialog = true;
    },

    saveNewTask() {
      const uuid = Utils.generateUUID()
      this.$refs.form.validate();
      if (!this.taskNameIsValid) {
        return;
      }
      this.tasks.unshift({
        order: this.tasks.length,
        name: this.taskName,
        uuid: uuid,
        records: [],
      });
      this.taskName = "";
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.currentTab = uuid;
      this.currentTaskIndex = this.tasks.length - 1;
    },

    activateTask(evt) {
      this.currentTaskIndex = evt.target.getAttribute("index");
    },

    handleDrop(evt) {
      evt.preventDefault();
      const type = evt.target.getAttribute('drag-type')
      if (type == 'record') {
        evt.target.classList.remove("drag-over");
        const data = JSON.parse(evt.dataTransfer.getData("application/json"));
        const index = evt.target.getAttribute("index");
        this.tasks[index].records.push(data);
        Utils.sortRecordByStartTime(this.tasks[index].records);
      } else if (type == 'task') {
        evt.target.classList.remove('task-over')
        const dragIndex = Number(evt.dataTransfer.getData('text/plain'))
        const dropIndex = Number(evt.target.getAttribute("index"))
        if (dragIndex != dropIndex) {
          [this.tasks[dragIndex], this.tasks[dropIndex]] = [this.tasks[dropIndex], this.tasks[dragIndex]]
          this.currentTaskIndex = dropIndex
          this.currentTab = this.tasks[dropIndex].uuid
        }
      }
    },

    handleDragover(evt) {
      evt.preventDefault();
      const type = evt.target.getAttribute('drag-type')
      if (type == 'record') {
        if (evt.target.getAttribute("index") == this.currentTaskIndex) {
          evt.dataTransfer.dropEffect = "none";
        } else {
          evt.dataTransfer.dropEffect = "move";
        }
      }
    },

    handleDragenter(evt) {
      const type = evt.target.getAttribute('drag-type')
      if (type == 'record') {
        if (evt.target.getAttribute("index") == this.currentTaskIndex) {
          return;
        }
        evt.target.classList.add("drag-over");
      } else if (type == 'task') {
        evt.target.classList.add('task-over')
      }
    },

    handleDragleave(evt) {
      const type = evt.target.getAttribute('drag-type')
      if (type == 'record') {
        evt.target.classList.remove("drag-over");
      } else if (type == 'task') {
        evt.target.classList.remove('task-over')
      }
    },

    handleDragStart(evt) {
      evt.target.style.opacity = '0.4'
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.setData('text/plain', evt.target.getAttribute('index'))
    },

    handleDragEnd(evt) {
      evt.target.style.opacity = '1'
    },

    handleEnter(evt) {
      if (evt.code == "Enter") {
        evt.stopPropagation();
        evt.preventDefault();
      }
    },

  },

  watch: {
    currentTaskIndex(val) {
      this.$root.$emit("recordBoardNeedChange", {
        name: this.tasks[val].name,
        records: Object.assign([], this.tasks[val].records),
      });
    },
  },

  mounted() {
    this.$root.$on("recordChange", (val) => {
      this.tasks[this.currentTaskIndex].records = [...val];
    });
    this.$root.$on("renameTask", (val) => {
      this.tasks[this.currentTaskIndex].name = val;
      Utils.syncData(JSON.stringify(this.tasks));
    });
    this.$root.$on("deleteTask", () => {
      const target = this.currentTaskIndex;
      if (target + 1 < this.tasks.length) {
        this.currentTab = this.tasks[target + 1].uuid;
        this.currentTaskIndex = target + 1;
      } else if (target - 1 >= 0) {
        this.currentTab = this.tasks[target - 1].uuid;
        this.currentTaskIndex = target - 1;
      }
      this.tasks.splice(target, 1);
    });
  },
};
</script>

<style scoped>
.drag-over {
  background-color: silver;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid silver;
}
.v-tab {
  text-transform: none;
}
.task-over {
  border: 3px dotted #666;
}
</style>