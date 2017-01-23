Feature: Update watchlist

  As a user of Stock.js
  I want to update my watchlist
  so that my watchlist will be up to date

  Scenario: Rename watchlist
    Given that my stocklist comes with the default naming "My list"
    When I change the stocklist to "My list 2"
    Then my stocklist name should be "My list 2"
