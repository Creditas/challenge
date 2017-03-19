class MembershipInvoice < Invoice
  def process
    activate_membership
    email_customer
  end

  private

  def activate_membership
    @membership ||= Membership.new(customer)
  end

  def email_customer
    email = Email.new(customer)

    email.send_membership_activated(@membership)
  end
end
