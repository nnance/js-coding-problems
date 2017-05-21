"use strict"

const modify = function (obj, property, value) {
  const props = property.split(".")

  const shallowCopy = function (original) {
    const clone = Object.create(Object.getPrototypeOf(original))

    Object.getOwnPropertyNames(original).forEach((key) => {
      let descriptor = Object.getOwnPropertyDescriptor(original, key)
      if (descriptor.value && descriptor.value === "object") {
        descriptor = shallowCopy(descriptor.value)
      }
      Object.defineProperty(clone, key, descriptor)
    })
    return clone
  }

  const findProp = function (prop, index) {
    if (index < props.length - 1) {
      return findProp(prop[props[index]], index + 1)
    } else {
      return prop
    }
  }

  const clone = shallowCopy(obj)
  const prop = findProp(clone, 0)
  prop[props[props.length - 1]] = value
  return clone
}

module.exports = {
  modify
}
