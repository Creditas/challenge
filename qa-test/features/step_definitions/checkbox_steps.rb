Given("que estou na página Dynamic Controls") do
  visit "https://the-internet.herokuapp.com/dynamic_controls"
end

When("clico no botão {string}") do |string|
  click_on  string
end

Then("o checkbox é removido") do
  page.has_no_field?('checkbox')
end

And("a mensagem {string} aparece") do |string|
  page.has_content?(string)
end

Given("que estou na página Dynamic Controls sem checkbox") do
  visit "https://the-internet.herokuapp.com/dynamic_controls"
  page.execute_script("onClick()")
end

Then("o checkbox é adicionado") do
  page.has_field?('checkbox')
end

