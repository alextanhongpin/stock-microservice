Feature: Remove from Subscription

  Part of the "Real-Time" Epic

    As a user
    I want to remove a stock from my subscription list 
    So that I can remove stocks that I am not interested in

  Scenario: Subscription contains a stock
    Given that I have a stock in my subscription list
    When I remove it
    Then my list should be empty

  Scenario: Subscription contains two stocks
    Given that I have two stocks in my list
    When I remove a stock
    Then I should have one stock left in my list