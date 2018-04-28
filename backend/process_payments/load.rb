module ProcessPayments
  module Providers

  end

end

Dir[File.dirname(__FILE__) + '/*.rb'].each { |file| require file }
Dir[File.dirname(__FILE__) + '/providers/*.rb'].each { |file| require file }
