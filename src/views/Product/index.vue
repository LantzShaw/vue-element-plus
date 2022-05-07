<template>
  <div>Product Page</div>
  <hr />
  <div>
    <span>x:</span>
    <span>{{ x }}</span>
    <br />
    <span>y:</span>
    <span>{{ y }}</span>
  </div>
  <el-button type="primary">Button</el-button>
  <l-button label="ddd"></l-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import useMousePosition from '@/hooks/useMousePosition'

const { x, y } = useMousePosition()

defineOptions({
  name: 'Product',
})
</script>
