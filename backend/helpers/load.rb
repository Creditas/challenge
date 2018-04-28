require "singleton"


module Helpers
end

Dir[File.dirname(__FILE__) + '/*.rb'].each { |file| require file }
