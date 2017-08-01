module Label
  def generate_label_for customer
      @notification_list = initialize_notification_list
      message = "Label generated for #{customer.name}, put it in the shipping box"
      @notification_list.each{ |notification| message += notification }
      message
  end

  def add_label_notification notification
    @notification_list = initialize_notification_list
    @notification_list << "\n#{notification}"
  end

  private

  def initialize_notification_list
    @notification_list = @notification_list.nil? ? [] : @notification_list
  end

end