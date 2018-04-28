module Notifications


  module TemplateBuilder
    module Templates

    end
  end

end

Dir[File.dirname(__FILE__) + '/*.rb'].each { |file| require file }
Dir[File.dirname(__FILE__) + '/templates/*.rb'].each { |file| require file }
