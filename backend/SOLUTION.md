### Teste Creditas - Backend

- Comecei criando testes básicos para as classes existentes.
- Na classe `Order` criei o método `deliver()` que, quando chamado, executa os métodos responsáveis (dentro de `Ship`) pelo envio de cada tipo de produto.
- A classe `Ship` contém um método para cada tipo de envio. Esses métodos são responsáveis por chamar os respectivos métodos de envio de email e impressão do `Shipping label`
- Também criei a class `Voucher` que representa os cupons de desconto que são atribuídos ao usuário da compra a cada envio de produtos digitais.
