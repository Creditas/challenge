## Considerações sobre o desafio

Foram criadas as camadas necessárias para atender a necessidade disposta no challenge.

A estrutura de arquivos tem o seguinte fundamento:

- bootstrap.kt - Arquivo base
- infrastructure
    - repositories - Abstração de repositórios da aplicação
        - business - Objetos de abstração do negócio (repositório interno)
            - products 
        - mail - repositório responsável por envio de email (externo)
        - membership - repositório responsável por gerenciar assinaturas (externo)
        - payment - repositório responsável por processamento de pagamentos (externo)
        - shipping - repositório responsável pelas shippin labels (externo)
    - resources - Recursos internos
        - financial
            - types
- services - Camada de serviço, abstrai regras de negócio sobre os dados transmitidos

### Repositórios

São elementos que podem ser apenas a chamada para uma biblioteca/api/código externo(a) a aplicação base