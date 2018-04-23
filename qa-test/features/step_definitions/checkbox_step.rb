
Dado('que eu esteja na tela inicial do Dynamic Controls') do
  @home = Homecheckbox.new
  @home.load
  @page = Pagecheckbox.new
end

Quando('realizar a remocao do CheckBox') do
  @page.remocao
  sleep(6)
end

Quando('realizar a adicao do CheckBox') do
  @page.adicao
end

Entao('deve ser exibida a mensagem referente o checkbox') do
  page.should have_content("It's back!")
end

Entao('deve ser exibida a mensagem de remocao') do
  page.should have_content("It's gone!")
end
