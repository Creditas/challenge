## Teste frontend - Bankfacil

Esse é um teste focado em design de código, e conhecimento de orientação a 
objeto. O objetivo é avaliar sua experiênica em escrever código de fácil 
manutenção, baixo acoplamento, e alta coesão.

### Apresentação do problema

O arquivo `index.html` contém o esqueleto de uma aplicação de chat totalmente 
*bare-bones*: uma `<ul>` com uma lista de mensagens enviadas, e um `<button>` + `<input>` 
para envio de novas mensagens.

A feature inicial de nossa aplicação é bastante simples: o usuário deve poder 
entrar uma mensagem na caixa de texto e, ao apertar o botão "Enviar" (ou 
pressionar <kbd>Enter</kbd>), a mensagem deverá aparecer na lista de mensagens.

Isoladamente essa é uma feature simples de implementar, mas queremos que você 
leve em conta a evolução futura do software. Imagine que o app irá crescer em 
features, e adicionar coisas como:
* envio de mensagens via ajax, com as respostas vindo via `long-polling`
* chat em realtime via WebRTC
* ter vários chats visíveis ao mesmo tempo, adicionadas dinamicamente com base nas ações do usuário

Você deve pensar num design de código que suporte esses casos de uso sem 
grandes modificações.

### Avaliação

Para nos enviar seu código, você pode:
* Fazer um fork desse repositório, e nos mandar uma pull-request
* Nos dar acesso a um repositório privado seu (github, bitbucket, gitlab...)
* Nos enviar um `git bundle` do seu repositório para o e-mail challenge@bankfacil.com.br
