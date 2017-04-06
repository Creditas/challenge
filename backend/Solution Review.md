## Solution Review: Modelando um Sistema de E-commerce

Este projeto busca mostrar como o uso de uma linguagem funcional fortemente tipada pode ajudar bastante a modelar o domínio. Além disso, o objetivo é ajudar a divulgar o uso do F# como uma opção viável para desenvolvimento de software mais exato e mais simples de compreeender. Em pouco mais de 300 linhas de código **F#**, foi possível fazer uma primeira aproximação do domínio proposto no problema.


### Introdução rápida ao F#

Em um projeto F#, os arquivos da solução são organizados linearmente no projeto. E mais: a *ordem* dos arquivos no projeto importa muito. Um arquivo .fs só pode usar o que estiver definido *antes* no projeto, isto é, *acima* do arquivo atual. O mesmo vale para o conteúdo de um arquivo em F#. Normalmente não é possível usar algo que está definido *abaixo*, acima no arquivo. Entretanto, este projeto usa a versão mais recente do F#. E nesta versão mais recente, é possível definir o conteúdo do arquivo em qualquer ordem, desde que se adicione a palavra-chave `rec` à definição do namespace. Com isso, em um mesmo arquivo, é possível organizar a ordem dos módulos como eu quiser: 

	namespace rec SimpleDomainModel

Como podemos ver, o domínio foi organizado em módulos de acordo com o assunto. Gostaria de mostrar agora alguns detalhes sobre o sistema de tipos do F# e como ele é superior ao sistema de tipos do C#, Java e similares

#### Records Imutáveis
Para começar, o tipo mais comum no F# é um *record*. Os records são imutáveis e tão as estruturas de dados mais simples que temos à disposição. Um `Order` é um record type:

    type Order = 
        { orderId : System.Guid
          customer : Customer
          items : OrderItem list
          shippingAddress : CustomerAddress
          closeDate : DateTime option
          orderFullfilmentStatus: OrderFulfillmentStatus
          payment : Payment
          storeOfOrigin: Store}

Como podemos ver, há campos simples e não há grandes segredos. É claro que é possível criar types mais complexos, que tenham todas as funcionalidades de classes, mas frequentemente o uso de tipos mais complexos é evitável. A grande vantagem dos *records* é que formalizar com um mínimo de código um conceito do domínio, no caso, um substantivo *Order*. Pode pode estar se perguntando: mas e o comportamento? Onde fica? Simples! No F# e em outras linguagens funcionais, o estimula-se a separação clara dos **dados** e  **comportamento**. Isto é: podemos escrever um comportamento **fora de uma classe**, de forma livre. A principal consequência é que escrevendo comportamentos fora de um container como um record ou classe mais complexa, estamos privilegiando um design usando dados **dados imutáveis**, o que ajuda a manter o código mais simples de entender, mais seguro e bem mais flexível do que em modelos OO. 

Para entender entender a vantagem deste design mais imutável, neste exemplo, ao trabalhar com uma ordem com este design que não muda de acordo com o estado, eu consigo criar um comportamento (isto é, uma *função*) com o nome `closeOrder` dependa de uma ordem que esteja em um determinado estado **conhecido**, sem que a função precise validar através de *ifs* qual é o suposto estado da ordem, como geralmente é feito em modelos OO. 

É claro que não mostro isso neste projeto, mas na vida real provavelmente haveria vários records ilustrando os diversos estados da ordem tais como `RecentlyCreatedOrder`, `PaidOrder`, `AwaitingDeliveryOrder`, cada um com seu conjunto de propriedades e diversas funções independentes que consigam trabalhar usando estes types como parâmetro. Ou seja, uma função `closeOrder` suportaria apenas algo como um `DeliveredOrder` ou algo assim.

