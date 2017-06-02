class Email
  attr_reader :from, :to, :subject, :message

  def initialize(from:, to:, subject:, message:)
    @from = from
    @to = to
    @subject = subject
    @message = message
  end
end

class EmailFactory
  FROM = 'Sender Name <sender.email@provider.com>'

  def create(name:, email:, template:, variables: {})
    Email.new(
        from: FROM,
        to: "#{name} <#{email}>",
        subject: subject(template, variables),
        message: render_message(template, variables)
    )
  end

  private

  def subject(template, variables)
    # Fetches the given template and resolves the
    # subject text

    'subject: ' + template.to_s
  end

  def render_message(template, variables)
    # Fetches the given template and renders its HTML
    # with interpolating the given variables

    'message: ' + template.to_s
  end
end

class EmailProvider
  def send(email)
    # Dispatch email
  end
end

class NotificationService
  attr_reader :email_factory, :email_provider

  def initialize(email_factory:, email_provider:)
    @email_factory = email_factory
    @email_provider = email_provider
  end

  def notify(notification_type:, name:, email:, variables: {})
    email = @email_factory.create(
      name: name,
      email: email,
      template: notification_type,
      variables: variables
    )

    @email_provider.send(email)
  end
end