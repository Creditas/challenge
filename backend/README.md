## Desafio para Backend Software Engineer


- REQUISITOS -
Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que recebem tratamentos a depender as situações específicas de cada um como segue:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

---------------------

- SOLUCAO - Explicão conceitual

Para tratar o problema dos multiplos tipos de tratamento para os itens, utilizei um conhecido padrão chamado Strategy. O padrão consiste em ter estratégias especificas para tratamento de cada item, onde essas estrategias podem ser intercambiadas pois possuem uma mesma interface.
Optei por usar Hash arguments e ler utilizando params.fetch pois assim, caso uma estrategia precise de argumentos diferentes, não há quebra de contrato com as demais, fazendo com que seja simples adicionar tratamento para novos tipos de itens.

Geralmente quando utilizo Rails, onde os models já são super lotados de funcionalidades, eu gosto de utilizar um padrão chamado Interactor (Ou Command pattern como é conhecido em GoF)
Assim, eu tenho classes que são responsaveis por apenas uma unica funcão (ou comando), com poucas responsabilidades e baixo acoplamento.
Neste projeto, utilizei esse padrão de forma simplificada, sem o uso de Gems ou coisas do tipo.

- Detalhamento Técnico
  Após o pagamento, um servico do module de Pós Pagamento é chamado para executar as acões necessarias.

  OrderProcessor tem um metodo perform, que varre os itens chamando a estrategia mais adequada para o tratamento do mesmo. Essas estrategias são chamadas de xItemProcessor.
  ItemProcessor são como organizadores que delegam as acoes necessarias para servicos especificos.
  Uma caso interessante é o PhysicalItemProcessor, que delega a geracao de um Shipping label, mas sem se preocupar com qual tipo de label é necessario. Afinal, essa não é a responsabilidade do processador e sim da classe que cria efetivamente o conteudo dos ShippingLabel para ser enviado a impressora.

------------------------------------------------------------









