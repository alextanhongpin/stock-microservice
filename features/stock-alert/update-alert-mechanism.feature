# stock-alert/update-alert-mechanism.feature

Feature: Update Alert Mechanism

  Part of the 'Stock Alert' Epic

    As a user,
    I want to be able to change the alert mechanism
    so that I can receive the correct notification


  Scenario: Set to SMS
    Given that the user set the preference to SMS
    When there is a new alert pending
    Then the user will receive an SMS

  Scenario: Set to Email
    Given that the user set the preference to Email
    When there is a new alert pending
    Then the user will receive an Email

  Scenario: Set to Telegram
    Given that the user set the preference to Telegram
    When there is a new alert pending
    Then the user will receive a Telegram message