const assert = require('assert')
const {defineSupportCode} = require('cucumber')

defineSupportCode(function ({ Given, When, Then }) {
  Given('that I have no items in my purchase list', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Then('it should return empty results', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Given('that I purchase {arg1:stringInDoubleQuotes} units of {arg2:stringInDoubleQuotes} stock', function (arg1, arg2, callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Given('each unit cost {arg1:stringInDoubleQuotes}', function (arg1, callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  When('I view my purchase list', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Then('it should have {arg1:stringInDoubleQuotes} units of {arg2:stringInDoubleQuotes} stock', function (arg1, arg2, callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Then('the total should be {arg1:stringInDoubleQuotes}', function (arg1, callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Given('that I only have {arg1:stringInDoubleQuotes} in my purchase list', function (arg1, callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  When('I view my purchase list', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Then('I should have no items in it', function (callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Given('that I purchase another additional {arg1:stringInDoubleQuotes} units of {arg2:stringInDoubleQuotes} stocks', function (arg1, arg2, callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Given('the price now is {arg1:stringInDoubleQuotes}', function (arg1, callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  When('I view my purchase list', function (callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })

  Then('I will see <symbol> with unit <unit> and price <price>:', function (table, callback) {
          // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })
})
