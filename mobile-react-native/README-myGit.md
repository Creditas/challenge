# myGit
MyGit é um app exemplo, criado para navegar em seus repositórios.

# Author
Pedro Bullo Junior

## Install & Run:
  **cd myGit**
  **yarn install**
  **yarn pod:install**
  **yarn run:ios**

# Features
- Login:
  API: Utilizada API v3 do Github para autenticacão Basic para contas sem Two-Factor ativo;
  Hooks: Tentativa de uso de hooks para state/action creators
  LayoutAnimation para animação adição/remoção de elementos;


# Structure
- Estrutura: Padrão do react-native community (react-native init).
- Redux: Duck pattern (organizando modulos).
- Styleguide: Constantes e estilo de blocos padrões.

### Stack
- React Native v0.61.3 (latest)
- React 16.9 (latest)
- Redux + Redux-Persist (State)
- Redux Thunk (Async actions)
- React-navigation + React-navigation-fluid-transitions (Navigation)
- Styled-Components (Styleguide)

## Debug
- Reactotron
- React-devtools

# Versions
Todas versões estão atualualizadas e lockadas (3/11/2019).

# TODO
- Unity test
  - Styleguide test
  - Styleguide storybook
  - getFilteredRepos (move to utils)
- Normalize components (reuse) + Styled Component theme
- Search API + Pagination + debounce
- GitHub Authentication com 2Factor (SMS code)
- Splashscreen