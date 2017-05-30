class Membership < Product
  def active(customer)
    p "###### Membership activated for #{customer.email}"
  end
end

