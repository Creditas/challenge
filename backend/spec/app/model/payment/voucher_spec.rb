Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Voucher do

  context 'voucher_with' do
    let(:dummy_voucher) { Class.new { extend Voucher } }

    it 'with 10% off' do
      customer = Customer.new(name: 'Marco', email:'foo@bar.com.br')
      expect(dummy_voucher.voucher_to(customer: customer, discount: 10)).to eq("Marco your voucher is  1234567890 with 10% OFF")
    end

  end
end