Quando("eu clico no link") do                                                
    @openWindow.load
    @openWindow.click_link.click
end   

Então("verifico que abriu uma nova") do
    switch_to_window windows.last #mudando para a ultima aba
    expect(current_url).to eql 'https://the-internet.herokuapp.com/windows/new'
    @mensagem = find('.example')
    expect(@mensagem.text). to eq 'New Window'
    windows.last.close
end