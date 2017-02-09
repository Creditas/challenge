## Desafio para Backend Software Engineer 

Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que
recebem tratamentos a depender as situações específicas de cada um como segue:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos
conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

__O que é necessário fazer?__

Você ficou designado a prototipar como poderá ser feita a nova versão deste fluxo de pagamento/regras de envio, pois a versão atual é 
frágil, encadeada em if/else, switch/case, requerendo modificações grandes a cada nova necessidade de processamento inserida/removida.

Crie as classes, métodos e suas respectivas chamadas para que recebendo um _input_ (Pagamento), você consiga tratar os cenários acima.
__Não é necessário__ criar as implementações para envio de e-mails, imprimir `shipping label`, etc. Deixe tudo pronto e indicado porém, para chamar estes serviços no futuro.

Como a proposta não requer um código final funcionando, não há a necessidade de implementar os testes de unidade.

__O que está sob avaliação?__

Sua capacidade de analisar, projetar e codificar uma solução guiando-se com Design Orientado a Objetos e Princípios de Orientação a Objetos.

Sinta-se à vontade para modificar/refatorar o arquivo `bootstrap.rb` caso julgue necessário. Neste caso, por favor, inclua a explicação das modificações.

__O que não vale?__
Frameworks :] (aliás, nem precisa)

__Qual linguagem?__
Ruby por favor. Caso não sinta-se confortável com Ruby, Java/PHP/C# é ok.

__Tempo__
Estima-se 1h30 para este desafio, entretanto não há um limite.

__Apresentação__
  - Código protótipo
  - Explicação da solução (em arquivo separado em Markdown/Plain Text)

__Avaliação__

Para nos enviar seu código, você pode:

* Fazer um fork desse repositório, e nos mandar uma pull-request.
* Nos dar acesso a um repositório privado seu (github, bitbucket, gitlab...) e nos avisar.
* Nos enviar um git bundle do seu repositório para o e-mail challenge@bankfacil.com.br
