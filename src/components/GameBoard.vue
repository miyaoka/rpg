<template>
  <div
    class="GameBoard"
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
    onDragOver(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    onDrop(e) {
      e.preventDefault()
      e.stopPropagation()
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
