## Desafio para Backend Software Engineer

Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que recebem tratamentos a depender as situações específicas de cada um como segue:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

__O que é necessário fazer?__

Você ficou designado a prototipar como poderá ser feita a nova versão deste fluxo de pagamento/regras de envio, pois a versão atual é frágil, **encadeada em if/else, switch/case**, exigindo modificações grandes a cada nova regra de envio/processamento inserida ou removida.

Crie as classes, métodos e suas respectivas chamadas (a seu critério) para que você consiga tratar os cenários acima.

**Não é necessário** criar as implementações para envio de e-mails, imprimir o _shipping label_, etc. Para estes casos (email, shipping label) crie apenas as chamadas de métodos, para indicar que ali seria o local aonde o envio ocorreria.

Como a proposta **não requer um código final funcionando**, não há a necessidade de implementar os testes de unidade. Entretanto, levaremos isso como _bonus points_. É permitido o uso de libs para facilitar a implementação dos testes.

__O que está sob avaliação?__

Sua capacidade de analisar, projetar e codificar uma solução guiando-se com **Design Orientado a Objetos** e **Princípios de Orientação a Objetos**.

Sinta-se à vontade para modificar/refatorar quaisquer aspectos das classes/métodos do arquivo `bootstrap` caso julgue necessário. Escolha o arquivo de bootstrap da linguagem que for mais familiar pra você, as opções que temos hoje são [bootstrap.py](https://github.com/Creditas/challenge/blob/master/backend/bootstrap.py), [bootstrap.rb](https://github.com/Creditas/challenge/blob/master/backend/bootstrap.rb), [bootstrap.kt](https://github.com/Creditas/challenge/blob/master/backend/bootstrap.kt).

Por favor, inclua suas considerações da atividade em um arquivo de texto ou markdown.

__O que não vale?__
 - Frameworks :] (aliás, nem precisa)
 - Metaprogramação/Reflection

__Qual linguagem?__
Ruby, Python ou Kotlin

__Tempo__
Estima-se 4 a 8 horas para este desafio, entretanto não há um limite.

__Apresentação__
  - Código
  - Explicação da solução (em arquivo separado em Markdown/Plain Text)

__Avaliação__

Para nos enviar seu código, você pode:

 - Fazer um fork desse repositório, e nos mandar uma pull-request.
 - Dar acesso ao seu repositório privado no [Gitlab](http://gitlab.com) para o usuário `creditaschallenge`.
