Feature: Add Stocks to Watchlist
  
  Part of the "Watchlist" Epic

    As a user of Stock.js
    I want to create a new watchlist
    so that I can group stocks together

  Scenario: Default watchlist
    Given that I am at my watchlist
    Then I should have a default list
    And it should be named "My list"

  Scenario: Add new watchlist
    Given that I have a default watchlist
    When I create a new watchlist with the name "REITs list"
    Then I should have two watchlist

  Scenario: Add max of 5 watchlist
    Given that I have two watchlist
    Then I can only add another three watchlist
    And the max watchlist I can have is five
