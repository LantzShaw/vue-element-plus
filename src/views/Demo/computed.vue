<template>
  <div></div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const name = ref<string>('Lantz')
const foo = ref<number>(0)

const fullName = computed(() => {
  return `${name.value} Shaw`
})

// computed 也可以接收一个对象，这个对象可以接收 get 和 set 两个方法
// 当去修改 baz 值的时候会触发 set baz 并不可直接被修改，赋给 baz 的值会作为参数传递到 set 方法中
const baz = computed({
  get() {
    return foo.value
  },
  set(value: number) {
    foo.value = value
  },
})

setTimeout(() => {
  baz.value = 100
}, 3000) // 1. 三秒后给 baz 赋值

defineExpose({
  name,
  fullName,
  baz,
})

// 参考文章: https://www.jianshu.com/p/a0b19f4616fb
</script>

<style lang="scss" scoped></style>
