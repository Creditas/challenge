## Notas de Desenvolvimento

### Setup do projeto

Executar os seguintes comandos para gerar as dependências do projeto (*node_modules*) através do NPM:

* *npm init -y*
* *npm install webpack --save* (local) ou *npm install -g webpack* (global)
* *npm install --save-dev babel-loader babel-core babel-preset-env*

### Executando o projeto

* Abra o arquivo *index.html* no browser de sua preferência.
* O projeto foi testado nos browsers *Google Chrome* e *Mozilla Firefox*.

### Adicionando um novo Chat

Para adicionar um novo chat basta incluir um novo objeto `Chat` na constante `chats`
no arquivo */src/App.js*.

### Estrutura e ferramentas utilizadas no projeto

* OOP em "ES6 modules" - facilita a legibilidade do código;
* Webpack - compila, minifica, e permite a utilização de módulos;
* Babel - transpila o código de ES6 para ES5 permitindo maior portabilidade.

### Possíveis melhorias

* Adição de novo chat através da interface.
* Fechamento de um chat existente através da interface.
* Focus no input do chat em destaque.
* Integração com bibliotecas de testes unitários como o Jasmine.
* Integração com pré-processadores CSS como o SASS.
