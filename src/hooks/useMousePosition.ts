// Here we dinfine a hook function

import { onBeforeMount, onMounted, ref } from 'vue'

export default function () {
  const x = ref<number>(0)
  const y = ref<number>(0)

  const clickHandler = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    document.addEventListener('click', clickHandler)
  })

  onBeforeMount(() => {
    // remove the listener
    document.removeEventListener('click', clickHandler)
  })

  // Don't forget to return x and y
  return {
    x,
    y,
  }
}
