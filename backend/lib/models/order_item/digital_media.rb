require_relative '../order_item/item'

DEFAULT_VOUCHER_VALUE = 10.0

module OrderItem
  class DigitalMedia <  Item
    def process
      add_digital_media_to_customer
      generate_new_voucher
      send_email_notification
      super
    end

    private

    def customer
      order.customer
    end

    def payment
      order.payment
    end

    def add_digital_media_to_customer
      customer.add_digital_media(product)
    end

    def generate_new_voucher
      @voucher = Voucher.new(value: DEFAULT_VOUCHER_VALUE, payment: payment)
      customer.add_voucher(@voucher)
    end

    def notification_body
      <<~HEREDOC
        A compra do producto #{product.name} foi realizada com sucesso.
        Para usufruir, acesse Sua Conta > Conteudo Digital.

        Voce ganhou um voucher no valor de #{@voucher.value}!
        Codigo do voucher: #{@voucher.code}
      HEREDOC
    end

    def send_email_notification
      notification = EmailNotification.new(
        customer: customer,
        subject: "Compra de #{product.name} realizada com sucesso",
        body: notification_body
      )
      notification.send
    end
  end
end
