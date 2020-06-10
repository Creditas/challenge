class Customer
  attr_reader :name, :address, :celphone,:email_address
  attr_accessor :signature

  def initialize(attributes = {})
    @name = attributes.values_at(:name)
    @address = attributes.values_at(:address)
    @celphone = attributes.values_at(:celphone)
    @email_address = attributes.values_at(:email_address)
    @signature = attributes.values_at(:signature)
  end

end