require 'rspec'
require_relative '../src/domain/carrier'
require_relative '../src/domain/order'
require_relative '../src/domain/product'
require_relative '../src/domain/customer'
require_relative '../src/infrastructure/printer_service'
require_relative '../src/infrastructure/email_provider'
require_relative '../src/infrastructure/voucher_repository'
require_relative '../src/infrastructure/membership_repository'

describe BookCarrier, '#dispatch' do

  let(:book) {Product.new(1, 'Clojure for the brave and true', :book, 20.00)}
  let(:customer) {Customer.new('foolano', 'foolano@github.io')}
  let(:order) {Order.new(customer, Address.new(customer, '11730-000'))}
  let(:printer) {PrinterService.new}
  let(:book_carrier) {BookCarrier.new(printer)}

  it 'does print a shipping label' do
    expect(printer).to receive(:print_label).once
    book_carrier.dispatch(OrderItem.new(order, book, 1))
  end
end

describe PhysicalCarrier, '#dispatch' do

  let(:physical) {Product.new(3, 'Otamatone from Maywa Denki', :physical, 23.99)}
  let(:customer) {Customer.new('foolano', 'foolano@github.io')}
  let(:order) {Order.new(customer, Address.new(customer, '11730-000'))}
  let(:printer) {PrinterService.new}
  let(:physical_carrier) {PhysicalCarrier.new(printer)}

  it 'does print a shipping label' do
    expect(printer).to receive(:print_label).once
    physical_carrier.dispatch(OrderItem.new(order, physical, 1))
  end
end


describe DigitalCarrier, '#dispatch' do

  let(:digital) {Product.new(4, 'Deep Learning Nanodegree', :digital_media, 1.99)}
  let(:customer) {Customer.new('foolano', 'foolano@github.io')}
  let(:order) {Order.new(customer, Address.new(customer, '11730-000'))}
  let(:email_service) {EmailProvider.new}
  let(:vouchers) {VoucherRepository.new}
  let(:digital_carrier) {DigitalCarrier.new(email_service, vouchers)}

  it 'does print a shipping label' do
    expect(email_service).to receive(:send).once
    digital_carrier.dispatch(OrderItem.new(order, digital, 1))
  end

  it 'saves a voucher' do
    expect(vouchers).to receive(:save).once
    digital_carrier.dispatch(OrderItem.new(order, digital, 1))
  end

end


describe SubscriptionCarrier, '#dispatch' do

  let(:physical) {Product.new(3, 'Otamatone from Maywa Denki', :physical, 23.99)}
  let(:digital) {Product.new(4, 'Deep Learning Nanodegree', :digital_media, 1.99)}
  let(:subscription) {Product.new(5, 'Musicfy', :subscription, 3.99)}
  let(:customer) {Customer.new('foolano', 'foolano@github.io')}
  let(:order) {Order.new(customer, Address.new(customer, '11730-000'))}
  let(:email_service) {EmailProvider.new}
  let(:memberships) {MembershipRepository.new}
  let(:subscription_carrier) {SubscriptionCarrier.new(email_service, memberships)}

  it 'does print a shipping label' do
    expect(email_service).to receive(:send).once
    subscription_carrier.dispatch(OrderItem.new(order, digital, 1))
  end

  it 'saves a membership' do
    expect(memberships).to receive(:save).once
    subscription_carrier.dispatch(OrderItem.new(order, digital, 1))
  end

end