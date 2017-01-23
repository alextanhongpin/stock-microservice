Feature: Add to subscription list

  Part of the "Real-Time" Epic

    As a user
    I want to add a stock from my subscription list 
    So that I can watch more list

  Scenario: Subscription list is empty
    Given that I have no items in my list
    When I add a valid symbol
    Then I shall see the symbol with real-time updates

  Scenario: Add same symbol
    Given that I have "AAPL" in my list
    When I search for "AAPL"
    Then it shall not appear in the list