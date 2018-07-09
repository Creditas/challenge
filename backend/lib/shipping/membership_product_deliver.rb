require_relative 'deliver.rb'
require_relative 'notificable.rb'
require_relative '../desafio_backend.rb'

class MembershipProductDeliver < Deliver
  include  Notificable

  def process
    Membership.new(email: @customer.email, enabled: true)
    self.notification
  end

  def notification
    notification1 = super
    return notification1 + " Your membership is activated"
  end
end
