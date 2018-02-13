## Teste Frontend – Creditas
Foi proposta a criação de uma aplicação de chat com uma função muito simples: o usuário deve poder entrar uma mensagem na caixa de texto e, ao apertar o botão "Enviar" (ou pressionar Enter), a mensagem deverá aparecer na lista de mensagens.

## Preparando o projeto para produção

### Dependências
Assumindo que você tem o NPM instalado: 

	$ npm install

### CSS
Os estilos desse projeto estão escritos em SASS. Para compilá-los em `dist/styles.css`, rode:

	$ gulp styles
  
### JS
Estamos usando Babel (env). Para gerar o arquivo `dist/all.js`:

	$ gulp scripts
  
## Como testar o código
Escolhi o Jest como framework de testes. Para executá-los:

	$ npm test
