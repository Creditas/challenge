## Solução do Creditas Challenge - Backend
## Marcela Porto

Primeiramente, obrigada pela oportunidade! O desafio tem aspectos muito interessantes, e foi divertido resolvê-lo. Segue abaixo algumas decisões de design que achei relevante explicar, e um pouco do meu processo lógico ao resolver o problema.  

1. Separação das classes por responsabilidade
Em primeiro lugar, gosto de separar um arquivo para cada classe, assim fica mais claro para mim a responsabilidade e interação entre elas. Algumas classes menores, como `CreditCard` e `Address`, eu anexei a classes onde esses attributes eram relevantes (nesse caso, na classe `Order`).

2. Escrever testes para código já em funcionamento
Depois, me certifiquei de que os aspectos mais relevantes das classes já definidas não seriam modificados quando eu adicionasse código ou *refactored*. Sendo assim, escrevi alguns testes simples que expressavam o comportamento de cada classe.
Algumas decisões de design:
- Antes de cada tests, escrever `before(:each)`. Dada a quantidade de classes, ficou repetitivo; porém o uso de `before(:all)` não é recomendado, por problemas de escopo(quando se tornam muitos testes e muitas variáveis, fica difícil encontrar onde a variável foi declarada inicialmente e o escopo de cada uma - como variáveis globais).
- Escrevi alguns testes um pouco mais "complexos", que garantiriam que os testes não iriam passar por pura sorte, como uso do `Enumerable#all` no teste de Shipping details (ao invés de `Array#sample`, por exemplo), ou do teste em `Invoice`, que garante a presença não só do `Address`, ms somente a presença do mesmo no array.

3. Fazer uso de Polymorphism e classes por tipo de produto para distinguir diferentes preferências de shipping
Agora que o código apresentado estava um pouco mais claro a meu ver, comecei a resolver o problema dos shipping details por tipo de produto. Para evitar condicionais encadeadas e garantir que o código tem "espaço" para expandir sem grandes modificações no código já escritp, fiz uso de polymorphism.

Um pouco de como funciona: Quando você paga por um `order`, o método `Payment#pay` chama o método `Payment#ship_order`, que inicia uma instância da classe `ShippingDetails`, com o param `@order`.

Dentro da class `ShippingDetails`, escrevi um método(`ShippingDetails#ship`) que reconhece cada tipo de produto em um `Order`. Iterei(`#each`) o array com todos os produtos do `Order`, e fiz uso de `#const_get` para encontrar a constante(classe) referente a aquele tipo de produto. Em seguida, `ShippingDetails#ship` chama o método `#shipping` no mesmo. Nesse caso, também escrevi classes para cada tipo de produto, onde todos tinham o mesmo método, `self.shipping`, mas diferentes instruções.

Cada método `#shipping` faz o que precisa fazer, mas retorna um string com o status (se "shippar" foi bem sucedido ou não). Assim, podemos ter acesso do status facilmente, em um array de strings.

4. Adicionar métodos específicos para shipping em um módulo, para gerar um código bem sucinto
Reconheci que algumas instruções estavam ficando repetitivas, então para garantir que meu código estava DRY, criei um módulo `ShippingHelpers`, com os métodos mais utilizados (`#generate_shipping_label`, `#send_email`, e alguns métodos em formato `boolean`). Também adicionei os métodos de assinatura, para uso futuro em outras classes, se necessário.

5. Refactor e escrever esqueleto dos testes para as classes novas
