import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {
    double: state => state.count * 2,
  },
  actions: {
    increase() {
      this.count++
    },
    decrease() {
      this.count--
    },
  },
})

// export const useCounterStore = defineStore('counter', () => {
//     const count = ref(0)
//     function increment() {
//       count.value++
//     }

//     return { count, increment }
//   })
