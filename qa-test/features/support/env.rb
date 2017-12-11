require 'capybara/cucumber'
require 'selenium-webdriver'
require 'httparty'
require 'httparty/request'
require 'httparty/response/headers'
require 'faker'
require 'rspec'
require 'site_prism'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.default_driver = :selenium
Capybara.default_max_wait_time = 30
