# Creditas challenge


Utilizando da orientação a objeto e funçāo factory foi possivel simplificar o código para realizar uma compra, delegando responsabilidades específica para cada classe, dessa forma existe um flow único de compra, independente do tipo de produto. Realizei o refactory ignorando implementações que integram com microserviços como o pagamento e o shipping cost, tendo em vista que eu poderia mudar tudo quebrei a API não tendo compatibilidade com a antiga.

Criei uma classe base chamada DataModel responsável por realizar o CRUD, já a Notifier é responsável por agregar as informações de cada produto e imprimir a shipping label e mandar o email se necessário. No fluxo de compra que elaborei não é feita a ativação da conta do usuário automaticamente dando a possibilidade de realizar o cancelamento após a compra e efetuar o reembolso do valor do serviço premium.

Como orientado respeitei o tempo para realizar o desafio não implementando os testes :( e o projeto por completo.

Para realizar uma compra é bem simples:

````
from customer import Customer
from payment import Payment, CARD


customer = Customer('customer-id')
order = customer.get_order(products=['product-id-1', 'product-id-2', 'product-id-3'])
Payment.create({'order': order}).pay(CARD)
````