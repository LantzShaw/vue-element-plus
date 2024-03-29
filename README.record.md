# Record

deineProps 中没有设置，就需要返回，不然会报错
return {count, msg}

**defineProps 获取组件传值**

```js
  defineProps<{ // 采用ts专有声明，无默认值 小写
    msg: string,
    num?: number
  }>()
     // 采用ts专有声明，有默认值
    interface Props {
        msg?: string
        labels?: string[]
    }
    const props = withDefaults(defineProps<Props>(), {
        msg: 'hello',
        labels: () => ['one', 'two']
    })

  defineProps({ // 非ts专有声明 大写
    msg: String,
    num: {
      type:Number,
      default: ''
    }
  })
```

**defineEmit 子组件向父组件事件传递**

```js
   /*ts专有*/
  const emit= defineEmits<{
    (e: 'click', num: number): void
  }>()
    /*非ts专有*/
  const emit= defineEmits(['click'])

  const clickThis = () => {
    emit('click',2)
  }
```

**defineExpose 子组件暴露自己的属性**

```vue
<template>
  <div>子组件helloword.vue</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(123456)
defineExpose({
  count,
})
</script>

<style scoped lang="less"></style>
```

**父组件获取属性**

```vue
<template>
  <div @click="helloClick">父组件</div>
  <helloword ref="hello"></helloword>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import helloword from './components/HelloWorld.vue'
const hello = ref(null)
const helloClick = () => {
  console.log(hello.value.count) // 123456
}
</script>

<style lang="less" scoped></style>
```

**defineOptions()的使用**

```sh
npm i unplugin-vue-define-options -D


```

**配置 vite.config.ts**

```ts
import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions()],
})
```

**tsconfig.json 添加 types 为如下所示：**

```json
"compilerOptions": {
    "types": ["unplugin-vue-define-options"]
  },

```

```vue
<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'HelloWorld',
})

// ts 专有声明 不能设置默认值 小写
// defineProps<{ msg: string }>()

// 非ts专有声明 可设置默认值 大写
defineProps({
  count: Number,
  msg: {
    type: String,
    default: 'hello',
  },
})

const count = ref(0)
// const msg = ref(0)

// deineProps中没有设置，就需要返回，不然会报错
// return {count, msg}
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped></style>
```

```sh
import { ref, onMounted, onBeforeMount } from 'vue'

export default function useMousePosition() {
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
    document.removeEventListener('click', clickHandler)
  })

  return {
    x,
    y,
  }
}


```

```sh
 // vue2
    // 对象：通过defineProperty()对对象的已有属性值的读取和修改进行劫持
    // 数组：通过重写更新数组一系列更新原素的方法来实现元素修改的支持
    // Object.defineProperty(data, 'count', {
    //   get() {},

    //   set() {}
    // })
    // 问题：
    // 对象直接添加的属性或删除已有属性，界面不会发生变化
    // 直接通过元素下标修改元素或修改length，界面不全自动更新


    // vue3
    // 通过Proxy(代理)：拦截对data任意属性的任意操作，包括属性的读写、属性的添加、删除...
    // 通过Reflect(反射): 动态对被代理对象的相应属性进行特定操作

    const user: any = {
      name: 'Lantz',
      gender: 'male',
      age: 36
    }

    const proxyUser = new Proxy(user, {
      get(target, prop) {
        console.log('get')


        return Reflect.get(target, prop)
      },

      // 修改目标对象属性、添加目标对象属性
      set(target, prop, value) {
        console.log('set')

        return Reflect.set(target, prop, value)
      },

      deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop)
      }
    })

    // 通过代理对象获取目标对象中的属性
    console.log(proxyUser.name)

    // 通过代理对象更新某个属性
    proxyUser.name = 'Fancy'

    proxyUser.nickname = 'Mr. Shaw'

    console.log(user)

    delete proxyUser.name

```

### typescript

1. https://zhuanlan.zhihu.com/p/455991366
2. https://www.cnblogs.com/gaoht/p/11720380.html

```sh
as unknow as string
```

**ts 教程**
https://juejin.cn/post/7068081327857205261

```sh
# 第一种获取target值的方式：
# 通过vue中的响应式对象可使用 toRaw() 方法获取原始对象
let list = toRaw(state.list)



# 第二种获取target值的方式，通过json序列化之后可获取值

JSON.parse(JSON.stringfy(state.getters.list))

```

### leaflet

```sh
什么是leaflet？
leaflet是一个轻量级的开源js地图组件，适用于移动设备，用法简单性能优越，如果你曾经使用过高德或者百度的地图api的话，相信你可以很轻易的上手更加简单的leaflet

leaflet是怎么运作的？
leaflet的工作方法和高德百度之类的并不一样，由于leaflet是个开源项目，所以它本身只有地图组件并不提供地图内容，也就是说，我们不需要为了使用leaflet而去注册key。

所以当我们在页面中创建了地图之后，还需要去其他的地图内容提供商（ArcGIS）那里加载地图，有可能需要申请key，当然，在下文里我会给出一个免费又好看的地图内容的。


ArcGIS提供商：google地图 高德地图 百度地图 mapbox esri-leaflet
https://developers.arcgis.com/esri-leaflet/samples/composing-basemaps/


一般为256px*256px的瓦片地图

参考文章: https://www.cnblogs.com/jiaobaba/archive/2020/05/08/12850101.html
```
