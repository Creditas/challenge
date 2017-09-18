class Voucher
    attr_reader :customer_name, :value

    def generate_voucher(customer_name, value)
        @customer_name = customer_name
        @value = value
    end
end