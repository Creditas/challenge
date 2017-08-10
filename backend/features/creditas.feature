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

  Scenario: Ordinary book

    If the payment is an ordinary book, you must generate it shipping label with a
    notification that it is a tax-exempt item as provided in the Constitution
    Art. 150, VI, d.
    
    Given the payment is for ordinary book
    When the payment (for book) is done
    Then we must generate the shipping label with a notification
    
  Scenario: Digital media

    If payment of any digital media (music, video), in addition to sending the
    description of the purchase by email to the buyer, grant a discount voucher of
    $ 10 to the buyer associated with the payment.
    
    Given the payment is for any "digital" media
    Then we need to send the description of purchase by email to buyer
    And grant a discount voucher of $10 to the buyer
    
