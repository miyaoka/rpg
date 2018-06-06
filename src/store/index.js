import shortid from 'shortid'

let lastTimeValue = 0

const createTask = () => {
  const health = Math.random() * Math.random() * 10000 + 50
  return {
    _id: shortid.generate(),
    maxHealth: health,
    currentHealth: health
  }
}

const createWorker = () => {
  return {
    _id: shortid.generate(),
    power: Math.ceil(Math.random() * 100),
    onDrag: false,
    taskId: '',
    life: 3
  }
}

export const state = () => ({
  count: 0,
  paused: true,
  taskList: [],
  workerList: []
})
export const getters = {
  assignedWorkerList: (state) => (taskId) => {
    return state.workerList.filter((w) => w.taskId === taskId)
  },
  assignedWorkerPower: (state, getters) => (taskId) => {
    return getters
      .assignedWorkerList(taskId)
      .reduce((acc, curr) => acc + curr.power, 0)
  }
}
export const mutations = {
  count(state, payload) {
    state.count = payload
  },
  paused(state, payload) {
    state.paused = payload
  },
  taskList(state, payload) {
    state.taskList = payload
  },
  workerList(state, payload) {
    state.workerList = payload
  },
  init(state, payload) {
    state.taskList = [...Array(3)].map((a) => createTask())
    state.workerList = [...Array(5)].map((a) => createWorker())
  },
  addTask(state, payload) {
    state.taskList = [...state.taskList, createTask()]
  },
  addWorker(state, payload) {
    state.workerList = [...state.workerList, createWorker()]
  }
}
export const actions = {
  assignWorkerToTask({ commit, state }, { workerId, taskId }) {
    commit(
      'workerList',
      state.workerList.map(
        (w) =>
          w._id !== workerId
            ? w
            : {
                ...w,
                taskId: taskId
              }
      )
    )
  },
  timerStep({ dispatch, commit, state, getters }) {
    if (state.paused) return

    const nowTimeValue = new Date().valueOf()
    const diffTimeValue = nowTimeValue - lastTimeValue
    lastTimeValue = nowTimeValue

    const taskList = state.taskList.map((t) => ({
      ...t,
      currentHealth:
        t.currentHealth -
        diffTimeValue / 1000 * getters.assignedWorkerPower(t._id)
    }))

    // completed
    taskList.filter((t) => t.currentHealth <= 0).forEach((t) => {
      // release workers
      commit(
        'workerList',
        state.workerList.map(
          (w) =>
            w.taskId !== t._id
              ? w
              : {
                  ...w,
                  taskId: '',
                  life: w.life - 1
                }
        )
      )
    })

    const uncompletedTaskList = taskList.filter((t) => t.currentHealth > 0)
    commit('taskList', uncompletedTaskList)

    commit('count', state.count + diffTimeValue)
    requestAnimationFrame(() => dispatch('timerStep'))
  },
  timerStart({ dispatch, commit, state }) {
    commit('paused', false)
    lastTimeValue = new Date().valueOf()
    dispatch('timerStep')
  },
  timerStop({ commit, state }) {
    commit('paused', true)
  }
}
