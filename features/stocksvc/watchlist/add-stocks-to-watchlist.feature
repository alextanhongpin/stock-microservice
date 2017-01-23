Feature: Add Stocks to Watchlist

  As a user of Stock.js
  I want to add stock quotes to my watchlist
  so that I can receive info about the stocks

  Scenario: Add a stock
    Given that I have no items in my watchlist
    When I add a new stock in my watchlist
    Then there will be a stock in my watchlist

  Scenario: Add multiple stocks
    Given that I have no items in my watchlist
    When I add two stocks in my watchlist
    Then my watchlist should contain two items

  Scenario: Add duplicate stocks
    Given that I have "AAPL" in my watchlist
    When I try to add "AAPL" again
    Then my watchlist should only contain one "AAPL"

  Scenario: Add an invalid symbol
    Given that I my watchlist is empty
    When I try to add "aa22"
    Then I should get a warning that the stock symbol is invalid
  
  Scenario: Limit to 25
    Given that I try to add 30 stocks to my watchlist
    Then I should receive a message
    And the message will say that I can add a max of 25 stocks
