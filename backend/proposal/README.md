# Solução Proposta

## Estrutura da Solução

Foram mantidos os arquivos originais e criado uma pasta "proposal" onde este README está contido.

Dentro da pasta **src** encontram-se as classes e na pasta **src/tests** os testes desenvolvidos.

## Sobre o Processo de Gerar a Solução

Primeiramente, as classes contidas no arquivo bootstrap.py foram distribuídas em arquivos independentes. O objetivo aqui é organizar o código em módulos e facilitar a criação de testes.

O passo seguinte, foi a criação de testes unitários para cada uma das classes do projeto. Testes ajudam tanto na garantia do funcionamento do código, como facilitar o entendimento e o uso das partes do projeto.

Familiar com as classes do projeto, relembrando onde a solução atuará, teremos para cada tipo de Produto:

* Item Físico: Gerar um Shipping Label para o mesmo ser colocado na caixa do envio
* Assinatura: Ativar assinatura e notificar o usuário através de email
* Livro Comum: Gerar um Shipping Label com uma notificação de que trata-se de um item isento de impostos
* Mídia Digital: Enviar a descrição da compra por e-mail ao comprador e conceder um voucher de desconto de 10 reais ao comprador associado ao pagamento

Logo, teremos modificações no **final do Pagamento** dependendo do **tipo de Produto** que estamos tratando.

## Solução

No código original já tínhamos a `Order` recebendo um `order_item_class`.

Irei aproveitar essa implementação para possibilitar múltiplos `OrderItems`, ou seja, classes que herdam `OrderItem` mas que implementam uma funcionalidade particular a mais.

Essas classes irão implementar uma função chamada `dispatch`, que lidará com o tipo de produto que ele carrega.

Seguindo os princípios do TDD, primeiro foram criadas os testes e as classes vazias. As classes criadas e os testes desenvolvidos foram os seguintes:

* **OrderItemPhysical:** Responsável por lidar com produtos físicos
    * Foi testado se `generate_shipping_label` foi chamada apenas uma vez ao chamar `dispatch`
* **OrderItemMembership:** Responsável por lidar com assinaturas
    * Foi testado se uma `Membership` foi criada dentro do `OrderItemMembership` e está ativada
* **OrderItemBook:** Responsável por lidar com livros comuns
    * Foi testado se a função `generate_shipping_label` foi chamada apenas uma vez passando um argumento "Duty Free" (apenas para representar que seria livre de impostos)
* **OrderItemDigital:** Responsável por lidar com produtos digitais
    ** Foi testado se o objeto para enviar email foi chamado e se um Voucher foi criado

Para envio do email foi criado a classe `SendEmail` dentro da pasta `services`. Este é um callable object, fortemente inspirado no artigo [Enforcing Single Responsibility Principle in Python](https://sobolevn.me/2019/03/enforcing-srp). Não foi implementado o envio do email por fugir do escopo do desafio (pelo mesmo motivo não foi criado um teste para esta classe).

A definição de qual OrderItem será utilizado ficou a cargo da `Order`.

Primeiramente, foi criado um teste que valida se os `OrderItems` corretos estão sendo criados quando se adiciona um produto.

```python
def test_order_item_types(self):
    # Creating products of all types
    productBook = Product("Book", Product.BOOK)
    productDigital = Product("Digital", Product.DIGITAL)
    productMembership = Product("Membership", Product.MEMBERSHIP)
    productPhysical = Product("Physical", Product.PHYSICAL)
    order = Order(Customer("test@test.com"))
    # Adding procuts to order
    order.add_product(productBook)
    order.add_product(productDigital)
    order.add_product(productMembership)
    order.add_product(productPhysical)
    # Checking OrderItems
    self.assertIsInstance(order.items[0], OrderItemBook)
    self.assertIsInstance(order.items[1], OrderItemDigital)
    self.assertIsInstance(order.items[2], OrderItemMembership)
    self.assertIsInstance(order.items[3], OrderItemPhysical)
```

Em `Order` foi criado uma função responsável por decidir qual `OrderItem` será utilizado, funcionando de forma muito parecida ao **factory method pattern**. Não vi necessidade da criação de uma Factory só para isso, já que existe uma ligação intrínseca entre `Order` e `OrderItem`, então me pareceu razoável a `Order` ser responsável por isso.

```python
def __get_order_item_class(self, product):
    if product.type == Product.BOOK:
        return OrderItemBook
    elif product.type == Product.DIGITAL:
        return OrderItemDigital
    elif product.type == Product.MEMBERSHIP:
        return OrderItemMembership
    elif product.type == Product.PHYSICAL:
        return OrderItemPhysical
    # Invalid type
    return None
```

Para garantir que para cada `Product` teremos um `OrderItem` diferente, foi adicionado em `add_product` essa decisão.

```python
def add_product(self, product):
    order_item_class = self.__get_order_item_class(product)
    self.items.append(order_item_class(order=self, product=product))
```

Como cada classe que herda de `OrderItem` possui a função `dispatch`, essa função é chamada quando a `Order` vai ser fechada.

```python
def close(self, closed_at=time.time()):
    # Dispatching for each OrderItem
    for item in self.items:
        item.dispatch()
    # Closing
    self.closed_at = closed_at
```

## Modificações nas classes já existentes

A classe `Membership` recebeu uma nova função que ativa uma assinatura. Não foi criada uma função para desativar a assinatura para não fugir do escopo deste desafio.

```python
class Membership:
    customer = None
    activated_at = None

    def __init__(self, customer):
        self.customer = customer

    def activate(self, activated_at=time.time()):
        self.activated_at = activated_at
```

A classe `Customer` foi implementada com o campo de email. Não foram adicionados novos campos pois não havia detalhes de quais campos poderiam existir.

```python
class Customer:
    email = None

    def __init__(self, email):
        self.email = email
```

Para o `Product`, para garantir que sempre iremos passar um tipo correto, foi adicionado uma verificação no construtor. Também foi adicionado um teste que verifica se a função emite um erro caso passe um tipo inválido.

```python
# Checking if type is valid
if type in self.AVAILABLE_TYPES:
    self.type = type
else:
    # Throwing error
    raise ValueError("Invalid type of product")
```

## Como executar os testes

Existe um script na raíz da pasta `proposal` que executa todos os testes unitários.

```bash
./run-tests.sh
```
