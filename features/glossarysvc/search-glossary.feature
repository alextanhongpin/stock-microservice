# glossary/search-glossary.feature
Feature: Search Glossary

  Part of the 'Glossary' Epic

    As a user, 
    I want to search glossary,
    so that I can understand the terms.

  Scenario: Glossary exist
    Given that the user search a glossary
    When there are matching results
    Then the results will be displayed

  Scenario: Glossary does not exist
    Given that the user search a glossary
    And there are no results
    Then suggestion results will be shown
    And user can choose to add the glossary
