<template>
  <div
    class="WorkerListItem"
    :class="{ disabled }"
    :draggable="!disabled"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    {{worker.power}} ({{worker.life}})
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'

export default {
  data() {
    return {
      isDragging: false
    }
  },
  components: {
    ProgressBar
  },
  props: {
    worker: { type: Object, required: true },
    taskId: { type: String, required: true }
  },
  computed: {
    disabled() {
      return this.isDragging || this.worker.taskId !== this.taskId
    }
  },
  methods: {
    onDragStart(e) {
      e.dataTransfer.setData('text/plain', this.worker._id)
      this.isDragging = true
    },
    onDragEnd() {
      this.isDragging = false
    }
  }
}
</script>

<style scoped>
.WorkerListItem {
  width: 50px;
  height: 60px;
  border: 1px solid;
  display: inline-block;
  margin: 5px;
  background: #cfc;
  cursor: pointer;
}
.disabled {
  opacity: 0.2;
  cursor: default;
}
.bar {
  width: 100%;
  height: 10px;
}
</style>
