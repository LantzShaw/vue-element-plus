<template>
   
  <Child msg="非porps传值子组件用attrs接收">
       
    <!-- 匿名插槽 -->
       
    <span>默认插槽</span>
       
    <!-- 具名插槽 -->
       
    <template #title>
           
      <h1>具名插槽</h1>
         
    </template>
       
    <!-- 作用域插槽 -->
       
    <template #footer="{ scope }">
           
      <footer>作用域插槽——姓名：{{ scope.name }}，年龄{{ scope.age }}</footer>
         
    </template>
     
  </Child>
</template>
​

<!-- 参考文章 -->
<!-- https://blog.csdn.net/Ag_wenbi/article/details/122210248 -->
<!-- 使用实战
新建xxx.tsx或者xxx.jsx，注意不再是vue为后缀 -->
<!-- 安装@vitejs/plugin-vue-jsx -->
<!-- TODO: jsx -->
<!-- <script lang="ts" setup>
// 引入子组件
import Child from './Child.vue'
</script>


<script lang='jsx'>
import { defineComponent, useSlots } from "vue";
export default defineComponent({
  setup() {
    // 获取插槽数据
    const slots = useSlots();
    // 渲染组件
    return () => (
      <div>
        {slots.default?slots.default():''}
        {slots.title?slots.title():''}
      </div>
    );
  },
});
</script> -->
