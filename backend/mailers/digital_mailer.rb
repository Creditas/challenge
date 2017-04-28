class DigitalMailer < BaseMailer
  def format_body
    # Here we could format the body using the data from the order, order_item (and
    # derived) attributes.
    # For prototyping purposes, we will only return a string with the class name.
    p c = "DigitalMailer"
    c
  end
end
