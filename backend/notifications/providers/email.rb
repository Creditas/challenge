class Notifications::Providers::Email < Notifications::Sender

  def send(to, subject, template)
    "Enviando e-mail para #{to} assunto: #{subject} conteúdo: #{template.build}"
  end
end
