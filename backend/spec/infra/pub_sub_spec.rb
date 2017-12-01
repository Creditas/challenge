require_relative '../../infra/pub_sub'

describe PubSub do 

  before(:each) do
    @pubsub = PubSub.instance
    @pubsub.clean_subscriptions
  end

  it 'should notify one subscriber without filter' do 
    topic = 'SIMPLE_TOPIC'

    event = create_event

    subscriber = create_subscriber(event, 1)

    @pubsub.subscribe(topic, subscriber)
    @pubsub.publish(topic, event)
  end

  it 'should not notify subscriber with different filter' do 
    topic = 'SIMPLE_TOPIC'

    event = create_event('filter0')

    subscriber = create_subscriber(event, 0)

    @pubsub.subscribe(topic, subscriber, 'filter1')
    @pubsub.publish(topic, event)
  end

  it 'should notify only the correct subscriber' do 
    topic = 'SIMPLE_TOPIC'
    another_topic = 'ANOTHER_TOPIC'

    event = create_event

    subscriber = create_subscriber(event, 1)

    another_subscriber = create_subscriber(event, 0)

    @pubsub.subscribe(topic, subscriber)
    @pubsub.subscribe(another_topic, another_subscriber)
    @pubsub.publish(topic, event)
  end

  it 'should not notify subscriber with correct filter but wrong topic' do
    topic = 'SIMPLE_TOPIC'
    another_topic = 'ANOTHER_TOPIC'

    event = create_event

    subscriber = create_subscriber(event, 0)

    @pubsub.subscribe(another_topic, subscriber, 'filter0')
    @pubsub.publish(topic, event)
  end

  def create_event(filter = nil)
    instance_double('event', :type => filter)
  end

  def create_subscriber(event_to_receive, notified_how_many_times)
    subscriber = instance_double('subscriber', :notify => nil)
    expect(subscriber).to receive(:notify).with(event_to_receive).exactly(notified_how_many_times).times
    subscriber
  end

end
