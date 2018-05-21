Foi remodelado a estrutura de classes nesse projeto. Utilizei as camadas:

-Business: para segregar a regra de negócio;
-Entities: entidades modelo utilizada na contrução do serviço;
-Services: comunicação com servico externo.

Para gerar um pagamento é necessário chamar a classe PaymentBuilder passando a
order, payment_method e o paid_at, e então será executado o fluxo de pagamento.

