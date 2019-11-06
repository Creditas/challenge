# myGit
MyGit é um app exemplo, criado para navegar em seus repositórios.

# Author
Pedro Bullo Junior

# Install & Run:
  1 - Acessar o root pro projeto
  **cd myGit**

  2 -
  **yarn install**

  3 - 
  **yarn pod:install**

  4 - 
  **yarn run:ios**

# Navigation Flow
<img src="https://github.com/pedrobullo/challenge/blob/master/mobile-react-native/flow.png?raw=true" width="400">

## Login flow
<img src="https://github.com/pedrobullo/challenge/blob/master/mobile-react-native/wiremock/preview-login.gif?raw=true" width="400">

## Searching Repo
<img src="https://github.com/pedrobullo/challenge/blob/master/mobile-react-native/wiremock/preview-repo-search.gif?raw=true" width="400">

## Switching Repo
<img src="https://github.com/pedrobullo/challenge/blob/master/mobile-react-native/wiremock/preview-change-repo.gif?raw=true" width="400">

# Testing (Unitário e Snapshots) 
  **yarn test**

# Features
- Login:
  - Utilizada API v3 do Github para autenticacão Basic para contas sem Two-Factor ativo.
  - LayoutAnimation para animação adição/remoção de elementos.
  - React Hooks based.

- RepoList:
  - onScrollEndDrag para atualização da lista de repositorios.
  - Search através de filtro (API user/repos que não tem o parametro Query).
  - Animated header: Animação do header baseado no ScrollView, melhorando aproveitamento espaço.
  - React.Component Class based.

- RepoDetail
  - React Hooks based.
  - Cached commit results

- Core
  - I18n - tradução inglês e português para alguns textos baseada la região do device.
  - Test - Snapshots + Helper functions.

# Structure
- Estrutura: React-native community standard (react-native init).
- Redux: Duck pattern (organizando modulos).
- Styleguide: Constantes e estilo de blocos padrões.

# Stack
- React Native v0.61.3 (latest)
- React 16.9 (latest)
- Redux + Redux-Persist (State)
- Redux Thunk (Async actions)
- React-navigation + React-navigation-fluid-transitions (Navigation)
- Styled-Components (Styleguide consumer)

## Versions
Todas versões estão atualualizadas e lockadas (3/11/2019).

# Debug
- Reactotron
- React-devtools

# TODO
- Unity test
  - Styleguide components snapshot test
- Melhorar reutilização de components
- Detox?
- Splashscreen?
- Suporte para GitHub Authentication com 2Factor (SMS code)?