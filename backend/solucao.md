Correções:

Método `total_amount` fazia referencia a uma variável inexistente

Na classe Order o parâmetro `attributes` deixou de ser mutável e passou a ser imutável garantindo que não hajam modificações deste elemento dentro da classe Order

Foram criadas classes que herdam de Produto
 - Book
 - Membership (atributos adicionados)

`Embora essas situações (Digital e Physical) pudessem ser representadas apenas como Product usando o atributo 'type' usei uma classe para facilitar a sepração da lógica de negócio pertecente a cada domínio específico.`
 - Digital para produtos digitais
 - Physical para produtos físicos
 
 Para evitar os `ifs/elses e switch/case` preferi utilizar o pattern `Strategy`, passando a função de cada serviço em específico como parâmetro, serviços estes criados com base em uma classe abstrata **AbstractProductService** que obriga que cada serviço implemente sua própria lógica.
 Dessa maneira ao chamar o serviço `SellService` não necessitamos conhecer o tipo/instância da classe produto para saber que tipo de procedimento adotar, pois o serviço sabe o que fazer. Sendo assim bastamos chamar o método `ship` que chamará o ShipService que fará o envio do produto 
 

  
 
 