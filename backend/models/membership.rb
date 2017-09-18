# frozen_string_literal: true

# Class responsible to manage Customer's membership to some services
class Membership
  attr_reader :since, :service_name

  def initialize(since, service_name = '')
    @since = since
    @service_name = service_name
  end
end
