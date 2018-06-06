<template>
  <div class="max">
    <div class="value" :style="{ width: percent }" />
  </div>
</template>

<script>
export default {
  props: {
    max: { type: Number, required: true },
    value: { type: Number, required: true }
  },
  computed: {
    ratio() {
      const ratio = this.value / this.max
      return isNaN(ratio) ? 0 : Math.max(Math.min(ratio, 1), 0)
    },
    percent() {
      return `${this.ratio * 100}%`
    }
  }
}
</script>

<style scoped>
.max {
  background: #000;
}
.value {
  background: #0f0;
  height: 100%;
}
</style>
