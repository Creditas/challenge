Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Email do

  context 'send_email' do
    let(:dummy_class) { Class.new { extend Email } }

    it 'When we need to send an email to the user' do
      email_response = dummy_class.send_email("sugamele.marco@gmail.com", "Test to Creditas")
      expected_response = "Send email to sugamele.marco@gmail.com with message: Test to Creditas"
      expect(email_response).to eq(expected_response)
    end

  end
end