Para solucionar o problema das "n" formas de processar os itens do pedido após o pagamento, criei um contexto de estratégias.

Após concluir o pedido, eu coloquei uma interação por todos os produtos, passando-os para o contexto de estratégias, que se encarregará de escolher a melhor estratégia para aquele tipo de produto e solicitar a execução das ações necessárias.

Normalmente, essas soluções são implementadas utilizando interfaces. Mas como eu não sei utilizar interfaces em Ruby, eu criei as classes com uma herança em comum.