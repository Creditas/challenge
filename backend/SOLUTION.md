## Solução
Para a solução do desafio, foram criadas as seguintes classes e métodos:

### Delivery
A classe `Delivery` é responsável em realizar a entrega de todos os items de uma `Order`.
Objetos da classe `Delivery` são inicializados recebendo um objeto do tipo `Order`.

#### deliver
O método de instância `deliver` da classe `Delivery`, executa o método `deliver` para
cada item de um objeto `Order` utilizado na sua inicialização.

### Product
A classe `Product` foi utilizada como uma super classe para outras sub-classes
(`Physical`, `Book`, `Digital` e `Membership`).

#### typed_product
O método de instância `typed_product` inicializa uma nova instância de uma
sub-classe de `Product` de acordo com o atributo `type`. Pode ser inicializado um
objeto do tipo `Pysical`, `Book`, `Digital` ou `Membership`. Caso nenhum desses tipos
seja definido (ou nenhum), o resultado retornado é `self`.

#### deliver
O método de instância `deliver` é responsável em realizar a entrega do produto.
Para a super classe `Product`, este método simplesmente executa o método `deliver`
utilizando uma instância de `Pysical`, `Book`, `Digital` ou `Membership`,
de acordo com o método `typed_product`. O método `deliver` recebe um objeto
`Order` como parâmetro.

### Physical, Book, Digital, Membership
As classes `Pysical`, `Book`, `Digital` e `Membership` foram definidas como
subtipos da classe `Product`, visto que cada tipo de produto carrega uma regra
específica de entrega (`deliver`). A classe `Book` foi definida como um subtipo
da class `Physical`, visto que sua regra de negócios é essencialmente a mesma,
com uma pequena mudança no seu método `print_shipping_label`. As regras
específicas para cada sub-classe de `Product` não serão descritas pois não foram
implementadas de fato.

#### deliver
O método deliver de cada uma das classes `Pysical`, `Book`, `Digital` e `Membership`
executa o procedimento de entrega para o seu tipo de produto. O método `deliver`
recebe um objeto `Order` como parâmetro.


### Customer
A classe `Customer` foi alterada para ser iniciada com o atributo `email`, para
possibilitar o envio de notificações de e-mail para entrega de produtos do tipo
`Digital` e `Membership`.

### Payment
A classe `Payment` foi alterada para definir o valor de `self` ao atributo `payment`
do objeto `Order` definido em sua inicialização, afim de permitir que seja
utilizado o objeto `Payment` em questão na criação do voucher de desconto no
método `create_voucher` no objeto `Digital`.
