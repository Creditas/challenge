## Considerações do Desafio para Backend Software Engineer

__Qual a idéia aplicada?__

 Preferindo utilizar composição em vez de herança, utilizei DCI (Data, Context, and Interaction)
 dessa forma consegui separar melhor o domínio da aplicação dos casos de usos e identifiquei melhor
 as funções que cada objeto tem que desenpenhar.

__Como eu fiz?__

  - Comecei criando testes para toda a aplição, para ter um entendimento do seu comportamento.
  - Com os testes criados, comecei o refactoring, separando os dominios das classes e modificando
    o arquivo de bootstrap. Por ser um refactoring, nesse momento não foi adicionada nenhuma nova
    funcionalidade, apenas fui validando as modificações com os testes já criados.
  - Implementei as novas funcionalidades preferindo composição em vez de herança
  - Por fim, me atentei as regras do desafio, de shpping e email, aonde foi relativamente
    simples aplicar
  - Refatorei para retirar a metaprogramação, nesse processo transformei o produto num módulo e os tipos em entidades
  - Não satisfeito com o design, refatorei novamente, transformando o produto numa entidade, aonde ele recebe um contexto (seus tipos)
  - Desacoplei as classes de email, voucher e label aumentando a coesão