# Considerações

## Preparação

Antes de iniciar a implementação das regras de negócios propostas no desafio,
decidi escrever testes/especificações para o que já havia sido implementando.
Gerei um `Gemfile` com as *gems* necessárias para escrever e executar
testes e escolhi usar a *gem* `RSpec` como base para a suíte de testes, devido à
afinidade que tenho com esta e outros arquivos para configuração.

Todas as classes já implementadas no arquivo **bootstrap.rb** foram extraídas
para arquivos individuais em uma estrutura de diretórios (**lib/models/**),
simulando uma estrutura típica de um projeto em Ruby.

Conforme extraí cada classe, escrevi os testes unitátios necessários para
descrevê-las da forma como foram originalmente implementadas, fazendo mínimas
modificicações a fim implementar melhorias em alguns pontos, sendo a maioria na
criação das instâncias (método `#initialize`) onde os argumentos de um objeto
`Hash` eram parseados com o método `#values_at` (sempre retorna uma instância de
`Array`). Cada modificação foi descrita nas mensagens dos *commits*.

Com exceção das classes `Customer` e `Membership`, que não possuíam
implementação, todas as classes, nessa fase, possutem testes unitários,
permitindo um acompanhamento da evolução destas.

Também extraí o exemplo descrito no arquivo `bootstrap.rb` para um `Rakefile`,
permitindo rodar o teste de forma separada e deixando a inicialização do projeto
com o mínimo de responsabilidades (apenas o carregamento dos arquivos).

Nesta etapa de preparação, o projeto está estruturado e pronto para ser
modificado e, caso necessário, refatorado, para implementar as lógicas de
negócio.

## Instruções para Execução

Utilizei o Ruby v2.5.3 para fazer o desafio.

**Observação**: Preparei o projeto para ser utilizado com gerenciadores de
versão (`RVM` e `rbenv`), então, caso esteja utilizando algum deles, a versão do
Ruby poderá ser configurada automaticamente (arquivo **.ruby-version**). Caso
use `RVM`, um *gemset* específico para o desafio poderá ser criado na máquina
local, não afetando a versão das demais *gems* instaladas. Também deixei
instruções para execução em um container do Docker.

1. Após clonar o repositório **git** para a máquina local, no *shell* mude para
o diretório **backend**, como por exemplo:

    ```sh
    cd challenge/backend
    ```

    **Opcional**: Caso tenha o Docker instalado na máquina e prefira usá-lo,
    execute o seguinte comando:

    ```sh
    docker run -it --rm -v $(pwd):/challenge ruby:2.5-alpine sh
    ```

    No container do Docker, mude para o diretório **/challenge** e prossiga com
    os demais passos abaixo:

    ```sh
    cd /challenge
    ```

1. Instale as dependências do projeto com o seguinte comando:

    ```sh
    bundle install
    ```

1. Para executar os testes, execute o `rspec`:

    ```sh
    bundle exec rspec spec/
    ```

1. Caso queira testar a aplicação com um console do Ruby, execute:

    ```sh
    bundle exec irb -r ./bootstrap.rb
    ```

1. Para listar as *tasks Rake* disponíveis e executá-las:

    ```sh
    # Listar tasks
    bundle exec rake --tasks

    # Executar uma task
    bundle exec rake nome_da_task

    # Executar o exemplo original do arquivo bootstrap.rb
    bundle exec rake
    ```
