# glossary/view-glossary.feature
Feature: Preview Glossary

  Part of the 'Glossary' Epic

    As a user, 
    I want to preview glossary immediately without going to another page,
    so that I can understand each terms without excessive navigation.

  Scenario: User hover a glossary
    Given that the user hover a glossary
    Then it should show a "question mark" cursor
    And when the user clicks on it
    Then it should show a preview

  Scenario: User view full details
    Given that the preview window is open
    When the user select full details
    Then the user will go to the glossary detail page
