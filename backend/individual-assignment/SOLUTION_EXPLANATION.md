# Explicação da Solução

## Descrição do Desafio

O objetivo deste desafio foi refatorar um fluxo de processamento de pagamentos de forma a melhorar a estrutura de código e torná-lo mais flexível e manutenível. O sistema deve lidar com diferentes tipos de pagamentos, cada um com regras específicas para o processamento.

## Estrutura do Código

O código foi dividido em várias classes e estratégias que seguem o padrão de Projeto Strategy. Cada tipo de pagamento (item físico, assinatura, livro, mídia digital) é tratado por uma estratégia diferente:

- **PaymentStrategy**: Interface abstrata que define o método `process_payment`, que deve ser implementado por cada estratégia de pagamento.
  
- **PhysicalItemPaymentStrategy**: Estratégia para o pagamento de itens físicos. Gera uma etiqueta de envio.

- **BookPaymentStrategy**: Estratégia para o pagamento de livros. Gera uma etiqueta de envio com uma notificação de isenção de impostos.

- **DigitalMediaPaymentStrategy**: Estratégia para o pagamento de mídias digitais. Envia um email ao comprador e concede um voucher de desconto.

- **MembershipPaymentStrategy**: Estratégia para o pagamento de assinaturas. Ativa a assinatura e envia um email de ativação.

### Classes Principais

- **Payment**: Classe principal que gerencia o processo de pagamento. Utiliza uma estratégia para processar o pagamento conforme o tipo de produto. Contém métodos para gerar etiquetas de envio, enviar emails e conceder vouchers.

- **Order**: Representa um pedido feito por um cliente, contendo os produtos e o endereço de entrega.

- **Product**: Classe que representa um produto, incluindo seu nome e tipo.

- **Customer**: Classe que representa um cliente.

- **Invoice**: Classe que representa uma fatura associada ao pagamento.

### Testes

Foram implementados testes para cada um dos quatro casos de pagamento, garantindo que a lógica de processamento funcione corretamente:

1. **Pagamento de Item Físico**: Verifica se a etiqueta de envio é gerada.
  
2. **Pagamento de Assinatura**: Verifica se a assinatura é ativada e se um email é enviado.

3. **Pagamento de Livro**: Verifica se a etiqueta de envio é gerada com a notificação de isenção de impostos.

4. **Pagamento de Mídia Digital**: Verifica se um email é enviado e se um voucher de desconto é concedido.

### Conclusão

A solução implementada melhora a modularidade e a clareza do código, tornando-o mais fácil de manter e expandir no futuro. Cada tipo de pagamento tem sua lógica encapsulada, permitindo a adição de novos tipos de pagamento sem impactar as implementações existentes.