Poderíamos ir além e modelar não só estados intermediários do ciclo de vida de um `Order`, mas também poderíamos usar o conceito de *Domain Events* para modelar também acontecimentos importantes. Por exemplo, nada impede de se criar um domain event com o nome `PaymentAccepted` para informar a quem tiver interesse que determinado pagamento foi aprovado para um determinado pedido. Isso faz com que o design se torne ainda mais exato e mais claro para os programadores e analistas do projeto. E além disso, é possível ir mais longe e considerar *Commands* para formalizar início de operações do domínio. Poderíamos ter um comando como `NotifyPaymentAcceptance` que geraria o evento `PaymentAccepted`. Neste projeto resolvi simplificar o modelo :)

Ah, vale dizer que o uso de records imutáveis é incrível para quem vai manter o software. Um sistema que modela a mudança de estados corretamente facilita o entendimento dos desenvolvedores - a ausência de mudança de estado evita que seja necessário procurar quem altera o código, quem chama o setter público e facilita mentalmente ao não forçar o desenvolvedor a imaginar qual é o estado de uma variável ao ler o código. Um cenário de dados imutáveis e fáceis de entender torna a vida de todos muito mais fácil.

#### Tipos algebraicos

O suporte a tipos algebraicos dá ao F# uma grande flexibidade de explicitar conceitos de domínio de forma que outras linguagens OO teriam maior dificuldade ou verbosidade. 

    type PhysicalProducItemType = Book | Other
    
    type DigitalProductItemType = DigitalMedia | Membership
    
    type ProductType = 
        | PhysicalItem of PhysicalProducItemType
        | DigitalItem of DigitalProductItemType

    type Product = 
        { productId : string
          productName : string
          itemType : ProductType
          listPrice : decimal<BRL> }

Neste exemplo, `PhysicalProductItemType`, `DigitalProductItemType` e `ProductType` são exemplos de tipos algebraicos. Eles funcionam como _enums_ em outras linguagens, mas com o poder adicional de serem agrupadas e parametrizadas por outros tipos. O `ProductType` é uma *Discriminated Union*, porque seus valores válidos são uma opção ou outra. Além disso, cada opção de `ProductType` pode assumir qualquer uma das opções dos tipos físicos e digitais. Daí é que vem o nome "tipos algebraicos": uma discriminated union é a união de todas as combinações possíveis do primeiro item (ou seja uma multiplicação = livro e item comum = 2 possibilidades) + todas as combinações possíveis do segundo item (digital media, membership = 2 possibilidades). 

As discriminated unions são extremamente usadas em F# e são uma ferramenta crucial para escrever um código que seja um reflexo do domínio. Como é possível analisar neste exemplo, fica extremamente claro até para quem não é programado que o conceito de produto físico e digital foi bem esclarecido no código.

Outra vantagem de usar DUs no código é que no momento no patten matching o compilador consegue avaliar se todas as opções foram cobertas, ajudando a evitar certos tipos de erros. Podemos ver um exemplo de pattern matching logo abaixo:

	match currentItem.product.itemType with 
		| PhysicalItem item  -> 
			match item with
				| Book -> processBookOrderItem order currentItem
				| Other -> processPhysicalOrderItem order currentItem
		| DigitalItem item -> 
			match item with 
				| DigitalMedia -> processDigitalMediaOrderItem order currentItem
				| Membership -> processMembershipOrderItem order currentItem

Nota-se que é necessário cobrir as 4 possíveis combinações delineadas acima, exigindo que o programador tenha que se preocupar desde o começo com todos os fluxos da aplicação.

Uma aplicação muito interessante de discriminated unions interessantíssima para capitalizar em cima do sistema de tipos para criarmos "tiny types". Através do uso de discriminated unions de um campo só, é possível evitar o uso de strings onde na verdade queremos um endereço de e-mail válido. E assim por diante:

	type EmailAddress = 
        | EmailAddress of email : string
    
    let createEmail (s : string) = 
        if Regex.IsMatch(s, @"^\S+@\S+\.\S+$") then Some(EmailAddress s)
        else None
    let unwrapEmail (EmailAddress e) = e

	// criando os dados
	shippingLabelContent = 
        match createString50 ("Label for Order " + order.orderId.ToString()) with
        | Some x -> x
        | None -> failwith "Invalid Shipment Label Content"

	// usando os dados
	let sendEmail emailMessage = 
        let destination = unwrapEmail emailMessage.destination
        let subject = unwrapString50 emailMessage.subject

    
