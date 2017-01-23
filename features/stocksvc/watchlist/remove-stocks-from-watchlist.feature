Feature: Remove stocks from Watchlist

  As a user of Stock.js
  I want to remove stocks from my watchlist
  so that I can unsubscribe from stocks that are not of my interest

  Scenario: Remove a stock
    Given that I have one stock in my watchlist
    When I remove the stock
    Then my list should be empty

  Scenario: Remove multiple stocks
    Given that I have two stocks in my watchlist
    When I remove both of them
    Then my list should be empty

  Scenario: Remove all
    Given that I have ten stocks in my watchlist
    When I select remove all
    Then my watchlist should be empty

