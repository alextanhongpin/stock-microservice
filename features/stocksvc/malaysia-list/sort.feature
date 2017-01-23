# stocksvc/malaysia-list/sort.feature
Feature: Sort Stock List

  Part of the 'Malaysia Stock List' Epic

    As a user, 
    I want to sort the list by params,
    so that I can view them in ascending/descending order by params.

  Scenario: User sort params ascending
    Given that the user sort a column by ascending order
    Then the list will display the items by ascending order

  Scenario: User sort params descending
    Given that the user sort a column by descending order
    Then the list will display the items by descending order


  
