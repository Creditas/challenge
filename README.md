# Solução

## TLDR;

A solução para o `Fluxo de pagamento` é o último item.

## Estrutura do projeto

A primeira coisa que fiz foi mover todas as classes que estavam em `bootstrap.rb` para seus respectivos arquivos. Em seguida, reorganizei o projeto na seguinte estrutura.

- **bin**: Contém os executáveis do projeto, sendo apenas o `bootstrap.rb` neste caso.
- **doc**: Toda documentação relacionada ao projeto, com exceção do README.
- **lib**: Biblioteca em sí, onde ficam todas as Entidades e Dispatchers contendo a lógica da aplicação.

Além disso, removi todos os outros arquivos que não estavam relacionados ao desafio. Menos é mais! :)

## Refatoração

Também refatorei alguma das entidades já implementadas...

**Separação das responsabilidades entre Order e Payment**

Na finalização do pedido, o `Payment` costumava alterar a data de fechamento (closed_at) da `Order`. Não deveria ser responsabilidade do `Payment` saber quando um campo específico da `Order` deve ser atualizado, por isso fiz a seguinte alteração.

- Disponibilizei o método `set_payment` na `Order`, responsável pela atualização de qualquer campo da `Order` na finalização de um pedido. Também é responsável por qualquer validação nessa finalização (ver se o pedido realmente está finalizado, por exemplo).
- O `Payment` passou a atualizar a `Order` usando o `set_payment`, sem se preocupar com o que está acontecendo ali dentro.
- O `set_payment` é a primeira coisa que o `Payment` faz na sua finalização porque caso alguma validação da `Order` falhe, a finalização como um todo falharia.

Além disso, criei um `status` para o `Payment` para que qualquer entidade consiga determinar o seu estado sem precisar se aprofundar em detalhes de implementação (anteriormente teríamos que verificar se o campo paid_at estava preenchido).

**Movendo Address para dentro do Customer**

Antes dessa alteração, a entidade `Order` era responsável por manter o `Endereço de Entrega` e o `Endereço de Cobrança`. O problema dessa abordagem é que esses endereços teríam que ser inputados a cada novo pedido.

Para resolver isso, movi os endereços para a entidade `Customer`. Isso possibilita o usuário salvar o seu endereço e alterá-lo quando quiser.

Na finalização de um pedido, o `Invoice` é criado e o endereço é persistido nele também. Assim não corremos o risco de um endereço já processado ser alterado por engano.

Também adicionei o e-mail no `Customer` para ser usado pelo `Notification` posteriormente.

**Criação de novas entidades**

Criei novas entidades para suportar os diferentes fluxos de pagamento, elas são:

- **Voucher**: Informações relevantes ao voucher que é gerado ao comprar um produto digital.
- **Shipping**: Aqui temos uma classe abstrata chamada `Shipping` que contém uma `Lista de Items` a ser enviados, uma `Shipping label` que será impressa e um método `Ship()` que executa a ação em sí. O `Shipping` também expõe o método `label` para que as classes concretas implementem a sua forma de construir a `ShippingLabel`.
- **Notification**: Contém as informações necessárias para enviar uma notificação e implementa o método `send` para fazer o envio. Também criamos o `VoucherNotification` para que os detalhes da montagem do e-mail do `Voucher` não ficassem disperços em outras entidades.
- **Membership**: Contém um produto/cliente associado e implementa o método `activate` para que aquela assinatura seja ativada. Também tem um `status`, por onde conseguimos determinar o estado daquela assinatura.

## Fluxo de pagamento e regras de envio

Sem se preocupar com as regras inicialmente, o fluxo de pagamento é basicamente o seguinte... sempre que a ação `Pagamento` for efetuada com sucesso, devemos executar outros _N_ processamentos. Esse cenário me parece ideal para o uso de eventos:

- O `Pagamento` disponibiliza um evento que é chamado na sua finalização
- Outras entidades assinam esse evento
- O `Pagamento` é finalizado
- Todas as outras entidades são alertadas, recebem as informações relevantes àquele evento e realizam seu próprio processamento

Com isso em mente, implementei uma abstração chamada `Dispatcher`.

**Dispatcher**

Um dispatcher representa qualquer processamento que deve ser executado na finalização do pagamento. Ele pode enviar um e-mail ou ativar uma assinatura, por exemplo.

Cada dispatcher implementa o método `dispatch`. Esse método é chamado na finalização do pagamento e recebe um `Invoice` como parâmetro.

Para que o dispatcher escute o evento de pagamento, ele deve ser adicionado no `Dispatcher` usando o método `add_dispatcher`. No fim do pagamento, todos os dispatchers adicionados serão chamados (apesar de eu estar chamando eles sequencialmente, poderíamos chamar em paralelo também).

**Concluindo**

Essa solução me pareceu mais atraente porque as entidades ficam totalmente isoladas entre sí. 

- O `Payment` não sabe o que está sendo executado após a sua finalização
- O `Shipping`, `Membership` e `Notification` não sabem que um pagamento foi finalizado
- O dispatcher trata de qualquer lógica intermediária entre uma entidade e outra

Colocar essas entidades em micro-serviços separados e se comunicar por mensagens (SNS da AWS, por exemplo) seria bem fácil usando essa solução.

A implementação de uma nova lógica de negócio fica bem simples e isolada também.

O tradeoff é performance... cada dispatcher é auto-contido e não compartilha informação com os outros, isso resulta em cada um iterando pela lista de pedidos inteira para achar os itens que lhe são relevantes. Mas como estamos falando de um pedido de compra, a quantidade de itens na lista não deve ser um problema.