RSpec.describe Order do
  describe "#initialize" do
    context "when creating a new instance" do
      it "customer must be filled" do
        order = Order.new(customer)

        expect(order.customer).to be_truthy
      end
      it "items must be empty" do
        order = Order.new(customer)

        expect(order.items).to eq []
      end
      it "payment must be nil" do
        order = Order.new(customer)

        expect(order.payment).to be_falsey
      end
      it "closed_at must be nil" do
        order = Order.new(customer)

        expect(order.closed_at).to be_falsey
      end
    end
  end
  describe "#add_product" do
    context "when adding a new product" do
      it "must increment items length" do
        order = Order.new(customer)
        expected = order.items.length + 1;

        order.add_product(product, 5)

        expect(order.items.length).to eq expected
      end
    end
  end
  describe "#set_payment" do
    context "when closing the order" do
      it "payment must be filled" do
        order = Order.new(customer)

        order.set_payment(payment(order))

        expect(order.payment).to be_truthy
      end
      it "closed_at must be equal to paid_at" do
        order = Order.new(customer)
        payment = payment(order)

        order.set_payment(payment)

        expect(order.closed_at).to eq payment.paid_at
      end
    end
  end
  describe "#total_amount" do
    context "when the list is empty" do
      it "total_amount must be 0" do
        order = Order.new(customer)

        expect(order.total_amount).to eq 0
      end
    end
    context "when the list has items" do
      it "total_amount must be the sum of all items" do
        order = Order.new(customer)
        order.add_product(Product.new(name: 'first product', type: :membership, price: 1.00), 5)
        order.add_product(Product.new(name: 'second product', type: :membership, price: 10.00), 2)

        expect(order.total_amount).to eq 25
      end
    end
  end
end

def customer
  Customer.new(Address.new(zipcode: '45678-979'), Address.new(zipcode: '45678-979'), 'customer@email.com')
end

def payment(order)
  payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
  payment.pay
  payment
end

def product
  Product.new(name: 'some product', type: :membership, price: 5.00)
end