## Solução do desafio

Para resolver o problema implementando o design utilizei as linguagem Ruby e Kotlin, pois acredito que podemos ver soluções para ambas linguagens.

Para resolver o problema de chamar várias implementações, pensei em utilizar o padrão Stratege (Usando Ruby fiz com progração dinamica), 
pois é um design pattner abto para tratar vários comportamentos utlizando a mesma assinatura de método.

# Kotlin:

Classes criadas:

ShippingPhysicalItem - usado para realizar o modelo de entraga para item físico
ShippingServiceSubscription - usado para realizar o modelo de entrega por assinatura
ShippingBook - usado para realizar o modelo de entrega por livro
ShippingDigitalMedia - usado para realizar o modelo de entra por mídia digital

Cada classe acima tem sua própria responsabilidade de tratar o processo de entrega e caso preciso alterar o incluir um novo item de entrega a única classe afetada é 
única classe que precisa alterar é a ShippingRules. Esta classe que é responsavel por orquestrar estas instancias e chamado pelo método deliver, vantagem de deixar o código extensivel e transparente para classe consumidora.


Criei também as classes Email, Voucher para serem reaproveitadas por cada modelo de entrega.

A classe GeneratorShippingLabel também é usada como um orquestradora assim eu desacoplo a chamada da implentação para class que for consumir a instancia do objeto.


Para este problema pensei no conceito de reaproveitamento de código e nos principios da responsabilidade única, principio do aberto e fechado e segragação de interface, além dos conceitos de oritentação objetos (reuso, polimorfismo).

# Ruby:

Para Ruby usei a mesma estrutura só que com alguns nomes pouco diferentes devido ser a primeira implentação.
Pensei nos mesmos conceitos utilizando em Kotlin.

Observação: Também criei classes de testes para as verificar a chamadas dos métodos.

# Tecnologias:

JVM versão Java 8 com Junit para testes.
Ruby versão 2.5 com Rspec para testes.

Não fiz em py por não ter conhecimento para desenvolver.
Grato a oportunidade
