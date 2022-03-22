import { ref } from 'vue'

export default function usePermission() {
  const flag = ref<boolean>(false)

  function hasPermission(value?: string): boolean {
    if (!value) {
      return true
    }

    return false
  }

  return { hasPermission }
}
