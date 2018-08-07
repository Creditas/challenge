Quando("eu clico no botão") do
    @checkbox_page.load
    @checkbox_page.btn_remove.click
end
  
Então("verifico se o checkbox foi removido.") do
    texto = find('#message')
    expect(texto.text).to eql "It's gone!"
end
  
Quando("clico no botão") do
    @checkbox_page.btn_remove.click
end
  
Então("verifico se o checkbox foi adicioando.") do
    texto = find('#message')
    expect(texto.text).to eql "It's back!"
    @checkbox_page.btn_checkbox.click
end
  