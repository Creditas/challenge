class Email

  attr_reader :address, :subject, :content
  def initialize(address, subject, content)
    @address = address
    @subject = subject
    @content = content
  end
end