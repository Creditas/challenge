## Creditas Challenge - Front-End (Chatz)

![Chatz!](https://media.giphy.com/media/fdY8eXSKCy27fzkoQb/giphy.gif)

A proposta do desafio, consiste em criar um chat com envios de mensagens que poderá receber mensagens via long-polling,
ter vários chats visíveis ao mesmo tempo, adicionadas dinamicamente com base nas ações do usuário.

Para isso, estruturei uma array de objetos. Onde cada objeto possui um identifcador e um array de mensagens,
tendo assim fácil acesso a cada histórico de mensagens a partir de um Identificador `id`.

```js
[
  {
    "id": "123abc",
    "messages": [
      {
        username: "Andreolle",
        message: "Olá!"
      },
      {
        username: "Pedro",
        message: "Como você está!?"
      },
      {
        username: "Andreolle",
        message: "Estou bem :D"
      }
    ]
  }
]
```

Para a receber requisições ajax via long-polling, cada usuário terá consigo a sua versão da conversa até o recebimento da próxima
mensagem, onde será feito um merge das duas versões adicionando a `messages` a nova mensagem e mantendo as anteriores.

## Para rodar o projeto localmente

Instale as depedências do projeto
### `npm install`

Rode o projeto
### `npm start`

O projeto estará disponivel na seguinte url: [http://localhost:3000](http://localhost:3000)

## Demo

Atualmente o projeto está hospedado no [Surge](https://surge.sh/), você pode conferir o resultado em [http://chatz.surge.sh/](http://chatz.surge.sh/)

## Tecnologias utilizadas

* [React](https://reactjs.org/).
* [Redux](https://redux.js.org/).
* [Create React App](https://facebook.github.io/create-react-app/).
* [sass-loader](https://github.com/webpack-contrib/sass-loader).
