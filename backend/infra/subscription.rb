class Subscription
  attr_reader :topic, :subscriber, :filter

  def initialize(topic, subscriber, filter)
    @topic = topic
    @subscriber = subscriber
    @filter = Array.new
    if filter != nil 
      @filter << filter
    end
  end

  def notify(event)
    subscriber.notify(event)
  end

  def interested?(event)
    @filter.empty? or @filter.include? event.type
  end

end