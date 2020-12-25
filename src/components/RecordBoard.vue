<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="250">
      <v-card>
        <v-card-title class="headline"> Delete Record? </v-card-title>
        <v-card-text
          >Are you sure deleting record {{ deleteTarget }}</v-card-text
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
        <tr v-for="(item, index) in records" :key="item.key" :index="index" @dragstart="dragstartHandler">
          <td>
            <v-icon class="move-icon" @mouseenter="enterMoveIcon" @mouseleave="leaveMoveIcon">mdi-drag</v-icon>
          </td>
          <td>{{ item.startTimeString }}</td>
          <td>{{ item.endTimeString }}</td>
          <td>{{ item.durationString }}</td>
          <td>
            <v-btn
              elevation="2"
              icon
              rounded
              x-small
              @click="setDeleteTarget"
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
  name: "HelloWorld",
  data: () => ({
    startTime: 0,
    endTime: 0,
    duration: 0,
    records: [],
    deleteTarget: 0,
    dialog: false,
  }),

  watch: {
    records(val) {
      let totalSpendTime = val.reduce((arr, cur) => {
        return arr + cur.duration;
      }, 0);
      this.$root.$emit("recordChange", totalSpendTime);
      this.$root.$emit("updateRecord", val)
    },
  },

  methods: {
    deleteRecord() {
      this.dialog = false
      this.records.splice(this.currentRecord, 1)
    },
    setDeleteTarget(event) {
      this.dialog = true
      const target = event.target.closest('tr')
      const tds = Array.from(target.querySelectorAll('td'))
      const start = tds[1].textContent
      const end = tds[2].textContent
      const duration = tds[3].textContent
      this.deleteTarget = `which start from ${start} to ${end} (${duration})`
      this.currentRecord = index(target)
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
    }
  },

  mounted() {
    this.$root.$on("watchStart", () => {
      this.startTime = new Date();
    });
    this.$root.$on("watchStop", () => {
      this.endTime = new Date();
      this.duration = Math.round((this.endTime - this.startTime) / 1000);
      this.records.unshift({
        startTime: this.startTime,
        endTime: this.endTime,
        startTimeString:
          this.startTime.toLocaleDateString() +
          " " +
          this.startTime.toTimeString().replace(/ .*$/, ""),
        endTimeString:
          this.endTime.toLocaleDateString() +
          " " +
          this.endTime.toTimeString().replace(/ .*$/, ""),
        duration: this.duration,
        durationString: Utils.parseDate(this.duration),
        key: new Date().getTime(),
      });
    });
    this.$root.$on('switchTask', val => {
      this.records = val
    })
  },
};
function index(el) {
  let i = -1
  while(el) {
    el = el.previousElementSibling
    i++
  }
  return i
}
</script>
 
<style scoped>
.move-icon:hover {
  color: black;
  cursor: grab;
  box-shadow: 0 0 5px 0 white;
  /* background-color: rgba(0,0,0,0); */
}
</style>