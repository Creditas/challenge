class Voucher
    
    def initialize(customer, discount_value)
        @customer = customer
        @discount_value = discount_value
    end

    def to_s
        "Utilize o cupom " + generate_voucher_code + " para obter $ " + @discount_value.to_s + " de desconto."
    end

    def generate_voucher_code
        @discount_value.to_s + "OFF"
    end
end