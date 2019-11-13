# Mobile React Native Challenge

## Solução

#### UI 
A UI foi construída usando CSS-in-JS com o `styled-system` e com o `@emotion/native`, proporcionando uma maior velocidade e padronizaçao no desenvolvimento, definindo componentes base e com um padrão de temas pra manter um padrão principalmente em grandes equipes de Devs.
#### Rotas
As rotas foram definidas com `react-native-router-flux` fela sua facilidade no entendimento e na codificação, é mais legível e carrega um padrão de Components.
#### State Manager
Precisava colocar um gerenciador de estado, daí tomei a liberdade de usar o ContextAPI com a API de Hooks do React.
#### Componentes
Defini os componentes todos com `Arrow Function` pra conseguir usar a API de Hooks e proporciona uma Clean Architecture. 
### Request
Usei o `axios` pra construir as requisições, todas configuradas no service, juntamente com uma Base Instance do Axios com a `URL Base`.
### Tests
Infelizmente tive um problema de coluna e só consegui duas noites pra construir o projeto, daí não consegui construir os testes. :(
  
<img style="display: block; margin: 0;" src="./result/app.gif" width="220">

