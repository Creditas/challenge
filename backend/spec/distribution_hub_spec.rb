require 'rspec'
require_relative '../src/domain/distribution_hub'
require_relative '../src/domain/carrier'
require_relative '../src/domain/product'
require_relative '../src/domain/customer'
require_relative '../src/domain/order'
require_relative '../src/domain/payment_method'
require_relative '../src/infrastructure/printer_service'
require_relative '../src/infrastructure/email_provider'
require_relative '../src/infrastructure/membership_repository'
require_relative '../src/infrastructure/voucher_repository'

describe DistributionHub, '#expedite' do

  let(:email_service) {EmailProvider.new}
  let(:printer) {PrinterService.new}
  let(:memberships) {MembershipRepository.new}
  let(:vouchers) {VoucherRepository.new}
  let(:book) {Product.new(1, 'Clojure for the brave and true', :book, 20.00)}
  let(:book2) {Product.new(2, 'Mastering concurrence in Go', :book, 23.99)}
  let(:physical) {Product.new(3, 'Otamatone from Maywa Denki', :physical, 23.99)}
  let(:digital) {Product.new(4, 'Deep Learning Nanodegree', :digital_media, 1.99)}
  let(:subscription) {Product.new(5, 'Musicfy', :subscription, 3.99)}
  let(:customer) {Customer.new('foolano', 'foolano@github.io')}
  let(:book_carrier) {BookCarrier.new(printer)}
  let(:physical_carrier) {PhysicalCarrier.new(printer)}
  let(:digital_media_carrier) {DigitalCarrier.new(email_service, vouchers)}
  let(:subscription_carrier) {SubscriptionCarrier.new(email_service, memberships)}
  let(:dispatch) {DistributionHub.new}

  before do
    dispatch.add_strategy(:book, book_carrier)
    dispatch.add_strategy(:physical, physical_carrier)
    dispatch.add_strategy(:digital_media, digital_media_carrier)
    dispatch.add_strategy(:subscription, subscription_carrier)
  end

  context 'with 2 different books products' do
    it 'does expedite to through book carrier twice' do
      order = Order.new(customer, Address.new(customer, '11730-000'))
      order.add_product(book)
      order.add_product(book2)
      expect(book_carrier).to receive(:dispatch).twice
      dispatch.expedite(order)

    end
  end

  context 'with 2 identical books products' do
    it 'does expedite to through book carrier once' do
      order = Order.new(customer, Address.new(customer, '11730-000'))
      order.add_product(book)
      order.add_product(book)
      expect(book_carrier).to receive(:dispatch).once
      dispatch.expedite(order)
    end
  end

  context 'with 3 identical physical products' do
    it 'does expedite to through physical carrier once' do
      order = Order.new(customer, Address.new(customer, '11730-000'))
      order.add_product(physical)
      order.add_product(physical)
      order.add_product(physical)
      expect(physical_carrier).to receive(:dispatch).once
      dispatch.expedite(order)
    end
  end

  context 'with 1 digital media product' do
    it 'does expedite to through digital carrier once' do
      order = Order.new(customer, Address.new(customer, '11730-000'))
      order.add_product(digital)
      expect(digital_media_carrier).to receive(:dispatch).once
      dispatch.expedite(order)
    end
  end

  context 'with 1 subscription product' do
    it 'does expedite to through subscription carrier once' do
      order = Order.new(customer, Address.new(customer, '11730-000'))
      order.add_product(subscription)
      expect(subscription_carrier).to receive(:dispatch).once
      dispatch.expedite(order)
    end
  end
end