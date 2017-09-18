require_relative '../ValueObjects/Address.rb'
require_relative '../ValueObjects/OrderItem.rb'
require_relative '../Entities/Payment'
require_relative '../Services/ShippingLabel.rb'


class PhysicalProductOrder < Order
    attr_reader :address, :shipping_label
    
    def initialize(customer, overrides = {})
        super(customer)
        @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }        
        @shipping_label = ShippingLabel.new("Obrigado por ter comprado nas lojas do Leleo \n")
    end

    def post_payment
        if @items.first.product.type == :book
          @shipping_label.add_message("Você comprou um item isento de impostos, conforme disposto na Constituição Art. 150, VI, d.")
          @shipping_label.print_label
        end
    end       
end