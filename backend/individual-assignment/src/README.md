# Desafio Creditas
## Pontos de consideração
- Design Patterns: Implementação do padrão Strategy para evitar lógica condicional complexa (if/else, switch/case), facilitando a adição de novas regras de pagamento sem grandes alterações no código. Uso de Map para associar tipos de produtos às estratégias, o que torna o código mais organizado e facilita futuras expansões.
- Adesão aos princípios SOLID, garantindo que o código seja coeso, aberto para extensão, mas fechado para modificações, com responsabilidades bem definidas.
- Eliminação de redundâncias no código, centralizando lógicas comuns em classes ou métodos reutilizáveis.
- Baixo Acoplamento: Separação clara das responsabilidades usando classes distintas, o que facilita a manutenção e a extensibilidade do sistema.
- Validação de Dados: Implementação de validações, como verificação de quantidades positivas, para evitar estados inválidos no sistema.
- Criação de testes unitários para todas as classes e métodos principais, demonstrando preocupação com a qualidade.
- Tratamento de erro claro e específico, garantindo que problemas sejam detectados e tratados adequadamente.
- UX: Implementação de regras específicas. Por exemplo, a regra de produto já adicionado foi atualizada para adicionar a quantidade daquele produto que já existe.
