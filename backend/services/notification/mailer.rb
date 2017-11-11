module Notification
  class Mailer
    def initialize(recipient:, template:)
      @recipient = recipient
      @template = template
    end

    def deliver_later
      puts '> Mail ---------------------------'
      puts "To: #{@recipient}"
      puts "Template: #{@template}"
      puts '---------------------------'
    end
  end
end
