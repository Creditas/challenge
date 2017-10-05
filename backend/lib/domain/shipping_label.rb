module Domain
  class ShippingLabel
    attr_reader :message

    def initialize(message:)
      @message = message
    end
  end  
end