Neste exemplo, `EmailAddress` é uma discriminated union de campo único. Para criar um e-mail é interessante usar uma função construtora (que geralmente fica no mesmo módulo) para ler o conteúdo do `EmailAddress` costuma-se usar uma função que faça o "unwrap" ou o "desempactamento" do type de volta para string. O uso de funções construtoras, embora não seja obrigatório, é muito favorecido pelo compilador que já dá todas as pistas sobre qual type é necessário para alimentar o campo. E o interessante é que certas complexidades como e-mails inválidos e domain invariants precisam ser efetivamente tratadas no momento em que ocorrem. Por exemplo, eu sou obrigado a usar um e-mail válido e sou obrigado a fazer o tratamento durante o pattern matching, caso o e-mail seja inválido. Esta é uma forma de tornar o código mais resistente a falhas e claro, mais próximo do domínio. 


#### Módulos e Funções

Em F# existe o conceito de **módulos**, que seriam basicamente grupos de funções e type eventualmente dentro de um namespace. Neste projeto cada módulo trata de uma pedaço do domínio, guardando types e functions no mesmo nível. Isso faz com que o design fique um pouco mais organizado e possa crescer no futuro. O que muda do F# para outras linguagens é que as funções têm a mesma importância que outros itens como types e etc. E também, podemos ter funções dentro de funções, além de poder passar funções como parâmetro de outras funções (higher-order functions).


#### Unidades de Medida para um domínio mais estrito

	listPrice : decimal<BRL>
    sellingPrice : decimal<BRL>

Preciso dizer que isso é lindo?

### Abordagem do problema proposto

Embora o projeto seja um simples exercício, resolvi ir um poico mais além e resolvi assumir algumas premissas para deixar o exercício um pouco mais realista para mim. 

Com isso, resolvi pensar neste sistema como um backend de pedidos que possam ser recebidos de diferentes lojas de um mesmo grupo de empresas. Por exemplo, eu pensei em duas grandes lojas: um e-commerce da Saraiva e na reativação do site Usina do Som (um grande clássico da internet brasileira hein!??!). 

Logo, resolvi começar com o pedido inicialmente chegando, ao invés de pagamento. Eu prefiro pensar no pedido porque parece ser mais lógico para mim. Além disso, resolvi investir mais nas regras de entrega e ativação do pedido do que no ciclo de vida do pedido e pagamento. Como o objetivo do trabalho é mostrar como ficariam tais regras, resolvi evitar neste momento maiores complicações como "fechar ordem" e coisas assim.

#### Fluxo Principal

No começo do modelo alguns types são definidos para formalizar um pouco melhor o que é pagamento, pedido e produto. O fluxo é bem simples e começa com `OrderFullfilmentModel.startOrderFullfilment`:

- Uma ordem é passada como parâmetro para `startOrderFullfiment`. Neste modelo simplista isso está ok, mas na vida real, em um ambiente com microserviços ou mesmo um monolito mais realista, usaríamos um Command gerado em resposta a algum Domain Event. O projeto também não envolve a reconstrução do aggregate `Order` a partir de eventos do passado, como seria feito em um sistema com Event Sourcing.

- Ao receber os itens do pedido, `startOrderFullfilment` recursivamente itera pelos itens do pedido e delega para funções que então recebem o item do pedido de um determinado e solicitam a um Service de Domínio para iniciar a entrega ou ativação do item. Aqui cabe mencionar que há uma grande falta de consenso sobre o que é um Domain Service, um Application Service, sobre onde cada coisa deve ficar, sobre o limite do domínio / serviços e por aí vai. No caso, como estamos programando em F#, não há grandes necessidades de formalizar e separar estes conceitos. Não é "errado" uma função de um domain model coordenar ou delegar trabalho para serviços auxiliares. Podemos ver claramente esta característica de delegação de atividades para outras partes do domínio ou serviços auxiliares. Quem lê o código consegue saber quais são as intenções originais do software, sem se desconcentrar em detalhes de implementação.

