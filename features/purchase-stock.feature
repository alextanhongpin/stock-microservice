Feature: Stock Watchlist

  As a user of Stock.js
  I want to add stock to my purchase list
  So that I can compare the price.

  Scenario: Purchase List is empty
    Given that I have no items in my purchase list
    Then it should return empty results

  Scenario: Add entry to purchase list
    Given that I purchase "100" units of "AAPL" stock
    And each unit cost "500"
    When I view my purchase list
    Then it should have "100" units of "AAPL" stock
    And the total should be "500000"

  Scenario: Remove entry from purchase list
    Given that I only have "AAPL" in my purchase list
    When I view my purchase list
    Then I should have no items in it

  Scenario: Add stocks to purchase list
    Given that I purchase another additional "100" units of "AAPL" stocks
    And the price now is "600"
    When I view my purchase list
    Then I will see <symbol> with unit <unit> and price <price>:
      | symbol | unit | price | status |
      | AAPL | 100 | 500 | BUY |
      | AAPL | 100 | 600 | BUY |