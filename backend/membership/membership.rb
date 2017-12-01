require_relative '../infra/topic'
require_relative '../infra/pub_sub'
require_relative '../communication/communication_request'

class Membership

  def initialize(customer, product)
    @customer = customer
    @product = product
    activate_membership
  end

  def activate_membership
    puts "Ativando assinatura de #{@customer} no/a #{@product}"
    content = "Voce acaba de receber uma assinatura de #{@product}!"
    PubSub.instance.publish(Topics::MEMBERSHIP_ACTIVATED, CommunicationRequest.new(@customer, content))
  end

end