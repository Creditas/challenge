Dado('que eu esteja na tela inicial do Opening a new window') do
  @homea = Homenovaaba.new
  @homea.load
  @pagea = Pagenovaaba.new
end

Quando('clicar no link') do
  @pagea.novaaba
  sleep(3)
end

Entao('deve abrir uma nova aba com mensagem') do
  within_window(windows.last) do
    page.should have_content('New Window')
  end
end
