Feature: Delete Watchlist

  Part of the "Watchlist" Epic

    As a user,
    I want to delete my watchlist
    so that I can remove it

  Scenario: Remove a watchlist
    Given that I have two watchlist
    When I remove the first watchlist
    Then I should have one watchlist remaining

  Scenario: Remove all watchlist
    Given that I have two watchlist
    When I remove all watchlist
    Then my watchlist should be empty