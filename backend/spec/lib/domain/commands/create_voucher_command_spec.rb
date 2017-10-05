describe ::Domain::Commands::CreateVoucherCommand do
  context 'when you want to create a voucher' do
    it 'creates voucher for customer' do
      customer = spy('customer')
      discount_value = 10
      voucher_class = spy('voucher_class')

      subject = described_class.new(customer, discount_value, voucher_class: voucher_class)

      subject.execute

      expect(voucher_class).to have_received(:new).with(discount_value: discount_value)
      expect(customer).to have_received(:add_voucher)
    end
  end
end
