class CustomerRepository
	def initialize
		@customers = []
	end

  def get_by(customer_id)
    @customers.select{ |customer| customer.id == customer_id }.first
  end

  def add(customer)
  	@customers << customer
  end
end