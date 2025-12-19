# Alterações e Melhorias de Código:

## As alterações no código visam aplicar um Design Orientado a Objetos e Princípios de Programação Orientada a Objetos, respeitando também as normas do SOLID para uma arquitetura limpa, flexível, escalável e de fácil manutenção!

### 1. Separar as Responsábilidades

O código inicial estava concentrado em uma única estrutura com os serviços dentro de metodos, como por exemplo, o metodo *pay* da classe *Order* que tinham diversas verificações, como tipo de produto, serviço de pagamento entre outros. 

Para separar as responsábilidades, foram adicionadas interfaces para:

* PaymentStrategy; 
* ShippingStrategy; 
* ReceiptSender;
* DiscountVoucherApplier;
* PaymentMethod

Essas interfaces são contratos que as classes que as implementarem seguirão, permitindo que cada forma de pagamento seja implementada em sua respectiva classe sem precisar modificar código para isso!
Para os serviços de pagamento e envios, foram criadas classes estrategicas que executam essas funções:

* DigitalProductPayment;
* PhysicalProductShipping;
* BookShipping;
* DigitalDiscountVoucherApplier;
* DigitalReceiptSender;
* MembershipActivationShipping;
* PhysicalProductShipping;
* NoShipping;

Essas classes, implementam as interfaces deixando o código mais dinamico e de fácil manutenção.

### 2. Composição de Herança

No código original a logica era embutida dentro das classes, então passamos a usar o princípio de composição de herança.

Colocamos a classe *OrderProcessor* para organizar os pagamentos e enviar para as estrategias específicas de cada produto.

Com isso, novas estrategias podem ser adicionadas sem alterar a classe *OrderProcessor*, facilitando a escalação do código e reduzindo o acoplamento, uma vez que as lógicas de pagamento e envio ficam sendo gerenciadas pelas estratégias. 

### 3. Separação de Lógicas Específicas

Aplicando a responsábilidade única, criamos classes específicas para cada lógica (envio e pagamento de produtos físicos, digitais, livros e assinaturas), assim cada classe tem responsábilidade apenas com o seu serviço para o seu tipo de produto específico.

Caso futuramente existam alterações nas lógicas específicas de algum tipo de produto, poderá ser implementada sem impactar nas outras classes do projeto.

### 4. Metodos e Funcionalidades

No código original, os serviços estavam sendo feitos diretamente na classe de pagamento, então foram criadas interfaces adicionais:

* ReceiptSender;
* DigitalDiscountVoucherApplier;

Elas definem os acordos que serão implementados nessas operações, ambas foram implementadas na classe  *DigitalProductPayment* para realizar essa tarefa de enviar a descrição da compra para o email do cliente e conceder o voucher de desconto.

Diferentes implementações de envio de recibos e aplicação de vouchers poderão ser usadas sem alterar a lógica de pagamento além de permitir que cada classe tenha apenas uma tarefa específica.

#### Dentre as implementações realizadas, considero importante ressaltar o *"Open Closed Principle"* deixando todas as classes prontas e abertas para futuras implementações e melhorias mas fechadas para modificações.

#### Estão sinalizados também os metodos onde as implementações de serviços como envio de e-mails, imprimir o shipping label, etc, devem ser feitas!

