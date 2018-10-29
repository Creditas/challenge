class Voucher
    attr_reader :discount_value
    
    def initialize(customer, discount_value)
        @customer = customer
        @discount_value = discount_value.to_s
    end

    def to_s
        "You can use the coupon " + generate_voucher_code + " to get $ " + @discount_value + " off on your next purchase."        
    end

    def generate_voucher_code
        @discount_value + "OFF"
    end
end
