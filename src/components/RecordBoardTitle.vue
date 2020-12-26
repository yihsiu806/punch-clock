<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="250">
      <v-card>
        <v-card-title>
          <span class="headline">Rename</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="taskNameIsValid">
              <v-text-field v-model="newName" :rules="taskNameRules"  label="Task Name" autofocus></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Cancle
          </v-btn>
          <v-btn color="green darken-1" text @click="renameTask">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteConfirm" max-width="250">
      <v-card>
        <v-card-title>
          <span class="headline">Delete</span>
        </v-card-title>
        <v-card-text>
          Are you sure delete <span class="red--text">{{ taskName }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="gray darken-1" text @click="deleteConfirm = false">
            Cancle
          </v-btn>
          <v-btn color="red" text @click="deleteTask">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="d-flex flex-row align-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="lime darken-2" v-bind="attrs" v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="showRenameDialog">
            <v-list-item-title> Rename </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="taskNum > 1">
            <v-list-item-title @click="showDeleteDialog"> Delete </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <h4 class="lime--text ml-5">{{ taskName }}</h4>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "RecordBoardTitle",

  props: {
    boardTitle: String,
    taskNum: Number,
  },

  data: () => ({
    dialog: false,
    deleteConfirm: false,
    taskName: '',
    taskNameIsValid: true,
    newName: '',
    taskNameRules: [
      v => v.length > 0,
    ],
  }),

  methods: {
    showRenameDialog() {
      this.dialog = true
    },
    renameTask() {
      this.dialog = false
      this.$root.$emit("renameTask", this.newName);
      this.taskName = this.newName
      this.newName = ''
    },
    showDeleteDialog() {
      this.deleteConfirm = true
    },
    deleteTask() {
      this.deleteConfirm = false
      this.$root.$emit("deleteTask");
    },
  },

  mounted() {
    this.taskName = this.boardTitle
    this.$root.$on('recordBoardNeedChange', val => {
      this.taskName = val.name
      this.records = val.records
    })
  },

};
</script>
 
<style scoped>
</style>