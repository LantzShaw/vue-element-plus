<template>
  <div>Product Page</div>
  <hr>
  <div>
    <span>x:</span> <span>{{x}}</span>
    <br>
    <span>y:</span> <span>{{y}}</span>
  </div>
  <el-button>Button</el-button>
  <l-button label="ddd"></l-button>
  <l-input />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useMousePosition from '../../hooks/useMousePosition'

const {x, y} = useMousePosition()

defineOptions({
    name: 'Product'
})

</script>
