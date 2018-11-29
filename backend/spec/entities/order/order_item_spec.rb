RSpec.describe OrderItem do
  describe "#initialize" do
    context "when creating a new instance" do
      it "order must be filled" do
        order_item = OrderItem.new(order: order, product: product, quantity: 1)

        expect(order_item.order).to be_truthy
      end
      it "product must be filled" do
        order_item = OrderItem.new(order: order, product: product, quantity: 1)

        expect(order_item.product).to be_truthy
      end
      it "quantity must be filled" do
        order_item = OrderItem.new(order: order, product: product, quantity: 1)

        expect(order_item.quantity).to be_truthy
      end
    end
  end
  describe "#total" do
    context "when quantity equals 0" do
      it "total must be 0" do
        order_item = OrderItem.new(order: order, product: product, quantity: 0)

        expect(order_item.total).to eq 0
      end
    end
    context "when quantity greater than 0" do
      it "total must be price times quantity" do
        order_item = OrderItem.new(order: order, product: product, quantity: 5)

        expect(order_item.total).to eq 25
      end
    end
  end
end

def customer
  Customer.new(Address.new(zipcode: '45678-979'), Address.new(zipcode: '45678-979'), 'customer@email.com')
end

def order
  Order.new(customer)
end

def product
  Product.new(name: 'some product', type: :membership, price: 5.00)
end