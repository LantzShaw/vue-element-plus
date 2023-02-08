// app.directive('clickoutside', {
//   beforeMount(el, binding) {
//     document.addEventListener('click', (e) => {
//       el.contains(e.target) && binding.value();
//     }, false)
//   },
//   unmounted() {
//     document.removeEventListener('click', () => {})
//   }
// })

import { Directive, DirectiveBinding } from 'vue'

const clickOutside: Directive = {
  beforeMount(el, binding: DirectiveBinding) {},
}

export default clickOutside
