require_relative 'null_next_command'

module Domain
  module Commands
    class SendEmailCommand
      def initialize(to, from, subject, message, overrides = {})
        @to = to
        @from = from
        @subject = subject
        @message = message
        @mailer = overrides.fetch(:mailer) { ::Infrastructure::Mailer.new }
        @next_command = overrides.fetch(:next_command) { NullNextCommand.new }
      end
      
      def execute
        send_email
        @next_command.execute
      end
      
      private

      def send_email
        @mailer.send(@to, @from, @subject, @message)
      end
    end
  end
end