- O módulo `OrderItemProcessingModel` contém a maior parte da lógica. Contém types e functions que conseguem tratar cada caso de forma independente e mais segura:
	- Ao receber um item físico, o processo é simples e as funções criam um request, para solicitar ao serviço de delivery que se entregue os livros ou itens físicos com o shipping label adequado. 
	- Ao receber um item digital, o sistema exige que alguns passos sejam seguidos de acordo com o que foi vendido. Por isso, foi implementada uma ideia de workflow. O domínio sabe que certas ações precisam ser tomadas de forma sequencial:

			type DigitalDeliveryWorkflow = 
				| MembershipActivationAndEmail
				| EmailNotificationAndVoucher of voucherValue: decimal<BRL>
  

			let deliverDigitalItem deliveryRequest = 
				match deliveryRequest.deliveryWorkflow with
				| MembershipActivationAndEmail -> 
					printfn "starting workflow: membership activation and e-mail notification..."
					deliveryRequest
						|> requestMembershipActivation
						|> notifyUserViaEmail
						|> ignore
				| EmailNotificationAndVoucher voucherValue-> 
					printfn "starting workflow: e-mail notification and voucher generation..."
					deliveryRequest
						|> notifyUserViaEmail
						|> requestVoucherGeneration <| voucherValue
						|> ignore


- Foram criados 2 workflows,	sendo que o primeiro é um fluxo sem qualquer tipo de parâmetros e o segundo recebe como parâmetro o valor do voucher, que é usado na segunda etapa do workflow. Com uma implementação simplista, é possível deixar absolutamente clara a intenção do código. Esta clareza é aumentada ainda mais porque o F# possui um operador `|>`, que consegue encadear o resultado da chamada anterior aos parâmetros de entrada da próxima função, formando um pipeline de processamento. Ou seja, neste trecho vemos que o F# dá uma expressividade incrível ao desenvolvedor, pois podemos combinar o poder das discriminated unions, pattern matching e pipelines de processamento para criar combinações interessantes de regras de negócio que sejam fáceis de compreender e de manter. Os desenvolvedores devem imaginar o domínio como várias peças de Lego, que podem ser combinadas de diversas formas para resolver os problemas do negócio. O "ignore" no final serve só para dizer que a função retorna algo que pode ser descartado.


- Por fim, os serviços foram colocados de forma simples para ilustrar como seria o "efeito colateral", o "I/O", ou o resultado efetivo das ação do domínio.



### Possibilidades de melhoria

É claro que este é só um projeto cujo objetivo principal era mostrar como suportar regras que causam forças distintas no código. Mas este projeto, na vida real, não seria tão mais complicado. Eu iria pelos seguintes caminhos:

- Implementaria os principais módulos como serviços separados. A ingestão de ordens de serviço poderia se comunicar via mensagens com outras parte do domínio, como pagamento, estoque e etc. Na prática, estes microserviços poderiam se comunicar através de uma fila (Kafka ou RabbitMQ) _ou_ via requisições HTTP. Em geral, a comunicação entre serviços é feita via "telefonemas" (HTTP) ou "cartas" (message queues). 

- É claro que faz sentido incluir testes de unidade no projeto. Entretanto, a necessidade de testabilidade cai brutalmente quando se usa o sistema de tipos a seu próprio favor, porque o compilador consegue checar grande parte dos erros possíveis. Entretanto, ainda faz total sentido usar testes de unidade e além disso, em F# a comunidade utiliza muito o conceito de **property-based testing**, que serve para validar se certas propriedades são válidas _para qualquer conjunto de valores_. 

