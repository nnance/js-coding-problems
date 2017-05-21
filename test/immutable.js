"use strict"

const expect = require("chai").expect
const immutable = require("../immutable")

class Dog {
  constructor(color, mother, father) {
    this.color = color
    this.mother = mother
    this.father = father
  }
}

describe("Immutable API", () => {
  let myDog
  before(() => {
    const greatGrandMother = new Dog("white")
    const greatGrandFather = new Dog("brown")
    const grandMother = new Dog("browm")
    const grandFather = new Dog("brown", greatGrandMother, greatGrandFather)
    const mother = new Dog("white")
    const father = new Dog("black", grandMother, grandFather)
    myDog = new Dog("grey", mother, father)
  })

  describe("When creating lenage", () => {
    it("myDog grand mother is browm", () => {
      expect(myDog.father.mother.color).to.equal("browm")
    })
  })

  describe("When changing grandmother color", () => {
    let newDog
    before(() => {
      newDog = immutable.modify(myDog, "father.mother.color", "brown")
    })
    it("myDog should not mutate", () => {
      expect(myDog.father.mother.color).to.equal("browm")
    })
    it("newDog grandmother to be brown", () => {
      expect(newDog.father.mother.color).to.equal("brown")
    })
    it("grandfather should be be brown", () => {
      expect(myDog.father.father.color).to.equal("brown")
    })
    it("myDog should be the same type", () => {
      expect(myDog instanceof Dog).to.equal(true)
    })
    it("myDog father should be the same type", () => {
      expect(myDog.father instanceof Dog).to.equal(true)
    })
  })
})
