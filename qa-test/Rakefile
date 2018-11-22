desc "Executar os testes em dev usando o Chrome"
task :test_chrome_dev do
  puts "Executando test:chrome:dev"
  sh "bundle exec cucumber -p pretty -p html -p dev -p no_headless"
end

desc "Executar os testes em dev usando o Chrome headless"
task :test_chrome_dev_headless do
  puts "Executando test:chrome:dev"
  sh "bundle exec cucumber -p ci -p html -p dev -p headless"
end

desc "Executar os testes em hmg usando o Chrome"
task :test_chrome_hmg do
  puts "Executando test:chrome:dev"
  sh "bundle exec cucumber -p pretty -p html -p hmg -p no_headless"
end

desc "Executar os testes em hmg usando o Chrome headless"
task :test_chrome_hmg_headless do
  puts "Executando test:chrome:dev"
  sh "bundle exec cucumber -p ci -p html -p hmg -p headless"
end
