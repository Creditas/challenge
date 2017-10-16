class DomainEventPublisher
  def self.current
    @current
  end
  
  def self.current=(value)
      @current = value
  end

  def publish(event_type, event_data)
      raise NotImplementedError, "Should be implemented by subclass" 
  end
end