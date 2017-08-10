Feature: Payment stream
  Describe the payment stream

  Scenario: Physical item

    If the payment is for a physical item, you must generate one shipping label for
    it to be placed in the shipping box;

    Given the payment is for a physical item
    When the payment is done
    Then we must generate one shipping label to the shipping box

  Scenario: Service subscription

    If payment is a service subscription, you must activate the subscription, and
    notify the user via email about this;
    
    Given the payment is for a service subscription
    When the payment (for service) is done
    Then we must activate the subscription
    And notify the user via email
