<template>
  <div
    class="GameBoard"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <task-list/>
    <worker-list :workerList="workerList" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TaskList from '@/components/TaskList'
import WorkerList from '@/components/WorkerList'

export default {
  data() {
    return {
      isDragOver: false
    }
  },
  components: {
    TaskList,
    WorkerList
  },
  props: {
    task: { type: Object, requred: true }
  },
  computed: {
    ...mapState(['workerList'])
  },
  methods: {
    ...mapActions(['assignWorkerToTask']),
    onDragEnter(e) {
      this.isDragOver = true
    },
    onDragLeave(e) {
      this.isDragOver = false
    },
    onDragOver(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    onDrop(e) {
      console.log('drop to board')
      e.preventDefault()
      e.stopPropagation()
      this.isDragOver = false
      const workerId = e.dataTransfer.getData('text/plain')
      this.assignWorkerToTask({ workerId, taskId: '' })
    }
  }
}
</script>

<style scoped>
.GameBoard {
  background: rgb(169, 220, 219);
}
.isDragOver {
  opacity: 0.5;
}
</style>
