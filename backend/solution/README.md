# Principais pontos de modificação/implementação

*O código está no arquivo `Solution.cs` e os testes no `Tests.cs`.

## Order
Alterei a hierarquia das classes Payment e Order. No meu design a Order possui um Payment, e não o contrário. Fiz isso pois me pareceu fazer mais sentido a Order orquestrar seu fluxo de vida desde a criação até o fechamento. 

São basicamente 4 passos:
1. Construção 
2. Pagamento
3. Entrega dos produtos
4. Fechamento da Order

Sendo os 3 últimos uma operação atômica.

## Payment
A classe Payment do exemplo possuía um construtor e um método Pay. Mas isso fazia com que tivesse um gap onde o pagamento existisse sem estar realmente pago (só era pago após a chamada ao método Pay).

O ajuste que fiz nessa classe foi juntar tudo numa única operação (tudo ficou no construtor).

## OrderItem

#### Decisão de armazenar o ShippingLabel

O enunciado não deixou muito claro o que exatamente seria "gerar um shipping label", se seria apenas fazer uma chamada para uma impressora ou se também seria necessário armazenar essa informação na classe. 

Na minha interpretação, e até pra não ficar com o sentimento de que "roubei" (indo pelo caminho mais fácil), julguei que faria sentido armazenar a informação do `ShippingLabel` e decidi criar um atributo pra isso (*não se preocupem, numa situação real do dia a dia eu não tomaria essa decisão por conta própria sem questionar um especialista de negócio :P*).

Se não fosse armazenr o shipping label simplificaria a solução em alguns pontos, como nos ProductTypes "Physical" e "Book" nos quais passariam a apenas disparar um Domain Event para impressão (na solução atual, onde armazeno os shipping labels, tive que percorrer a lista de itens pra encontrar o item corrente e então setar o ShippingLabel... não ficou muito bacana). 

Além disso, decidi colocar o shipping label na classe OrderItem, pois como cada produto tem uma regra de envio diferente provavelmente um livro não poderia ser postado junto com um item físico comum (já que um é isento de impostos e o outro não).

## ProductType - O core da solução

Coloquei as especificidades do processamento de cada tipo de produto aqui. Inicialmente tinha pensado em aplicar essa lógica de herança diretamente nos produtos (PhysicalProduct, BookProduct, etc, que herdariam de Product), mas depois cheguei na conclusão de que seria melhor o produto ao invés de "ser" na verdade "possuir" um tipo (*composition over inheritance*). Dessa maneira a flexibilidade seria maior, pois com uma simples mudança seria possível fazer um produto ter múltiplos tipos, por exemplo. Se a herança ficasse direto no produto isso não seria possível.

## Domain Events
Talvez um exagero para essa solução. Entretanto criei os eventos de domínio apenas para deixar explícito o desacoplamento entre as regras de negócio e as dependências de infraestrutura. Dessa maneira os eventos `PhysicalProductPurchased`, `MembershipProductPurchased` e `DigitalProductPurchased` seriam tratados por event handlers nos quais possuiriam acesso a dependências de infraestrutura como: envio de emails, ativação de produtos, etc.

Side effects de cada evento (não implementados):
* `PhysicalProductPurchased`: Imprimir shipping label
* `MembershipProductPurchased`: Ativar a assinatura do produto e em seguida notificar o usuário
* `DigitalProductPurchased`: Enviar a descrição da compra por e-mail 

O esboço de Domain Event que criei é baseado [nessa implementação](http://udidahan.com/2009/06/14/domain-events-salvation/). 

## Exceptions

Por simplicidade utilizei exceptions em alguns pontos pra evidenciar validações importantes. Entretanto com um melhor design de código, [Notification Pattern](https://martinfowler.com/articles/replaceThrowWithNotification.html) por exemplo, elas poderiam ser evitadas e as validações mantidas de maneira clara.  

# Considerações Finais

Admito que a minha solução foi consideravelmente induzida pela frase "a versão atual é frágil, encadeada em if/else, switch/case". Tentei evitar ifs e switches na lógica de delivery. Entretanto, tenho minhas dúvidas se não seria mais simples uma versão com um switch em que direcionaria o tratamento para algo como um "PhysicalDeliveryService", "BookDeliveryService", etc. Algo como isso:

```csharp
class Order
{
    //...

    private void Deliver()
    {
        if (Payment.PaidAt == null)
            throw new InvalidOperationException("Order not paid!");

        foreach (var item in Items)
        {
            switch (item.Product.Type)
            {
                case ProductType.Physical:
                    PhysicalDeliveryService.Deliver(item.Product, Customer);
                    break;
                case ProductType.Book:
                    BookDeliveryService.Deliver(item.Product, Customer);
                    break;
                //...
            }
        }
        
        Close();
    }
}  
```

Nesse caso o ProductType poderia ser um simples enumerador. O que me incomoda na inteligência de delivery ter ficado no ProductType é que todos os product types (Physical, Book, etc) implementam o método abstrato `ShippingRules(Order order, Product product)`. Mas e se um dia esses parâmertos não fossem o suficiente? Se precisássemos adicionar um novo parâmetro nesse método pra atender a especificade de um único tipo de produto? Nesse caso teríamos que adicionar o novo parâmetro em TODOS os tipos derivados, mesmo que eles não precisassem. Na solução acima (switches) apenas o respectivo DeliveryService afetado precisaria da nova propriedade, porém a fraqueza dessa implementação é que ela não deixa explícito que ao criar um novo tipo é necessário implementar suas regras de delivey. 

Esse requisito renderia um ótimo pair programming :)

Enfim, adorei fazer o desafio. Apesar dele ser simples, foi interessante tentar esmiuçar a inteligência e simplicidade da solução. Espero que gostem. Se vocês tiverem alguma solução mais elegante (o que é bem provavel) eu ficaria contente em saber. Agradeço qualquer feedback relacionado ao desafio e peço desculpas pelo readme extenso.

Abraço!