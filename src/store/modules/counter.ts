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

// // 方法一
// user_store.count++

// // 方法二，需要修改多个数据，建议用 $patch 批量更新，传入一个对象
// user_store.$patch({
//     count: user_store.count1++,
//     // arr: user_store.arr.push(1) // 错误
//     arr: [ ...user_store.arr, 1 ] // 可以，但是还得把整个数组都拿出来解构，就没必要
// })

// // 使用 $patch 性能更优，因为多个数据更新只会更新一次视图

// // 方法三，还是$patch，传入函数，第一个参数就是 state
// user_store.$patch( state => {
//     state.count++
//     state.arr.push(1)
// })
