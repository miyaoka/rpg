<template>
  <div class="WorkerList">
    <WorkerListItem
      v-for="worker in workerList"
      :key="worker._id"
      :worker="worker"
      :taskId="taskId"
    />
  </div>
</template>

<script>
import WorkerListItem from '@/components/WorkerListItem'

export default {
  components: {
    WorkerListItem
  },
  props: {
    workerList: { type: Array, required: true },
    taskId: { type: String, default: '' }
  }
}
</script>

<style scoped>
.WorkerList {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
