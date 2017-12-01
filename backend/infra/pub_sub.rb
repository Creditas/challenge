require 'singleton'
require_relative './subscription'

### dummy implementation of a PubSub
### Useful for decoupling
### Ideally, we would be using a tool specially designed for this (like Redis pubsub)

class PubSub

  include Singleton

  def initialize
    clean_subscriptions
  end

  def subscribe(topic, subscriber, filter = nil)
    @subscriptions << Subscription.new(topic, subscriber, filter)
  end

  def publish(topic, event)
    topic_subscriptions = @subscriptions.select { |subscription| subscription.topic == topic }
    filtered_subscriptions = topic_subscriptions.select { |subscription| subscription.interested?(event) }

    filtered_subscriptions.each { |subscription|
      subscription.notify(event)
    }
  end

  def clean_subscriptions
    @subscriptions = Array.new
  end

end