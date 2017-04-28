class MembershipMailer < BaseMailer
  def format_body
    # Here we could format the body using the data from the payment attribute.
    # For prototyping purposes, we will only return a string with the class name.
    p c = "MembershipMailer"
    c
  end
end
