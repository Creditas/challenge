class RegistryBasedDomainEventPublisher < DomainEventPublisher
  def initialize(event_handlers)
    @event_handlers = event_handlers
  end

  def publish(event_type, event_data)
    if (@event_handlers[event_type].nil?)
      raise "no handler available for event: #{event_type}"
    end

    @event_handlers[event_type].each { |handler| handler.handle(event_data) }
  end
end