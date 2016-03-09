"use strict"

/* eslint-disable no-loop-func */
const bindAll = function (obj) {
  for (let i = 1; i < arguments.length; i++) {
    const func = arguments[i]
    const orig = obj[func]
    obj[func] = function () {
      return orig.apply(obj, arguments)
    }
  }
}

/**
 * Test Case
 */
class List {
  constructor() {
    this.items = []
  }

  add(item) {
    this.items.push(item)
  }

  addAll(items) {
    items.forEach(this.add)
  }
}

const list = new List()
bindAll(list, "add")
list.addAll([1, 2, 3, 4])
console.log(list.items.length)
