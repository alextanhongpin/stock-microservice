# stock-alert/create-alert-rule.feature
Feature: Create alert rule

  Part of the 'Stock Alert' Epic

    As a user, 
    I want to create alert rules,
    so that I will receive alert when the conditions are met.

  Scenario: User set target high
    Given that the user set a target high for a stock
    When the stock reach the target high
    Then the user will receive an alert

  Scenario: User set target low
    Given that the user set a target low for a stock
    When the stock reach the target low
    Then the user will receive an alert

  Scenario: User set specific value
    Given that the user set a specific value to watch
    When the stock reach close to the target
    Then the user will receive an alert

  Scenario: User set RSI value
    Given that the user set a target RSI value to watch
    When the RSI value reach close to the target
    Then the user will receive an alert

  Scenario: User set SMA value
    Given that the user set target SMA values to watch
    When the SMA values crosses each other
    Then the user will receive an alert

  
