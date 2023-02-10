<template>
  <h2>Home Page</h2>
  <div>
    <button @click="count--">-</button>
    <span>{{ count }}</span>
    <button @click="increaseHandler">+</button>
  </div>
  <div>
    {{ foo }}
  </div>

  <!-- <Bar
    :title="'Title'"
    :isLoading="true"
    :themeMode="'light'"
    :legendData="['helo']"
    :series="['hello']"
    :seriesColor="[['#00daff', '#00daff']]"
    :xAxisData="xAxisData"
    :seriesData="seriesData"
  /> -->

  <Bar />

  <button @click="clickHandler">Click</button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
// import { Bar, Line, Pie, BarAndLine, MultiBar } from '@/components/charts'

// import { Bar } from 'litecharts'

//TODO: 类型可以export吗？
export interface UserInfo {
  name: string
  gender: string
  hobbiles: string[]
  age?: number
}

export default defineComponent({
  name: 'Home',
  // 只执行一次
  setup() {
    const xAxisData = ref(['2022-01', '2022-02', '2022-03'])
    const seriesData = ref(['20', '25', '10'])

    // ref 返回的是一个Ref对象
    const count = ref(10)

    // obj 被代理的对象（目标对象） foo 则是代理对象
    // 内部基于ES6的Proxy实现，通过代理对象操作原对象内部数据都是响应式
    const obj: UserInfo = { name: 'Lantz', gender: 'male', hobbiles: ['game'] }
    const foo = reactive<UserInfo>(obj) // 返回的是Proxy

    console.log('foo', count, foo)

    const increaseHandler = () => {
      count.value++
    }

    const clickHandler = () => {
      foo.name = 'Jack'
      foo.hobbiles[0] = 'Writting'

      // obj.age = 12 通过这种方式，页面数据不会更新

      // foo.age = 12 // 页面数据会更新

      // delete obj.age // 页面数据不会更新

      delete foo.age // 页面数据会更新

      // 如果操作代理对象，目标对象也会随着变化，同时，如果想要操作数据的时候，界面也会更新渲染，那么也可以操作代理对象
    }

    return {
      count,
      foo,
      xAxisData,
      seriesData,
      increaseHandler,
      clickHandler,
    }
  },
})
</script>
