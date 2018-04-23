# classe criada para page-objects do checkbox

class Pagecheckbox < SitePrism::Page
  element :botao, :id, 'btn'

  def remocao
    botao.click
  end

  def adicao
    botao.click
  end
end
