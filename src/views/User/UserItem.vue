<template>
  <div>User Item</div>
  <button @click="clickHandler">传值</button>
  <div>{{ name }}</div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

// useSlots 和 useAttrs

defineOptions({
  name: 'UserItem',
})

type UserInfo = {
  name: string
}

const emit = defineEmits(['change'])

const props = defineProps({
  name: {
    type: String,
    default: 'name',
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
})

const title = ref<string>('Title')

const info = reactive<UserInfo>({
  name: 'Lantz',
})

const clickHandler = (): void => {
  console.log(props.name)

  emit('change', title.value)
}

// 监听父级组件传递的所有属性
watch(
  props,
  () => {
    console.log('props changed')
  },
  {
    deep: true,
    immediate: true,
  }
)

// 只监听 name 属性
watch(
  () => props.name,
  (newValue, oldValue) => {
    console.log('name changed')
  }
)

watch(
  // [props.name, props.age], // 直接这样写也可以吗
  [() => props.name, () => props.age],
  (newValue, oldValue) => {
    console.log('name or age changed')
  },
  { deep: true, immediate: true }
)

// 只监听info的name 属性
watch(
  () => info.name,
  (newValue, oldValue) => {
    console.log('info changed')
  }
)

// info是一个对象，watch返回的是一个对象，那么watch只监听对象的子属性
// 孙属性，曾孙属性... 发生变更都不会触发 watch 方法
watch(
  () => info,
  (newValue, oldValue) => {
    console.log('info changed')
  }
)

// 可写可不写，写了之后就一定要按照return的写法，不然会报红
// return { title, info, clickHandler }

defineExpose({
  title,
  info,
  clickHandler,
})

// TS专属
// 导入 defineProps 组件
// import { defineProps } from 'vue'

// // 对象类型接口
// interface UserInfo {
//   id: number
//   age: number
// }

// // 定义 props
// defineProps<{
//   name: string
//   phoneNumber: number
//   userInfo: UserInfo
//   tags: string[]
// }>()

// 第二种
// import { defineProps, withDefaults } from 'vue'

// withDefaults(defineProps<{
//   size?: number
//   labels?: string[]
// }>(), {
//   size: 3,
//   labels: () => ['default label']
// })
</script>

<style lang="scss" scoped></style>
