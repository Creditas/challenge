describe ::Domain::Commands::AddMembershipCommand do
  context 'when you want to add a membership' do
    it 'add a membership to the customer' do
      customer = spy('customer')
      name = 'teste'
      membership_class = spy('membership')

      subject = described_class.new(customer, name, membership_class: membership_class)

      subject.execute

      expect(customer).to have_received(:add_membership)
      expect(membership_class).to have_received(:new).with(name, true)
    end
  end
end
