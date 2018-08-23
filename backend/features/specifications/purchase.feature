Feature: Payment

  Background:
    Given that there is a customer called "Kevin"
    And he wants to place an order

  Scenario: Customer buys a book
    Given that he ordered a physical book with the price of 29.99
    When the order is paid with a credit card
    Then it generates an invoice with the order information 
    And it generates a shipping label with the customer address and a tax free notification

  Scenario: Customer buys a physical item
    Given that he ordered a physical "toaster" with the price of 29.99
    When the order is paid with a credit card
    Then it generates an invoice with the order information 
    And it generates a shipping label with the customer address

  Scenario: Customer buys a digital media item
    Given that he ordered a digital "song" with the price of 0.99
    When the order is paid with a credit card
    Then it generates an invoice with the order information 
    And it doesn't generate a shipping label
    And it sends to the user an e-mail notification with the order information
    And it gives a discount voucher of 10 to the user to use in a new purchase

  Scenario: Customer buys a subscription service
    Given that he ordered a monthly subscription with the price of 99.99 
    When the order is paid with a credit card
    Then it generates an invoice with the order information 
    And it doesn't generate a shipping label
    And it activates the membership
    And it sends to the user an e-mail notification with the order information

  Scenario: Customer buys a book and a digital media item
    Given that he ordered a physical book with the price of 19.99
    And that he ordered a digital "song" with the price of 0.99
    When the order is paid with a credit card
    Then it generates an invoice with the order information 
    And it generates a shipping label with the customer address and a tax free notification
    And it sends to the user an e-mail notification with the order information
    And it gives a discount voucher of 10 to the user to use in a new purchase

  Scenario: Customer buys a book and a physical item
    Given that he ordered a physical "toaster" with the price of 29.99
    And that he ordered a physical book with the price of 19.99
    When the order is paid with a credit card
    Then it generates an invoice with the order information 
    And it generates two shipping labels, one only with the address and the other also with the tax free notification

  Scenario: Customer buys all kinds os product
    Given that he ordered a physical "toaster" with the price of 29.99
    And that he ordered a physical book with the price of 19.99
    And that he ordered a digital "song" with the price of 0.99
    And that he ordered a monthly subscription with the price of 99.99 
    When the order is paid with a credit card
    Then it generates an invoice with the order information 
    And it generates two shipping labels, one only with the address and the other also with the tax free notification
