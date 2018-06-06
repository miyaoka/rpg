<template>
  <div class="TaskList">
    <TaskListItem
      v-for="task in taskList"
      :key="task._id"
      :task="task"
    />
  </div>
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
</style>
