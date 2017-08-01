Dir[File.expand_path "app/model/**/*.rb"].each{|f| require_relative(f)}

describe Label do

  subject(:label) { Class.new { extend Label } }
  subject(:customer) { Customer.new(name:'Sugamele', email:'foo@bar') }

  context 'generate_for' do

    it 'When we need to add a label in the user box' do
      shipping_label = label.generate_label_for customer
      expect(shipping_label).to eq('Label generated for Sugamele, put it in the shipping box')
    end

  end

  context 'add_notification' do

    it 'When we need to send a notification' do
      label.add_label_notification 'Adding any notification'
      shipping_label = label.generate_label_for customer
      expect(shipping_label).to eq("Label generated for Sugamele, put it in the shipping box\nAdding any notification")
    end

  end
end