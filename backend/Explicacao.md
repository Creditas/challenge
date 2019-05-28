## Nova versão do fluxo de pagamento / regras de envio

Para resolver o problema de flagilidade e complixade do fluxo atual, adotei o padrão de projeto 
**Factory** para diminuir o acoplamento e a eliminar a necessidade do roteamento através de **ifs em cadeia/ switchs** e cada uma das implementações, saiba processar suas regras isoladamente.

__OrderShippingProcessor__

Cada nova regra de envio precisa implementar duas funções/métodos:
* **supports():Boolean**: método que retorna qual tipo de produto esse
esse processador suporta.
* **process()**: método que executa as regras específicas para aquele produto.


```kotlin




class BookItemProcessor : ShippingOrderProcessor{

    override fun supports(order: OrderItem): Boolean {
        return ProductType.BOOK == order?.product?.type
    }

    override fun process(customer: Customer, order: OrderItem) {
        createShippingLabel(order)
    }

    fun createShippingLabel(item: OrderItem) {
        println("Creating shipping label: $item [isento de impostos conforme disposto na Constituição Art. 150, VI, d]")
    }

}


```

**__ShippingOrderProcessorFactory**

 recebe uma lista de processadores e no método build, intera a lista chamando
o método **supports** de cada processador. O método build retorna o  primeiro processador a retornar
**true**. Caso nenhum processador suporte o item recebido, ele lança uma exception.
