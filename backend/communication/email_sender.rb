class EmailSender 

  def notify(event)
    puts "Enviando email para usuario #{event.customer} com conteudo '#{event.content}'"
  end

end
