Feature: Transaction page
  Scenario: should show title, summary, and details
    Given I'm on page "/tx/1465651642158264047"
    Then I should see "Transaction 1465651642158264047" in "h1" html element
    And I should see "Home Transaction" in "breadcrumb" element
    And I should see table "summary" containing:
      | Sender        | 1085993630748340485L      |
      | Recipient     | 15323650579610211509Z     |
      | Confirmations | /\d+/                     |
      | Amount        | 100,000,000 ONZ           |
      | Fee           | 0 ONZ                     |
      | Timestamp     | /2016\/05\/24 \d\d:00:00/ |
      | Block         | 6524861224470851795       |
    And I should see table "details" containing:
      | Transaction ID      | Date                      | Sender               | Recipient             | Amount          | Fee   | Confirmations |
      |---------------------|---------------------------|----------------------|-----------------------|-----------------|-------|---------------|
      | 1465651642158264047 | /2016\/05\/24 \d\d:00:00/ | 1085993630748340485L | 15323650579610211509Z | 100,000,000 ONZ | 0 ONZ | Confirmed     |
