/************  shallowReactive *************/
const shallowReactiveHandler = {
  get(target, prop) {
    return Reflect.get(target, prop)
  },

  set(target, prop, value) {
    return true
  },

  deleteProperty(target, prop) {
    return true
  },
}

function shallowReactive(target) {
  if (target && typeof target === 'object') {
    return new Proxy(target, shallowReactiveHandler)
  }

  return target
}

/************  reactive *************/
const reactiveHandler = {
  get(target, prop) {
    return Reflect.get(target, prop)
  },

  set(target, prop, value) {
    return Reflect.set(target, prop, value)
  },

  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop)
  },
}

function reactive(target) {
  if (target && typeof target === 'object') {
    if (Array.isArray(target)) {
      target.forEach(item => {
        target[item] = reactive(item)
      })
    } else {
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }

    return new Proxy(target, reactiveHandler)
  }

  return target
}

/************  readonly *************/
const readonlyHandler = {
  get(target, prop) {
    return Reflect.get(target, prop)
  },

  set(target, prop, value) {
    console.warn("This is readonly data, you can't set it")
  },

  deleteProperty(target, prop) {
    console.warn("This is readonly data, you can't delete it")
  },
}

function readonly(target) {
  if (target && typeof target === 'object') {
    if (Array.isArray(target)) {
      target.forEach(item => {
        target[item] = readonly(item)
      })
    } else {
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key])
      })
    }

    return new Proxy(target, readonlyHandler)
  }

  return target
}

/************  shallowReadonly *************/
const shallowReadonlyeHandler = {
  get(target, prop) {
    const result = Reflect.get(target, prop)

    return result
  },

  set(target, prop, value) {
    const result = Reflect.set(target, prop, value)

    return result
  },

  deleteProperty(target, prop) {
    const result = Reflect.deleteProperty(target, prop)

    return result
  },
}

function shallowReadonly(target) {
  if (target && typeof target === 'object') {
    return new Proxy(target, shallowReadonlyeHandler)
  }

  return target
}

/************  ref *************/
