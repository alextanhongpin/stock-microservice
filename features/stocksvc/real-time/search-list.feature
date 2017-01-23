Feature: Search stocks to add in subscription

  Part of the "Real-Time" Epic

    As a user
    I want to search for a stock symbol 
    So that I can add it to my subscription list

  Scenario: Search returns results
    Given that I search for a symbol
    And it exist
    Then it shall be added to my list

  Scenario: Search returns no results
    Given that I search for a symbol
    And it does not exist
    Then I shall see a message "Not found"