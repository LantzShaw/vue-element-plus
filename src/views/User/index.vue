<template>
  <div>User Page</div>
  <p><button @click="increase">+</button></p>
  <p>
    <span>{{ count }}</span>
  </p>
  <p><button @click="decrease">-</button></p>

  <p>
    <span>{{ name }}</span>
  </p>
  <button @click="update">更新</button>

  <user-item name="hello world" @change="changeHandler" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/modules/counter'
import UserItem from './UserItem.vue'

defineOptions({
  name: 'User',
})

const props = defineProps({})

const emit = defineEmits(['on-change'])

const counterStore = useCounterStore()

// 这种方式不知道可不可以用
// let { count } = counterStore
// count = computed(() => count.value)

const { count } = storeToRefs(counterStore)
const { increase, decrease } = counterStore

const name = ref('Lantz')

const update = () => {
  name.value += '===='

  emit('on-change', 'hello')
}

const changeHandler = name => {
  console.log(name)
}

console.log(count)
console.log(useCounterStore())

watch(
  () => count,
  (newValue, oldValue) => {
    console.log('count changed')
  }
)

watch(
  () => name.value, // TODO: 这里要.value吗？
  (newValue, oldValue) => {
    console.log('name changed')
  }
)

defineExpose({
  count,
  increase,
  decrease,
  name,
  update,
  changeHandler,
})
</script>

<style lang="scss" scoped></style>
