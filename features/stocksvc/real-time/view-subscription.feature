Feature: Subscribe to Real Time Stocks

  Part of the "Real-Time" Epic

    As a user
    I want to subscribe to real-time stocks
    So that I can view them.

  Scenario: Subscription list is empty
    Given that I have no items in my purchase list
    Then it should return empty results

  Scenario: Subscription contains a symbol
    Given that my subscription list contains a symbol
    Then I will receive real-time updates for the symbol

  Scenario: Subscription contains multiple symbols
    Given that my subscription list contains multiple symbols
    Then I will receive real-time updates for multiple symbols