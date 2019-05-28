## Nova versão do fluxo de pagamento / regras de envio

Para resolver o problema de flagilidade e complixade do fluxo atual, adotei o padrão de projeto 
**Factory** para diminuir o acoplamento e a eliminar a necessidade do roteamento através de **ifs em cadeia/ switchs** e cada uma das implementações, saiba processar suas regras isoladamente.

__OrderShippingProcessor__

Cada nova regra de envio precisa implementar duas funções/métodos:
* **supports():Boolean**: método que retorna qual tipo de produto esse
esse processador suporta.
* **process()**: método que executa as regras específicas para aquele produto.


```kotlin
public class Hello1 
{ public static void Main() 
{ System.Console.WriteLine("Hello, World!"); } }

```
