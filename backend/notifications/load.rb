module Notifications

  module Providers

  end
end
Dir[File.dirname(__FILE__) + '/*.rb'].each { |file| require file }
Dir[File.dirname(__FILE__) + '/providers/*.rb'].each { |file| require file }
require File.join(File.dirname(__FILE__), "/template_builder/load")
