require_relative '../../../delivery/shipping/shipping_label'

describe ShippingLabel do
  
  it 'should return tax free label when asked for tax free' do
    shipping_label = ShippingLabel.new(true)
    expect(shipping_label.info).to eq('Conforme disposto na Constituição Art. 150, VI, d, esse item é isento de impostos')
  end

  it 'should return no tax free label when asked for non tax free' do
    shipping_label = ShippingLabel.new
    expect(shipping_label.info).to eq('Shipping Label de itens não isentos de impostos')
  end

end
