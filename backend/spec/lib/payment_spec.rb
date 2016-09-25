require 'spec_helper'

RSpec.describe Payment do
  let!(:customer) do
    Customer.new("Rafael", 'rafael@gmail.com')
  end

  let!(:order) do
    Order.new(customer)
  end

  describe '#pay' do
    context 'when product is a book' do
      let(:book) do
        Book.new("Awesome Book")
      end

      subject do
        described_class.new(
          {
            authorization_number: "1234",
            amount:               1,
            invoice:              double,
            order:                order,
            payment_method:       double
          }
        )
      end

      before do
        order.add_product(book)
      end

      it 'sets the shipping label for this product' do
        subject.pay
        expect(book.shipping_label).to eq(
          'Item Isento de impostos conforme disposto na Constituição Art. 150, VI, d.'
        )
      end

      it 'closes the order' do
        subject.pay
        expect(subject.paid?).to be_truthy
      end
    end

    context 'when product is a physical item' do
      let(:physical) do
        Physical.new("physical item")
      end

      subject do
        described_class.new(
          {
            authorization_number: "1234",
            amount:               1,
            invoice:              double,
            order:                order,
            payment_method:       double
          }
        )
      end

      before do
        order.add_product(physical)
      end

      it 'sets the shipping label for this product' do
        subject.pay
        expect(physical.shipping_label).to eq(
          'Deverá ser colocado na caixa de envio'
        )
      end

      it 'closes the order' do
        subject.pay
        expect(subject.paid?).to be_truthy
      end
    end

    context 'when product is a digital media' do
      let(:digital) do
        Digital.new("digital item")
      end

      subject do
        described_class.new(
          {
            authorization_number: "1234",
            amount:               1,
            invoice:              double,
            order:                order,
            payment_method:       double
          }
        )
      end

      before do
        order.add_product(digital)
      end

      it 'sends an email to customer' do
        expect(digital).to receive(:send_email_to).with(customer)
        subject.pay
      end

      it 'generates a discount voucher for the customer' do
        expect(digital).to receive(
          :generate_discount_voucher_for
        ).with(customer)

        subject.pay
      end

      it 'closes the order' do
        subject.pay
        expect(subject.paid?).to be_truthy
      end
    end

    context 'when product is a membership' do
      let(:membership) do
        Membership.new("membership")
      end

      subject do
        described_class.new(
          {
            authorization_number: "1234",
            amount:               1,
            invoice:              double,
            order:                order,
            payment_method:       double
          }
        )
      end

      before do
        order.add_product(membership)
      end

      it 'sends an email to customer' do
        expect(membership).to receive(:send_email_to).with(customer)
        subject.pay
      end

      it 'activates the signature for customer' do
        expect(membership).to receive(:signature_activate).with(customer)

        subject.pay
      end

      it 'closes the order' do
        subject.pay
        expect(subject.paid?).to be_truthy
      end
    end
  end
end