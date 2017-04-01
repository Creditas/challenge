- Fazer o projeto sem usar IF.
- Não acoplar no Payment as regras do PostPayment
- Diferenciar a ação do fim do pagamento a partir do tipo dos produtos do Order.
- Serviço de cada tipo ser independente, podendo ser reutilizado para outra coisa também, sem depender de Payment. (Pode passar um invoice que tá tudo certo, SOLID :-) ).
- Separar onde poderia ter implementação de chamada de alguma API para Correio ou Email.
- Manter a ideia do Membership ser algo a parte, sem ligação com produto. Eu entendi que Membership não era do local daonde o Payment está sendo feito, por isso Membership não "conhece" customer nem invoice.

Obrigado :)