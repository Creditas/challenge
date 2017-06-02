class EventDispatcher
  attr_reader :events

  def initialize
    @events = {}
  end

  def listen_to(event, &handler)
    @events[event] = [] if @events[event].nil?
    @events[event] << handler
  end

  def dispatch(event, context = {})
    unless @events[event].nil?
      @events[event].each do |event_handler|
        event_handler.call(context)
      end
    end
  end
end