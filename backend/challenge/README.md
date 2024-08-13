## Desafio para Backend Software Engineer

### Solução

A solução proposta para o processamento de Pedidos Online foi estruturada utilizando padrões de projeto e boas práticas de programação para melhorar a organização e manutenção do código.

#### Refatoração e Melhoria de Código

1. **Refatoração do `bootstrap.kt`**:
    - **Princípio da Responsabilidade Única**: O código foi reorganizado em classes e interfaces com responsabilidades únicas, alinhando-se ao Princípio da Responsabilidade Única (Single Responsibility Principle).

2. **Ajustes na Classe `Order`**:
    - **Extração de Validações**: As validações nas funções `addProduct` e `payOrder` foram extraídas para classes de validador dedicadas, eliminando o uso de estruturas condicionais (`if`/`else`).
    - **Validações com Interface**: Foram criadas interfaces para garantir o contrato das validações, como `AlreadyPaidValidator` e `EmptyOrderValidator`.

3. **Implementação de Estratégias de Processamento de Pagamento**:
    - **Interface `PaymentProcessor`**: Define o contrato para as estratégias de processamento de pagamento.
    - **Classes de Estratégia**:
        - **`PhysicalItemStrategy`**: Gera uma etiqueta de envio para produtos físicos.
        - **`MembershipStrategy`**: Ativa assinaturas e notifica o usuário por e-mail.
        - **`BookItemStrategy`**: Gera uma etiqueta de envio com notificação de isenção de impostos para livros.
        - **`DigitalMediaItemStrategy`**: Envia um e-mail com a descrição da compra e concede um voucher de desconto para mídias digitais.
    - **Padrão Factory**: Utilizado para criar o processador de pagamento apropriado na classe `Order`, com base no tipo de produto.

4. **Testes**:
    - **Testes na Classe `Order`**: Foram implementados testes para garantir que a classe `Order` funcione corretamente com as novas implementações.
    - **Cobertura**: Com os testes criados, chegou a uma cobertura de 100% nos dominios, garantindo 59% de linhas cobertas
    - **Observação**: Embora os testes existentes cubram alguns casos, seria benéfico adicionar mais testes para garantir uma cobertura completa e robustez adicional.

#### Observações Finais

- **Uso de DDD (Domain-Driven Design)**: Considerou-se a separação das regras de negócio do domínio para uma melhor organização e escalabilidade do sistema.
- **Possibilidade de Expansão**: O código está estruturado para facilitar a adição de novas regras e estratégias sem impacto significativo no código existente.