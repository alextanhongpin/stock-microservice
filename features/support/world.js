var {defineSupportCode} = require('cucumber')

function CustomWorld () {
  this.global = 'Hello World'
}

defineSupportCode(function ({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})
