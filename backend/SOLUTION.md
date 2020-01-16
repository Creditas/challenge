Creditas challenge
===================


Solução
-------------
Como essas foram minhas primeiras linhas de Ruby em muitos (mas muitos) anos, e apesar das boas recomendações de leituras, algumas boas práticas da linguagem podem ter sido maltratadas durante o processo ;) 

### Desenvolvimento e refactoring
Como parte do desafio sugeria a liberdade de refatorar o arquivo ```bootstrap.rb```, inicialmente alguns testes para garantir que não houvessem bugs/alterações de comportamento por conta dessas mudanças. 

* Para cada nova funcionalidade/refactoring, foi antes criada um teste, de modo a orientar o desenvolvimento pelos testes.
* O framework utilizado foi o [rspec](http://rspec.info/), pela facilidade em descrever os testes pelo comportamento
* A modelagem final foi fortemente influenciada pelo uso de [DDD e Onion Architecture](https://www.infoq.com/news/2014/10/ddd-onion-architecture), criando uma forte abstração entre lógica do domínio (Pedidos Online) e a infraestrutura (futuros banco de dados, provedor de emails, impressoras, etc...). Esse refactoring foi um tanto quanto desafiador pela mudança de paradigma, enquanto linguagens como ```Java``` ou ```Go``` existem interfaces para garantir os contratos entre abstrações, em ```Ruby``` esses contratos não existem, entretanto com a vantagem de existir bem menos código (duck typing god bless u). Para algo mais robusto e escalável, eu evoluíria os 3 subdomínios de Pedidos Online (Compra, Pagamento e Entrega) para algo independente entre sí e idealmente orientado a eventos (Ex: Entrega ouve um Pagamento para aí então iniciar o Envio)
* Para a obtenção dos dados acabei optando por utilizar o pattern de repository e removendo do model,  sei que isso sei a devida análise pode tornar o modelo "anêmico", mas também creio que, podemos identificar um novo objeto cuja função é armazenar/obter, por exemplo ```wallets.find``` ao invés de ```CreditCard.fetch_by_hashed```, ou seja separamos a responsabilidade de guardar meios de pagamento (```Wallets```) da de pagar (```CreditCard```). Estou completamente aberto para discussões sobre isso :)
* Dividi o ```bootstrap.rb``` em vários arquivos menores, tornando a visualização do grafo de dependencias mais fácil
* Eu poderia ter dividido o domínios em mais domínios (Orders, Payment, Shipping...), mas creio que haveria pouco ganho em relação a replicação de código para os ```bounded contexts```. 
* Houveram várias outras mudanças menores. Em geral foram coisas que ficariam semanticamente melhor, ou aplicar alguma "boa prática"

### Fluxo de pagamento
Para o pagamento optei por realmente fazer algo simples:

* Uma vez que possuo um Pedido (```Order```) , eu posso gerar a Fatura (```Invoice```) desse  Pedido.
* Um Meio de Pagamento paga essa Fatura (```credit_card.pay(invoice))```)

### Fluxo de entregas
Para as entregas de diferentes categorias, criei uma Central de Distribuição (```DistributionHub```) que tem a função de expedir o pedido para uma transportadora expecialidada em cada categoria (```*Carrier```).
* A Implementação da Central de Distribuição é um Strategy simples, que direciona para a transportadora correta.
* A implementação das transportadoras podem ser divididos em itens físicos (Físicos e Livros) e digitais (Digitais e Assinaturas). Eu poderia ter utilizado herança/modulos entre eles, mas honestamente achei o ganho muito baixo pelo acoplamento que poderia gerar em um futuro.
* Utilizei o OrderItem como elemento básico da order, possibilitando a entrega de categorias diferentes para o mesmo pedido (ex. Livros e Assinatura no mesmo pedido)

[]'s  
Arthur  
[Github](https://github.com/arthurpessoa) - [LinkedIn](https://www.linkedin.com/in/arthur-pessoa-84596933/)
