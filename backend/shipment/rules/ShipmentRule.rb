class ShipmentRule
    def handle(customer, product)
        raise 'You\'re trying to use an generic rule. Please, use the rule specified for the product type that you are trying to handle.'
    end
end