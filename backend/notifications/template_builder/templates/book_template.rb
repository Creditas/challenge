class Notifications::TemplateBuilder::Templates::BookTemplate < Notifications::TemplateBuilder::Template
  def initialize(payment)
    super payment
  end

  def build
    "item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
  end
end
