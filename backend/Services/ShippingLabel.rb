class ShippingLabel
    attr_reader :message

    def initialize(message)
        @message = message        
    end

    def add_message(message)
        @message += message
    end

    def print_label
        #método para impressão da etiquieta
    end
end