class Customer
  attr_reader :name, :email

  def initialize(args = {})
    @name = args.fetch(:name) {"foolano"}
    @email = args.fetch(:email) {"test@test.com"}
  end
end
