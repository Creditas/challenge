abs_path = File.absolute_path(__FILE__)
Dir[File.dirname(abs_path) + '/tests/**/*_test.rb'].each { |file| require file }
