## Comentários da solução do Teste frontend da Creditas por *Rodrigo Pontes*

Eu decidi pela solução do problema através da utilização de React.

React tem duas grandes vantagens pensando no que foi apresentado como evolução do software: uso de componentes e o VirtualDOM.

A lógica de componentes na qual o React se baseia, facilita muito a coerência e reutilização de código para funcionalidades futuras
como renderização de vários chats ao mesmo tempo, adição de outros items de visualização no chat (como lista de usuários online).

O VirtualDOM é muito benéfico para aplicações em tempo real, agilizando a atualização do DOM quando há mudanças pontuais
(por exemplo, a adição de uma nova mensagem enviada na lista de mensagens).

Além disso, React tem a flexibilidade de conexão com o servidor via AJAX, para usar técnicas como long-polling; mas também
pode-se aproveitar da lógica de reatividade e usar uma solução baseada em Relay e GraphQL. React se adapta também ao framework WebRTC.


### Feature de envio de nova mensagem

O arquivo src/ChatBox.js contém o component que renderiza um chat e toda a lógica relevante para a feature pedida.

Um arquivo local mensagens.json foi criado para simular uma conexão ao servidor com as mensagens.

As funções do componente ChatBox colocam as mensagens do arquivo no State e renderizam a lista de mensagens.
Ao enviar uma nova mensagem, a função adiciona a mensagem ao State, mostrando a nova mensagem na lista.

Por segurança, como está rodando no Browser, o framework não permite alterar o arquivo json local.
Isso significa também que ao reler a página, a mensagem adicionada será perdida.
Mas isso não afeta se a interface estivesse de fato conectada a um servidor. A lógica seria a mesma - colocar a lista de mensagens no state e renderizar a partir do state, com a diferença que haveria um método a mais para atualizar a lista de mensagens no servidor. Isso torna fácil implementar Ajax com long-polling ou Relay+GraphQL.




#### A solução foi criada a partir do boilerplate create-react-app. Não rodei ´run eject´ por achar não ser necessário para visualização do código.