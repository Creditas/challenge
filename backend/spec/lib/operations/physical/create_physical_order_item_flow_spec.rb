describe ::Operations::Physical::CreatePhysicalOrderItemFlow do
  context 'when your order item is digital' do
    it 'executes physical flow' do
      order = double('order')
      order_item = double('order_item', product: { name: 'teste' })
      command = double('command')

      allow(command).to receive(:execute).and_return(true)

      subject = described_class.new(order, order_item, commands: command)

      expect(subject.execute).to be_truthy
    end
  end
end
