## Notas - Resolução do desafio para Backend Software Engineer da CREDITAS

Inicialmente, decidiu-se separar as classes presentes em _bootstrap.py_ em arquivos separados.

Em seguida, deu-se início à revisão estrutural do código. A maneira como as responsabilidades estavam distribuídas entre as classes era bastante confusa, por este motivo decidiu-se redistribuí-las conforme as diretrizes a seguir:

## Classes

__Customer__
Classe responsável por armazenar todas as informações do cliente.

Atributos:
    <i>name</i>: nome do cliente.
    <i>membership</i>: informações referentes à associação do cliente ao site.
    <i>email_address</i>: email do cliente.
    <i>billing_address</i> = endereço de faturamento do cliente.
    <i>shipping_address</i> = endereço de entrega do cliente.
    

__Membership__
Classe responsável por armazenar as informações da associação do cliente ao site.

Atributos:
    <i>bonus_credit</i>: bônus do cliente, em reais, incrementado à cada compra digital.

__Address__
Classe responsável por armazenar as informações referentes a um endereço.

Atributos:
    <i>zip_code</i>: CEP do endereço.

__Product__
Classe responsável por armazenar as informações referentes a um produto.

Atributos:
    <i>name</i>: nome do produto.
    <i>kind</i>: tipo do produto.
    <i>price</i>: preço do produto.

Obs: como _type_ é uma built-in function em python, este parâmetro foi renomeado como _kind_.

__Order__
Classe responsável por armazenar as informações referentes a um pedido.

Atributos:
    <i>customer</i>: cliente solicitante do pedido.
    <i>items</i>: lista de produtos do pedido.
    <i>closed_at</i>: data/hora do fechamento do pedido.

__CreditCard__
Classe responsável pela geração de um CreditCard.

Atributos:
    None

__Invoice__
Classe responsável pelas informações da fatura do pedido.

Atributos:
    <i>billing_address</i>: endereço de faturamento.
    <i>shipping_address</i>: endereço de entrega.
    <i>order</i>: pedido a ser faturado.

__Payment__
Classe responsável por armazenar as informações do pagamento do pedido.

Atributos:
    <i>authorization_number</i>: número de autorização do pagamento.
    <i>invoice</i>: fatura do pagamento.
    <i>order</i>: pedido pelo qual o pagamento foi efetuado.
    <i>payment_method</i>: método de pagamento utilizado.

## Reestruturação do código

__Remoção da classe OrderItem__

Dada a redistribuição de responsabilidades entre as classes, não se viu necessidade de manter a classe **OrderItem**

__Associação das classes Membership e Address a classe Costumer__

A classe **Costumer**, que ainda não havia sido criada, passou a conter além do nome e email do cliente, as informações referentes à sua associação (**Membership**) e os endereços de cobrança e entrega (instâncias de **Address**). A associação destas duas classes a **Costumer** é interessante, já que ambas são relativas ao cliente. A única outra referência à classe **Address** é feita em **Invoice**, e seu construtor implica que seja passado um pedido como atributo (**Order**, que contém um **Costumer**) para que a atribuição dos endereços seja feita, de maneira que tudo fica atrelado e a manutenção futura do código será muito mais fácil.

__Refatoração da classe Order__

A classe **Order** estava excessivamente complicada, contendo um **OrderItem** (que foi descartado), e um **Address** (que passou a ser desnecessário, já que as informações de endereço estão agora todas no cliente). Portanto, decidiu-se manter como atributos apenas o **Costumer**, a lista de **Products** e a data/hora do fechamento do pedido. Os produtos novos são adicionados à lista através do método <i>add_product</i> (que também foi refatorado e permite a adição de múltiplos itens).

__Refatoração da classe Payment__

A classe **Payment** também pôde ser melhorada em sua estrutura. Além da remoção de atributos que não estavam sendo efetivamente utilizados, como <i>authorization_number</i> e <i>amount</i>, a passagem de todos aqueles atributos em seu construtor passou a ser desnecessária uma vez que reestruturamos às demais classes! Um **Order** contém um **Costumer** que por sua vez contém os objetos de **Address**, portanto... Os únicos atributos necessários são **Order** e **CreditCard** (<i>payment_method</i>). Os métodos também foram simplificados, melhorando a legibilidade e manutenibilidade do código.

__Adoção de um timestamp único na efetuação do pagamento__

Tanto a classe **Order** quanto a classe **Payment** tinham um timestamp implementado que marcava o momento do fechamento do pedido. Não faz sentido e contradiz boas práticas mantê-lo em dois lugares diferentes, por isso ele ficou na classe **Order** como <i>closed_at</i>.

__Docstrings adicionadas aos métodos das classes__

Para facilitar o entendimento do propósito de cada método, docstrings com explicações sucintas foram criadas.

__Definição das variáveis dentro dos construtores__

Como não estamos utilizando variáveis de classe nesta solução, todas as variáveis passaram a ser declaradas dentro dos respectivos construtores de cada casse (pois são variáveis "de instância").

## Exemplo de funcionamento

Conforme o exemplo presente em _bootstrap.py_, o funcionamento da solução se dá da seguinte maneira: primeiramente, um **Customer** é instanciado e seus atributos (name, email, membership, billing_address e shipping_address) são devidamente atribuídos. Em seguida, uma **Order** e os **Products** a serem adicionados à ela também são instanciados. Um objeto de **Payment** é então instanciado (com <i>order</i> e <i>payment_method</i> já atribuídos) e o método _pay()_ desta mesma classe é chamado. A chamada deste método (em conjunto com os métodos que o mesmo chama) faz com que, respectivamente:

1. Uma **Invoice** seja gerada de acordo com a **Order**;
2. A **Order** seja devidamente fechada (e o timestamp registrado);
3. Os produtos sejam processados de acordo com o tipo;
4. O usuário seja notificado via email.

## Conclusão

Esta solução visou reestruturar o código de uma maneira em que as classes não fossem acopladas tão rigidamente, ou seja, que pudessem ser modificadas mais facilmente sem que outras partes do código fossem afetadas de uma maneira imprevisível. Ambiguidades foram removidas e algumas lógicas foram simplificadas. A legibilidade e manutenibilidade aumentaram drasticamente, assim como a escalabilidade, já que esta estrutura melhor definida prepara o código para implementações futuras.