<template>
  <div>User Item</div>
  <button @click="clickHandler">传值</button>
  <div>{{ name }}</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

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
})

const title = ref<string>('Title')

const info = reactive<UserInfo>({
  name: 'Lantz',
})

const clickHandler = (): void => {
  console.log(props.name)

  emit('change', title.value)
}

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
