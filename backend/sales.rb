module Sales
  class Service
    attr_reader :checkout, :payment_service, :event_dispatcher

    def initialize(checkout:, payment_service:, event_dispatcher:)
      @checkout = checkout
      @payment_service = payment_service
      @event_dispatcher = event_dispatcher
    end

    def receive(order:, payment_method:)
      payment = @checkout.process(
          order: order,
          payment_method: payment_method
      )

      if @payment_service.fraud?(payment)
        raise 'Wow! Someone was cough cheating here!'
      end

      @event_dispatcher.dispatch(:order_received, {
          payment: payment
      })

      payment
    end
  end
end