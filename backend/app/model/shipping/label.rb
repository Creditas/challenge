class Label
  attr_reader :notification_list

  def initialize
    @notification_list = []
  end

  def generate_for customer
      message = "Label generated for #{customer.name}, put it in the shipping box"
      @notification_list.each{ |notification| message += notification }
      message
  end

  def add_notification notification
    @notification_list << "\n#{notification}"
  end

end