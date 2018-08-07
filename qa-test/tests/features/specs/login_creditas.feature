#language: pt

@login_creditas
Funcionalidade: Efetuar login no site da créditas

Contexto: acessar o site
    Dado que usuário possa afetuar o acesso a tela de login

Esquema do Cenário: Efetuar login no site com usuários válidos
    Quando inserir um <Email> ou <CPF> válido
    E inserir uma <Senha> válida
    Então o sistema deve permitir o login do usuário no site

    Exemplos:
    | Email                 | CPF          | Senha   |
    | "junior@creditas.com" | "12312312312"| "12345" |
    | "aline@creditas.com"  | "34334334343"| "54321" |
    | "jilvan@creditas.com" | "76756776756"| "45678" |