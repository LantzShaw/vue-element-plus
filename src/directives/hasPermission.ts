// const ownPermission = ['user', 'order'];

import { Directive, DirectiveBinding } from 'vue'

// function toolPermission(el, permission) {
//   if (permission && !ownPermission.includes(permission)) {
//     el.parentNode && el.parentNode.removeChild(el); // 关键代码, 没有权限则删除元素
//   }
// }

// app.directive('permission', {
//   mounted(el, binding) {
//     toolPermission(el, binding.value)
//   },
//   updated(el, binding) {
//     toolPermission(el, binding.value)
//   }
// })

const hasPermission: Directive = {
  beforeMount(el, binding: DirectiveBinding) {},
}

export default hasPermission
