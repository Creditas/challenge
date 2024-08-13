# Desafio para Backend Software Engineer

## Descrição do Problema

Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que recebem tratamentos a depender as situações específicas de cada um como segue:

- Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
- Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
- Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
- Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

## Sobre o Processo de Gerar a Solução

O desafio consistia em redesenhar o fluxo de pagamento/regras de envio para facilitar a manutenção e a adição de novas regras.
Então, as classes contidas no arquivo bootstrap.kt foram distribuídas em arquivos independentes. O objetivo aqui é organizar o código e facilitar a criação de testes.
O passo seguinte é estruturar em algum padrão de projeto que ajudasse nos principais pontos de dor, conforme anotados a seguir:

1. **PhysicalProduct (Produto Físico)**: Gerar uma etiqueta de envio para o produto.
2. **Membership (Assinatura de Serviço)**: Ativar a assinatura e notificar o usuário por e-mail.
3. **Book (Livro)**: Gerar uma etiqueta de envio com uma notificação de isenção de impostos conforme a Constituição Art. 150, VI, d.
4. **DigitalMedia (Mídia Digital) (música, vídeo)**: Enviar um e-mail com a descrição da compra e conceder um voucher de desconto de R$ 10 ao comprador.


### Padrão de Projeto Utilizado: Strategy

Para evitar a complexidade e a manutenção difícil associada ao uso de estruturas condicionais (`if/else`, `switch/case`), a solução proposta utiliza o padrão de projeto *Strategy*. 
Esse padrão permite encapsular as regras de processamento de pagamento em classes distintas, facilitando a extensão e a modificação do sistema.

### Estrutura de Classes

- **Interface `PaymentProcessingStrategy`**: Define o contrato para as estratégias de processamento de pagamento.
- **Classes de Estratégia**:
    - `PhysicalProductPaymentProcessing`: Processa o pagamento de produtos físicos.
    - `MembershipPaymentProcessing`: Processa o pagamento de assinaturas de serviço.
    - `BookPaymentProcessing`: Processa o pagamento de livros com notificação de isenção de impostos.
    - `DigitalMediaPaymentProcessing`: Processa o pagamento de mídias digitais, enviando um e-mail e gerando um voucher de desconto.

- **Classe `Order`**: Gerencia o pedido e delega o processamento de pagamento à estratégia apropriada.

### Benefícios da Solução

- **Manutenibilidade**: Novos tipos de produtos e regras de pagamento podem ser adicionados sem modificar o código existente.
- **Extensibilidade**: Seguindo o princípio do *Open/Closed*, a solução permite fácil extensão.
- **Separação de Responsabilidades**: Cada estratégia tem responsabilidade única e bem definida.

### Estrutura do Projeto

A estrutura do projeto segue as convenções comuns para projetos em Kotlin, com diretórios separados para o código principal e os testes. As classes de modelo e as estratégias estão organizadas em pacotes distintos para facilitar a navegação e manutenção do código.

```plaintext
/src
│
├── /main
│   ├── /kotlin
│   │   └── /challenge
│   │       ├── /strategies
│   │       ├── /models
│   │       └── Main.kt
│   └── /resources
│
└── /test
    └── /kotlin
        └── /challenge
            ├── /strategies
            ├── /models
            └── MainTest.kt
