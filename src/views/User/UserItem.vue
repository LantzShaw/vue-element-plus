<template>
  <div>User Item</div>
  <button @click="clickHandler">传值</button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

defineOptions({
  name: 'UserItem'
})

const props = defineProps({
  name: {
    type: String,
    default: 'name',
    required: true
  }
})

const title = ref<string>('Title')

type Info = {
  name: string
}

const info = reactive<Info>({
  name: 'Lantz'
})

const emit = defineEmits(['change'])

const clickHandler = (): void => {
  emit('change', title.value)
}

// 可写可不写，写了之后就一定要按照return的写法，不然会报红
return { title,  info, clickHandler }
</script>

<style scoped>
</style>
