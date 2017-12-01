require_relative '../infra/topic'
require_relative '../infra/pub_sub'
require_relative '../communication/communication_request'

class DigitalMediaDelivery

  def notify(event)
    product = event.description
    customer = event.customer
    puts "O usuario #{customer} acaba de comprar uma midia digital de #{product}"
    content = "Voce acaba de adquirir uma midia digital com nome de '#{product}'!"
    PubSub.instance.publish(Topics::DIGITAL_MEDIA_ACQUIRED, CommunicationRequest.new(customer, content))
  end

end