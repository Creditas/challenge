describe ::Domain::Commands::CreateShippingLabelCommand do
  context 'when you want to create a shipping label' do
    it 'creates shipping label into order_item' do
      order_item = spy('order_item')
      message = 'Test Message'
      shipping_label_class = spy('shipping_label_class')

      subject = described_class.new(order_item, message, shipping_label_class: shipping_label_class)

      subject.execute

      expect(shipping_label_class).to have_received(:new).with(message: message)
      expect(order_item.shipping_label).to exist
    end
  end
end
