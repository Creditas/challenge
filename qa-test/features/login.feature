# language: pt

Funcionalidade: Login no sistema da Creditas
Afim de verificar  a solicitação de empréstimo

Esquema do Cenario: Realizar login 
Dado que esteja na tela de login da Creditas
Quando preencher corretamente o "<login>" e "<senha>"
Entao devo estar na pagina inicial da Creditas 

Exemplos:
|login                |senha          |
|36096495850          | S&nh@c3rtA    |
|dlopes14@gmail.com   | S&nh@c3rtA    |



Esquema do Cenario: Tentar logar com login não cadastrado 
Dado que esteja na tela de login da Creditas
Quando preencher  o "<login>" e "<senha>"
Entao deve ser exibida a "<mensagem>" 

Exemplos:
|login                     |senha           |mensagem                         |
|14301085840               | S&nh@          |  Usuário não cadastrado         |
|emailnovo@com.br          | S&nh@          |  Usuário não cadastrado         |


Esquema do Cenario: Tentar logar com senha incorreta 
Dado que esteja na tela de login da Creditas
Quando preencher  o "<login>" e "<senha>"
Entao deve ser exibida a "<mensagem>" 

Exemplos:
|login                       |senha                |mensagem                         |
|36096495850                 | S&nh@3rRad4         |  Senha Incorreta                |
|dlopes14@gmail.com          | S&nh@3rRad4         |  Senha Incorreta                |



