<template>
  <transition-group class="WorkerList">
    <WorkerListItem
      v-for="worker in workerList"
      :key="worker._id"
      :worker="worker"
      :taskId="taskId"
    />
  </transition-group>
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
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease-out;
}

.v-enter,
.v-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
