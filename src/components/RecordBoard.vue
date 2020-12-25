<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="250">
      <v-card>
        <v-card-title class="headline"> Delete Record? </v-card-title>
        <v-card-text
          >Are you sure deleting record {{ recordString }}</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteRecord">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="d-flex flex-row align-center">
      <v-menu
      v-model="taskAction"
      :disabled="disabled"
      :absolute="absolute"
      :open-on-hover="openOnHover"
      :close-on-click="closeOnClick"
      :close-on-content-click="closeOnContentClick"
      :offset-x="offsetX"
      :offset-y="offsetY"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="lime darken-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              Rename
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              Delete
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <h4 class="lime--text ml-5">{{ taskName }}</h4>
    </div>
    <v-simple-table fixed-header>
      <thead>
        <tr>
          <th></th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Duration</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="index" :index="index" @dragstart="dragstartHandler" @dragend="dragendHandler">
          <td>
            <v-icon class="move-icon" @mouseenter="enterMoveIcon" @mouseleave="leaveMoveIcon" color="grey">
              mdi-dots-vertical
            </v-icon>
          </td>
          <td>{{ record.startTimeString }}</td>
          <td>{{ record.endTimeString }}</td>
          <td>{{ record.durationString }}</td>
          <td>
            <v-btn
              icon
              rounded
              x-small
              color="grey"
              @click="confirmDelete"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <div class="wrapper"></div>
  </v-container>
</template>

<script>
import * as Utils from "../utils/Utils";

export default {
  name: "RecordBoard",

  props: {
    defaultRecord: Array,
    defaultTaskName: String,
  },

  data: () => ({
    taskName: '',
    recordString: 0,
    dialog: false,
    records: [],
    startTime: 0,
    endTime: 0,
    duration: 0,
    currentRecord: 0,

    disabled: false,
      absolute: false,
      openOnHover: false,
      value: false,
      closeOnClick: true,
      closeOnContentClick: true,
      offsetX: false,
      offsetY: true,
      taskAction: false,
  }),

  watch: {
    records(val) {
      this.$root.$emit("recordChange", val)
    },
  },

  methods: {
    confirmDelete(evt) {
      const target = evt.target.closest('tr')
      const tds = Array.from(target.querySelectorAll('td'))
      const start = tds[1].textContent
      const end = tds[2].textContent
      const duration = tds[3].textContent
      this.dialog = true
      this.recordString = `which start from ${start} to ${end} (${duration})`
      this.currentRecord = target.getAttribute('index')
    },
    deleteRecord() {
      this.dialog = false
      this.records.splice(this.currentRecord, 1)
    },
    enterMoveIcon(evt) {
      evt.target.closest('tr').setAttribute('draggable', 'true')
    },
    leaveMoveIcon(evt) {
      evt.target.closest('tr').removeAttribute('draggable')
    },
    dragstartHandler(evt) {
      const index = evt.target.getAttribute('index')
      evt.dataTransfer.setData('application/json', JSON.stringify(this.records[index]))
      evt.dataTransfer.effectAllowed = 'move';
    },
    dragendHandler(evt) {
      if (evt.dataTransfer.dropEffect == 'move') {
        const index = evt.target.getAttribute('index')
        this.records.splice(index, 1)
      }
    },
  },

  mounted() {
    this.$root.$on('watchStart', () => {
      this.startTime = new Date();
    });
    this.$root.$on('watchStop', () => {
      this.endTime = new Date();
      this.duration = Math.round((this.endTime - this.startTime) / 1000);
      this.records.unshift({
        startTime: this.startTime,
        endTime: this.endTime,
        startTimeString:
          this.startTime.toLocaleDateString() +
          ' ' +
          this.startTime.toTimeString().replace(/ .*$/, ''),
        endTimeString:
          this.endTime.toLocaleDateString() +
          ' ' +
          this.endTime.toTimeString().replace(/ .*$/, ''),
        duration: this.duration,
        durationString: Utils.elapseTimeToDayHourMMSS(this.duration),
      });
    });
    this.$root.$on('recordBoardNeedChange', val => {
      this.taskName = val.name
      this.records = val.records
    })
    this.records = this.defaultRecord
    this.taskName = this.defaultTaskName
  },
};
</script>
 
<style scoped>
.move-icon:hover {
  color: black;
  cursor: grab;
  box-shadow: 0 0 5px 0 white;
}
</style>