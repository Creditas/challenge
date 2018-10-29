class Voucher
    attr_reader :discount_value
    
    def initialize(customer, discount_value)
        @customer = customer
        @discount_value = discount_value.to_s
    end

    def to_s
        "Utilize o cupom " + generate_voucher_code + " para obter $ " + @discount_value + " de desconto."
    end

    def generate_voucher_code
        @discount_value + "OFF"
    end
end