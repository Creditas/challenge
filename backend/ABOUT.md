## Desafio para Backend Software Engineer
### Explicação da solução

__A Solução__

* A solução foi baseada no design pattern strategy com ação definida no método apply para cada tipo de produto.
* Criação das classes Physical, Book, Digital e Membership herdando Product.
* O objeto Pipeline recebe todos os itens da ordem e executa a ação definida para cada um deles.

__Alterações em Bootstrap__
* Alteração na classe Payment para inclusão do preço total.
* Alteração na classe Order para inclusão da chamado do método da classe Pipeline responsável por realizar a ação para cada item.
* Alteração da classe Order para inclusão do método total_price responsável por calcular o valor total da compra.
* Alteração na classe OrderItem responsável por calcular o valor total do item considerando a quantidade e o imposto.
* Alteração na classe Customer para guardar os códigos promocionais concedido ao cliente.

__Contatos__
Nome: Rudolfo Borges
Email: oliveira.rudolfo@gmail.com
Telefone: 98535-0320
