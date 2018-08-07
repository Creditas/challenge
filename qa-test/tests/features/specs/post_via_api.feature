#language: pt

@post_via_api
Funcionalidade: Criar um POST através da API

    Cenario: Criar um POST
        Dado que envio os parâmetros corretos para o endpoint.
        Entao verifico se o cliente é cadastrado com sucesso na base.