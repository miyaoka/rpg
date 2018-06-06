<template>
  <transition-group class="TaskList">
    <TaskListItem
      v-for="task in taskList"
      :key="task._id"
      :task="task"
    />
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'
import TaskListItem from '@/components/TaskListItem'

export default {
  components: {
    TaskListItem
  },
  computed: {
    ...mapState(['taskList'])
  }
}
</script>

<style scoped>
.TaskList {
  display: flex;
  justify-content: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease-out;
}

.v-enter,
.v-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
