class Membership
    attr_reader :customer, :is_activated

    # you can customize this class by yourself
    def initialize(customer)
      @customer = customer
      @subscription = false
    end

    def subscripted?
      !subscription.nil?
    end

    def subscription
      @subscription = true      
    end

  end