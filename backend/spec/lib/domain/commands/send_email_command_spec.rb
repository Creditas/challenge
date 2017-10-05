describe ::Domain::Commands::SendEmailCommand do
  context 'when you want to send an email' do
    it 'sends email' do
      to = double('to')
      from = double('from')
      subject = double('subject')
      message = double('message')
      mailer = double('mailer')

      allow(mailer).to receive(:send).with(to, from, subject, message)

      subject = described_class.new(to, from, subject, message, mailer: mailer)

      subject.execute

      expect(mailer).to have_received(:send)
    end
  end
end
