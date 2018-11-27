# Front-End Creditas Challenge - Chat App

## O que foi utilizado?
- React
- Redux
- Redux Saga
- WebSockets
- Material UI

## O que é possível fazer no chat?
- Enviar mensagens em tempo real
- Adicionar novas salas de chat
- Acessar em qualquer dispositivo, dada sua responsividade

## Por que React?
- É "one-way data binding", o que permite um maior controle sobre os dados.
- Eficiência - É leve, porém poderoso
- Alta abrangência de mercado, que facilita a manutenção
- Alta escalabilidade
- Ecossistema - Encontram-se centenas de bibliotecas feitas para React que podem ser adotadas, facilitando a implementação de uma nova funcionalidade e ampliando as possibilidades

## Por que Redux e Redux Saga?
Por concentrar todos os estados da aplicação em um único lugar, a Store, e por oferecer uma maior facilidade em gerenciar os efeitos colaterais das operações assíncronas, o que seria útil para atender as futuras implementações propostas no desafio, como long-polling e chamadas em real time.

## Servidor
Criei um server com WebSockets para simular o envio de mensagens em tempo real. É possível visualizar mantendo o chat aberto em duas ou mais abas diferentes.

Também criei uma sala de chat global, com a opção de adicionar outras salas com nome personalizado.

### Comandos para rodar o projeto

Na pasta creditas-challenge-chat:

```
npm install
```

Seguido por:

```
npm start
```

E depois, em um outro terminal, dentro da pasta server:

```
node app.js
```

