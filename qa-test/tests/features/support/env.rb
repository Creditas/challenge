require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec/matchers'
require 'selenium-webdriver'
require 'site_prism'
require 'faker'
require 'json'
require 'httparty'

World(Capybara::DSL)
World(Capybara::RSpecMatchers)

Capybara.configure do |config|
    config.default_driver = :selenium_chrome
    config.app_host = 'https://the-internet.herokuapp.com'
    config.default_max_wait_time = 5
end