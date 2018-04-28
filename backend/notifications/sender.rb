class Notifications::Sender

  def send(to, subject, template)
    fail NotImplementedError
  end
end
