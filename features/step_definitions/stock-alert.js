const assert = require('assert')
const {defineSupportCode} = require('cucumber')

class Stock {
  set current (value) {
    this._current = value
  }
  get current () {
    return this._current
  }
  set target (value) {
    this._target = value
  }
  get target () {
    return this._target
  }

  alert () {
    if (this._current > this._target) {
      const diff = this._current - this._target
      console.log(diff)
      return 'The price is above by ' + diff
    }
  }
}

// const stub = sinon.stub()
// stub.withArgs(1).returns(1)

// console.log(stub(1))

defineSupportCode(function ({ Given, When, Then }) {
  const stock = new Stock()
  stock.target = 2.00
  stock.current = 2.01

  Given('that I have a target price of {arg1:stringInDoubleQuotes}', function (arg1, callback) {
    assert.equal(parseInt(arg1), stock.target)
    callback()
  })

  When('the current price is {arg1:stringInDoubleQuotes}', function (arg1, callback) {
         // Write code here that turns the phrase above into concrete actions
    assert.equal(parseFloat(arg1), stock.current)
    callback()
  })

  Then('I should get an alert {arg1:stringInDoubleQuotes}', function (arg1, callback) {
         // Write code here that turns the phrase above into concrete actions
    assert.equal(arg1, stock.alert())
    callback()
  })

  Then('I will not receive any alert', function (callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })
  Given('that I have set the alert time to {arg1:float} A.M.', function (arg1, callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })
  When('the current time is {arg1:float} A.M.', function (arg1, callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Then('I will receive alert for stocks I have subscribed to', function (callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Given('that I have set the alert time to {arg1:float} P.M.', function (arg1, callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  When('the current time is {arg1:float} P.M.', function (arg1, callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Then('I will receive alert for stocks I have subscribed to', function (callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Given('that I have not set any alert time', function (callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Then('I will not receive alert for stocks I have subscribed to', function (callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })
})
