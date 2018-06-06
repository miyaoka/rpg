<template>
  <div>
    <div class="timer">
      <button @click="toggleTimer">{{ paused ? '>' : '■' }}</button>
      <div>{{count / 1000 | fixed}}</div>
    </div>

    <button @click="init">reset</button>
    <button @click="addTask">addTask</button>
    <button @click="addWorker">addWorker</button>
    <game-board/>

  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import GameBoard from '@/components/GameBoard'

export default {
  components: {
    GameBoard
  },
  filters: {
    fixed(v) {
      return v.toFixed(2)
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeyDown)
    this.init()
    this.timerStart()
  },
  computed: {
    ...mapState(['count', 'paused'])
  },
  methods: {
    ...mapActions(['timerStart', 'timerStop']),
    ...mapMutations(['init', 'addTask', 'addWorker']),
    onKeyDown(e) {
      if (e.key === ' ') this.toggleTimer()
    },
    toggleTimer() {
      this.paused ? this.timerStart() : this.timerStop()
    }
  }
}
</script>

<style scoped>
.timer {
  display: flex;
}
</style>
