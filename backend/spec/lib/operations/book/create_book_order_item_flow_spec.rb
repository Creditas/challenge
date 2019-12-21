describe ::Operations::Book::CreateBookOrderItemFlow do
  context 'when your order item is a book' do
    it 'executes book flow' do
      order = double('order')
      order_item = double('order_item', product: { name: 'teste' })
      command = double('command')

      allow(command).to receive(:execute).and_return(true)

      subject = described_class.new(order, order_item, commands: command)

      expect(subject.execute).to be_truthy
    end
  end
end
