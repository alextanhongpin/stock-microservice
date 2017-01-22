Feature: Stock Alert

  As a user of Stock.js
  I want to receive alerts
  So that I can decide whether to buy/sell/hold my stocks.

  Scenario: Current price hit above target price
    Given that I have a target price of "2.00"
    When the current price is "2.01"
    Then I should get an alert "The price is above by 0.01"

  Scenario: Current price hit below target price
    Given that I have a target price of "2.00"
    When the current price is "1.99"
    Then I should get an alert "The price is below by 0.01"

  Scenario: Current price does not change
    Given that I have a target price of "2.00"
    When the current price is "2.00"
    Then I will not receive any alert

  Scenario: Set alert time to 10.00 A.M.
  	Given that I have set the alert time to 10.00 A.M.
  	When the current time is 10.00 A.M.
  	Then I will receive alert for stocks I have subscribed to

  Scenario: Set alert time to 4.00 P.M.
  	Given that I have set the alert time to 4.00 P.M.
  	When the current time is 4.00 P.M.
  	Then I will receive alert for stocks I have subscribed to

  Scenario: Have not set time at all
  	Given that I have not set any alert time
  	Then I will not receive alert for stocks I have subscribed to