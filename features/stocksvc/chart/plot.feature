# stocksvc/chart/plot.feature

Feature: Plot chart feature

  Part of the 'Chart' Epic

    As a user,
    I want to plot lines on my chart
    so that I can carry out techical analysis


  Scenario: Draw a horizontal line
    Given that I choose the "Horizontal Line" tool
    When I click on the chart
    Then it shall create a new "Horizontal Line"
    And I can reposition it

  Scenario: Draw a vertical line
    Given that I choose the "Vertical Line" tool
    When I click on the chart
    Then it shall create a new "Vertical Line"
    And I can reposition it

  Scenario: Draw a pattern
    Given that I choose the "Pattern" tool
    When I click on the chart
    Then it shall create a new "Pattern" overlay
    And I can reposition it