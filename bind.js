"use strict"

const bind = function (func, scope) {
  return function () {
    func.apply(scope, arguments)
  }
}

/**
 * Test Case
 */
class List {
  constructor() {
    this.list = []
  }

  addAll(items) {
    items.forEach(bind((item) => {
      this.list.push(item)
    }, this))
    console.log(this.list.length)
  }
}

const list = new List()
list.addAll([1, 2, 3, 4])
