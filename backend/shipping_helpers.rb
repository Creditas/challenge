module ShippingHelpers

  def self.generate_shipping_label(object, disclaimer = nil)
    params = {}
    params[:disclaimer] = disclaimer if disclaimer
    @shipment = ShippingHelpers.shipping_label_create(params)
    return "Shipping Label for #{object.name} was succesfully created" if @shipment
    "There was an error generating the shipping label for #{object.name} and it was not shipped"
  end

  def self.shipping_label_create(params)
    # ~ CRAZY THINGS HAPPEN HERE ~
    true # for now, it's always true
  end

  def self.send_email(customer, voucher = 0)
    # ~ CRAZY THINGS HAPPEN HERE ~
    # add voucher code to email if voucher > 0
    return true if email_success?
    false
  end

  def self.email_success?
    true #this method would evaluate if the proccess of sending the email was succesful
  end

  def self.activate_membership(product, customer)
    # ~ CRAZY THINGS HAPPEN HERE ~
    return true if membership_success? #evaluates if assigning a membership/sending
    false
  end

  def self.membership_success?
    true # for now, it's always true
  end

  def


end
