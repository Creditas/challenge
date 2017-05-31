## Desafio para Backend Software Engineer 

Decidi seguir pelo caminho mais simples e implementei a classe de pagamento e os métodos necessários para satisfazer a orientação do desafio, sem levar em consideração que há ainda varias outras classes, como por exemplo a do consumidor, que poderia ser implementada separadamente, e varios outros métodos como os próprios declarados no bootstrap.rb. 

__Os métodos__

Os métodos foram criados levando em consideração os requisitos solicitados. `Physical()` para itens físicos, `Service()` para assinatura de serviços, `book()` para livros e `Digital()` para produtos digitais.

Também criei métodos auxiliares para guardar funções especificas, dado como, `generate_shipping_label()` para gerar a etiqueta e `sent_email()` para enviar emails. 

__Chamada dos Métodos__

Decidi por um loop simples de if para validar o tipo do produto, chamado seu determinado método, assim, se houver necessidade de alteração, será alterado os métodos, e não será necessário alterar os loops.

__Arquivos__

Optei por criar meus próprios arquivos separados para facilitar e deixar os arquivos do projeto intactos.