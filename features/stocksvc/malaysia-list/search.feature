# stocksvc/malaysia-list/search.feature
Feature: Sort Stock List

  Part of the 'Malaysia Stock List' Epic

    As a user, 
    I want to filter the list by searching,
    so that I can view results that matches my search keyword

  Scenario: User search a keyword
    Given that the user search for "AAPL"
    Then the list will display company "Apple" with symbol "AAPL"

  Scenario: User search multiple keyword separated by commas
    Given that the user search for "AAPL, MSFT"
    Then the list will display the results for "AAPL" and "MSFT"

  Scenario: No search result
    Given that the user search for unknown keyword
    When the search result is returned
    Then it will display placeholder text