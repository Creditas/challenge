## Desafio para Backend Software Engineer


Decisões tomadas:
  - Considerei que o pagamento é processado por um message brocker como Kafka ou RabbitMQ
  - Utilizei (de forma básica) logs para auxiliar em possíveis futuras análises.
  - Realizei dois testes de unidade (bem básico, apenas para demonstrar o entendimento) utilizando JUnit afim de obter um bonus point
  - Utilização dos padrões de projeto Strategy (formas de pagamento), Fatory (fabricar os objetos), Builder (lógica de construção de alguns objetos) para organizar o código com o objetivo de ter pouco impacto nas futuras evoluções do sistema
