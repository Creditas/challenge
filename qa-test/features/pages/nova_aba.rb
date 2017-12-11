# classe criada para page-objects da nova aba

class Pagenovaaba < SitePrism::Page
  element :link, :css, '.example > a:nth-child(2)'
  def novaaba
    link.click
  end
end
