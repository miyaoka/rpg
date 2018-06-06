<template>
  <div
    class="TaskListItem"
    :class="{ isDragOver }"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    {{task.currentHealth | fixed}} /
    {{task.maxHealth | fixed}}
    <progress-bar
      :max="task.maxHealth"
      :value="task.currentHealth"
      class="bar"
    />
    <worker-list
      :workerList="assignedWorkerList"
      :taskId="task._id"
    />
    <div v-if="workerSum > 0">
      pow:{{workerSum}} / {{ (task.currentHealth / workerSum) | fixed }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProgressBar from '@/components/ProgressBar'
import WorkerList from '@/components/WorkerList'

export default {
  data() {
    return {
      isDragOver: false
    }
  },
  components: {
    ProgressBar,
    WorkerList
  },
  filters: {
    fixed(v) {
      return v.toFixed(1)
    }
  },
  props: {
    task: { type: Object, requred: true }
  },
  computed: {
    assignedWorkerList() {
      return this.$store.getters.assignedWorkerList(this.task._id)
    },
    workerSum() {
      return this.assignedWorkerList.reduce((acc, curr) => acc + curr.power, 0)
    }
  },
  methods: {
    ...mapActions(['assignWorkerToTask']),
    onDragEnter() {
      this.isDragOver = true
    },
    onDragLeave() {
      this.isDragOver = false
    },
    onDragOver(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    onDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragOver = false
      const workerId = e.dataTransfer.getData('text/plain')
      this.assignWorkerToTask({ workerId, taskId: this.task._id })
    }
  }
}
</script>

<style scoped>
.TaskListItem {
  width: 200px;
  height: 200px;
  border: 1px solid;
  border-radius: 50%;
  margin: 10px;
  background: rgb(78, 152, 101);
}
.isDragOver {
  opacity: 0.5;
}
.bar {
  width: 100%;
  height: 10px;
}
</style>
