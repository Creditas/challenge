# Minha solução para o problema proposto

Após fazer um estudo de como poderia solucionar o problema, cheguei a conclusão que uma abordagem utilizando o *pattern strategy* seria bem adequado. Este padrão propõem uma variação de algoritmos de acordo com a situação proposta ou seja, para cada tipo de produto eu farei uma *entrega* de forma diferente.

Entre as classes ainda utilizei agregação sempre que possível(onde atributos e comportamentos eram semelhantes).

Expandir esse modelo fica muito fácil, cada tipo de produto contém suas regras e podem facilmente compartilhar o que é comum por agregação.

## Estruturando o projeto

Resolvi criar um arquivo com testes, utilizando o módulo *builtin* do python chamado Unittest. Desta maneira iniciei a implementação com uma abordagem baseada em testes(TDD) sempre pensando em *test first* como guia de desenvolvimento.

Sendo assim, comecei fazendo um teste de compra de um produto - acabei recortando o exemplo dado na proposta do problema, dentro do arquivo *_boostrap.py*.

## Implementando os testes

Depois de subir uma suite de testes mínima, comecei a implementação dos testes conforme a descrição do problema. Para chegar a algo satisfatório, segui os seguintes passos:

  * Teste para compra de um item fisico, com etiqueta de entrega;
  * Teste para compra de um serviço de streaming, com envio de email e ativação da assinatura;
  * Teste para compra de um livro, com etiqueta de entrega e etiqueta especial de isenção de impostos;
  * Teste para compra de midia digital, com adição de desconto(somente uma vez no pedido)
  * Teste para compra de duas midias digitais, para verificar se o desconto foi aplicado corretamente.

  Importante salientar que para os pedidos que precisavam do envio de email, fiz uma verificação no teste quanto ao preenchimento ou não do endereço de email do cliente.

  ## Para *rodar* os testes
  ```
  python test_boostrap.py -v
  ```

  **IMPORTANTE: Desenvolvido com python 3**