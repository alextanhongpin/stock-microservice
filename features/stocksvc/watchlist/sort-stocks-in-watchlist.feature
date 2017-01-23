Feature: Sort stocks in watchlist

  As a user of Stock.js
  I want to sort my stocks in my watchlist
  so that I can see them in the order priority

  Scenario: Sort by params
    Given that I am at my watchlist
    When I choose the params<sort-params> with description <sort-description>
      | sort-params | sort-description |
      | a-z | sort alphabetically asc |
      | z-a | sort alphabetically desc|
      | high | sort by current high | 
      | low | sort by current low |
      | +price | sort by current price asc |
      | -price | sort by current price desc |
      | +percentage gain | sort by percentage gain asc |
      | -percentage gain | sort by percentage gain desc |
    Then it should be sorted accordingly

