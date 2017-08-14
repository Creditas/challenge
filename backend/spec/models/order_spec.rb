# frozen_string_literal: true

Dir["#{Dir.pwd}/models/*"].each { |file| require_relative file }

RSpec.describe Order do
  let(:customer) do
    Customer.new(name: 'Vinícius',
                 email: 'vinicius@teste.com',
                 address: Address.new('04119-061'))
  end

  let(:order) { Order.new(customer, Address.new(zipcode: '13566-640')) }

  let(:credit_card) { CreditCard.fetch_by_hashed('1234_5678_9876_5432') }

  let(:invoice) do
    Invoice.new(order: order,
                billing_address: order.address,
                shipping_address: order.shipping)
  end

  before(:each) do
    @product_book1 = Product.new('The Name of the Wind', :book, 34.90)
    @product_book2 = Product.new("Old Man's War", :book, 23.90)

    @product_membership1 = Product.new('Netflix', :membership, 22.90)
    @product_membership2 = Product.new('Xbox Live Gold', :membership, 129.90)

    @product_digital1 = Product.new('Imagine Dragons', :digital, 23.90)
    @product_digital2 = Product.new('The Temper Trap', :digital, 28.90)

    @product_physical1 = Product.new('Xbox One', :physical, 1179.00)
    @product_physical2 = Product.new('Playstation 4', :physical, 1364.90)
  end # end-before

  describe 'given an Order with a couple of itens' do
    it 'checks the order size' do
      order_item1 = OrderItem.new(order: order, product: @product_book1)

      order_item2 = OrderItem.new(order: order, product: @product_book2)

      order.add_item(order_item1)
      order.add_item(order_item2)

      expect(order.items.size).to eq 2
    end # end-it
  end # end-describe

  describe 'given an Order for a gamer' do
    it 'checks the order total' do
      order_item1 = OrderItem.new(order: order, product: @product_physical1)

      order_item2 = OrderItem.new(order: order, product: @product_membership2)

      order_item3 = OrderItem.new(order: order, product: @product_digital2)

      order.add_item(order_item1)
      order.add_item(order_item2)
      order.add_item(order_item3)

      expected_total = @product_physical1.value
      expected_total += @product_membership2.value
      expected_total += @product_digital2.value

      expect(order.total_amount.round(2)).to eq expected_total.round(2)
    end # end-it
  end # end-describe

  describe 'an Order with some digital itens' do
    it 'gets one voucher per order' do
      order_item1 = OrderItem.new(order: order, product: @product_digital1)

      order_item2 = OrderItem.new(order: order, product: @product_digital2)

      order.add_item order_item1
      order.add_item order_item2

      payment = Payment.new(order: order,
                            payment_method: credit_card,
                            invoice: invoice)

      payment.pay

      expect(customer.voucher.value).to eq 10.0
    end # end-it
  end # end-describe

  describe 'given an Order for a service subscription' do
    it 'checks if Customer has a membership' do
      order_item = OrderItem.new(order: order, product: @product_membership1)

      order.add_item(order_item)

      payment = Payment.new(order: order,
                            payment_method: credit_card,
                            invoice: invoice)

      payment.pay

      expect(customer.membership.since.to_i).to eq payment.paid_at.to_i
    end # end-it
  end # end-describe

  describe 'payment of an order' do
    it 'checks if it was paid' do
      order_item = OrderItem.new(order: order, product: @product_physical1)

      order.add_item(order_item)

      payment = Payment.new(order: order,
                            payment_method: credit_card,
                            invoice: invoice)

      payment.pay(Time.now)

      expect(payment.paid?).to be true
    end # end-it
  end # end-describe

  describe 'An order with a book' do
    it 'generates a shipping label with no taxes info' do
      order_item = OrderItem.new(order: order, product: @product_book2)

      order.add_item(order_item)

      payment = Payment.new(order: order,
                            payment_method: credit_card,
                            invoice: invoice)

      payment.pay(Time.now)

      no_taxes_label = 'Item isento de impostos conforme Art.150, VI, d.'

      expect(order.items[0].shipping_labels[0]).to eq no_taxes_label
    end # end-it
  end # end-describe

  describe 'An order with a physical item' do
    it 'generates a shipping label with taxes info' do
      order_item = OrderItem.new(order: order, product: @product_physical2)

      order.add_item(order_item)

      payment = Payment.new(order: order,
                            payment_method: credit_card,
                            invoice: invoice)

      payment.pay(Time.now)

      taxes_label = 'Item Físico - Não é isento de impostos'

      expect(order.items[0].shipping_labels[0]).to eq taxes_label
    end # end-it
  end # end-describe

  describe 'An order with a digital item' do
    it 'generates an email to Customer' do
      order_item = OrderItem.new(order: order, product: @product_digital2)

      order.add_item(order_item)

      payment = Payment.new(order: order,
                            payment_method: credit_card,
                            invoice: invoice)

      payment.pay(Time.now)

      email_msg = "Produto Digital adquirido: #{order.items[0].product.name}"

      expect(order.items[0].messages[0]).to eq email_msg
    end # end-it
  end # end-describe

  describe 'An order with a membership subscription item' do
    it 'generates an email to Customer' do
      order_item = OrderItem.new(order: order, product: @product_membership2)

      order.add_item(order_item)

      payment = Payment.new(order: order,
                            payment_method: credit_card,
                            invoice: invoice)

      payment.pay(Time.now)

      email_msg = "Assinatura de Serviço ativada: #{order.items[0].product.name}"

      expect(order.items[0].messages[0]).to eq email_msg
    end # end-it
  end # end-describe
end # end-RSpec.describe
