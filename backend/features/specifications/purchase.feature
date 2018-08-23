Feature: Payment

  Background:
    Given that there is a customer called "Kevin"

  Scenario: Customer buys a book
    Given that he ordered a "book" with the price of 29.99
    When the order is paid with a credit card
    Then it should generate an invoice with the order information 
    And it should generate a shipping label with the customer address and a tax free notification

  Scenario: Customer buys a physical item
    Given that he ordered a "toaster" with the price of 29.99
    When the order is paid with a credit card
    Then it should generate an invoice with the order information 
    And it should generate a shipping label with the customer address

#   Scenario: Customer buys a subscription service
#     Given that he bought a monthly subscription which costs 99.99 
#     When the order is paid
#     Then it should generate an invoice
#     And it should activate a membership
#     And it should send an email notification to the user

#   Scenario: Customer buys a digital media item
#     Given that he bought a music which costs 0.99 
#     When the order is paid
#     Then it should generate an invoice
#     And it should activate a membership
#     And it should send an email notification to the user
