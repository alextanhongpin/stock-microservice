Feature: Multiple Stock Watchlist

  As a user of Stock.js
  I want to create multiple watchlist
  so that I can manage my portfolio

  Scenario: Default list
    Given that I visit my page
    Then I shall see a default list
    And the list title should be "My List"

  Scenario: Create new list
    Given that I create a new list
    Then I can add a name to the list
    And I can add new stocks to the list

  Scenario: Swap list
    Given that I have multiple watchlist
    When I swap from "List A" to "List B"
    Then I shall see the stocks from "List B" 
