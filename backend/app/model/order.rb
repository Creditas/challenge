load 'app/service/emailservice.rb'
load 'app/service/printerservice.rb'

class Order
  attr_reader :customer, :items, :payment, :address, :closed_at, :shipping

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
    shipping = overrides.values_at(:shipping)
  end

  def shipping=(shipping)
    @shipping = shipping
  end

  def shipping
    @shipping
  end

  def payment=(payment)
    @payment = payment
  end

  def payment
    @payment
  end

  def add_product(product, item_type)
    @items << @order_item_class.new(order=self, product=product, item_type=item_type, shipping_label=nil)
  end

  def add_item(order_item)
    @items << order_item
  end

  def total_amount
    total = 0.0

    @items.each { |item|
      total += item.product.value - item.voucher
    }
    total
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at

    handling_items

    shipping.process
  end

  def handling_items
      @items.each { |item|  
        case item.item_type
        when :service
          email_service = EmailService.new(email = @customer.email, message = "Assinatura ativada.")
          email_service.send

          activate_service(item.product)

        when :book
          item.shipping_label="Item isento de impostos conforme Art. 150, VI, d."
          
          printer = PrinterService.new(item)
          printer.print

        when :digital_media
          email_service = EmailService.new(email = @customer.email, message = "Produto adquirido: #{item.product.name}")
          email_service.send

        when :item 
          item.shipping_label="Ipsum Lorem Label"
          
          printer = PrinterService.new(item)
          printer.print
        end
      }
  end

  def activate_service(product)
    puts "Serviço ativado: #{product.name}"
  end 

  private :handling_items, :activate_service
    
end