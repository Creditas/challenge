describe ::Domain::Factories::OrderItemFlowFactory do
  context 'when you want the proper order item flow based on product type' do
    it 'gets the book flow then the product is a book' do
      product = double('product', type: 'book')

      subject = described_class.new(product)

      expect(subject.get_order_item_flow).to eq(::Operations::Book::CreateBookOrderItemFlow)
    end

    it 'gets the digital flow then the product is digital' do
      product = double('product', type: 'digital')

      subject = described_class.new(product)

      expect(subject.get_order_item_flow).to eq(::Operations::Digital::CreateDigitalOrderItemFlow)
    end

    it 'gets the membership flow then the product is a membership' do
      product = double('product', type: 'membership')

      subject = described_class.new(product)

      expect(subject.get_order_item_flow).to eq(::Operations::Membership::CreateMembershipOrderItemFlow)
    end

    it 'gets the physical flow then the product is physical' do
      product = double('product', type: 'physical')

      subject = described_class.new(product)

      expect(subject.get_order_item_flow).to eq(::Operations::Physical::CreatePhysicalOrderItemFlow)
    end
  end
end