- As fronteiras do domínio devem ter seus próprios types, que normalmente são comandos formais, que solicitam ao domínio que reaja, mudando o estado da aplicação. Como já foi comentado antes, na vida real eu não passaria o objeto `Order` para `startOrderFullfilment` - o correto é usar algo como `StartOrderFullfimentCommand`, que então teria que ser validado, aceito e processado pelo serviço de processamento de ordens. A mesma abordagem vale a pena em outras fronteiras. Pode ser que a semântica do objeto mude ligeiramente conforme a situação - ao invés de comandos, podem ser usados requests nomes similares - mas o sentido básico é o mesmo: não usar o objeto de domínio como parâmetro de operações, para evitar fortes acoplamentos. 

- Indo neste sentido, investiria mais em modelar os estados conhecidos da aplicação. Uma grande vantagem do sistema de tipos que o F# oferece é que é possível se chegar ao design onde seja praticamente _impossível_ representar estados inválidos no sistema. É muito mais fácil criar um tipo `OrderDelivered` em F# do que em C#, e com esta conveniência, é possível representar uma máquina de estados recebendo comandos que levam a estados conhecidos de forma muito mais simples. Podemos falar em `DeliverOrderCommand -> PhysicalOrderDeliveryRequest -> OrderItemDelivered` para informar ao domínio que houve uma solicitação de entrega bem-sucedida para aquele item do pedido. Em C# ou Java isso também é possível, mas o custo de criar novos types é muito alto, o que desestimula os desenvolvedores a criar novas classes sem haver absoluta necessidade. 

- É claro que poderíamos ir ainda mais longe e usar algum Event Store para guardar os eventos gerados pelos comandos sendo executados. Esta técnica, chamada Event Sourcing, é utilizada pela vasta maioria das empresas que adotam o estilo de microserviços, como Jet.com e Nubank. Embora haja um esforço maior de desenvolvimento (sim, tudo muda - a consistência não é imediata, tudo se torna realmente assíncrono, etc), o mercado vem demonstrando que o esforço se paga. 

- Num cenário web, é possível capitalizar em cima desta arquitetura e usar Actor Model para lidar, concorrentemente, com os comandos que são recebidos. Tanto Scala como F# suportam o framework **Akka**, que utiliza o conceito de lightweight threading e supervisõa para criar verdadeiras árvores de processamento independentes e altamente escaláveis - é possível falar em atores rodando em máquinas remotas com a mesma facilidade de se rodar localmente. O uso de comandos e filas é amplamente favorecido por cenários assim - lidar com tipos imutáveis e isolados permite que seja possível capitalizar em cima do número de núcleos de processamento do servidor.

### Conclusão

Utilizar uma linguagem funcional fortemente tipada como F# ou Scala pode trazer reais benefícios para empresas que buscam uma flexibilidade ao projetar novos sistemas. Entretanto, esta forma de pensar é muito nova no mercado, que há está acostumado a lidar com todos os problemas da OO. Assim como houve o choque com a chegada de outros tipos de bancos de dados, a ida da programação funcional para o maintream tecnológico está acontecendo e cresce monotonicamente. 

O modelo DDD clássico é mais conhecido usando-se linguagens orientadas a objetos, mas pelo que podemos ver neste pequeno exercício, um código F# é brutalmente mais próximo da linguagem ubíqua e dos conceitos do domínio do que um código equivalente em Java ou C#. Além disso, certas abstrações como _herança_ e _objetos_ simplesmente não fazem sentido em grande parte dos domínios. E além disso, em muitos domínio, eu não preciso de uma _classe_. Muitas vezes uma função é tudo o que precisamos para fazer uma determinada tarefa. Esta liberdade aumenta brutalmente a proximidade do código com business. Podemos sentir isso claramente neste código, onde praticamente todas as funções fazem coisas que um analista citaria em uma conversa.

Por último, vale dizer que há domínios que também podem ser melhor resolvidos usando *linguagem funcional com tipagem dinâmica* como é o caso de Clojure. Ou seja, ainda há muitos outros caminhos para se resolver problemas simples ou complexos de negócio. Espero que esta pequena introdução ajude a mostrar ao time que existem outros caminhos interessantes fora do mundo orientado a objetos. 

