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
import { ref, computed, defineEmits } from 'vue'
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
