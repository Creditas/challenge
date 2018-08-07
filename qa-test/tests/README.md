Desafio para QA - Test Engineer
===================

1. Atividades
-------------
Criação de cenários do processo de login da página inicial da creditas.
Execução da automatização dos seguintes processos.
- Adicionar e remover checkbox.
- Abrindo nova aba no navegador. 
- Criando post via API

Foram utilizadas as tecnologias abaixo no projeto:
**Sistema Operacional:**
- Windows 10

**Programas utilizados:**
- Visual Studio Code - versão: 1.25.1  
- Cmder
- cucumber - 3.1.2
- capybara - 3.0.3
- rspec - 3.8.0
- site-prism - 2.15
- httparty 0.16.2
- Faker 1.9.1

----------

2. Soluções
-------------

**2.1 Especificação utilizando BDD.**

2.1.1 Página de login da creditas

O cenário abaixo apresenta o processo de login apenas com usuários autenticados no sistema, ou seja, apenas usuários cadastrados podem conseguir realizar com sucesso o login ao site da creditas.

```#language: pt

@login_creditas
Funcionalidade: Efetuar login no site da créditas

Contexto: acessar o site
Dado que usuário possa afetuar o acesso a tela de login

Esquema do Cenário: Efetuar login no site com usuários válidos
Quando inserir um <Email> ou <CPF> válido
E inserir uma <Senha> válida
Então o sistema deve permitir o login do usuário no site

Exemplos:
| Email                 |CPF          | Senha   |
| "junior@creditas.com" |"12312312312"| "12345" |
| "aline@creditas.com"  |"34334334343"| "54321" |
| "jilvan@creditas.com" |"76756776756"| "45678" |

```

2.1.2 Adicionar e remover o checkbox

A página web do cenário abaixo apresenta um botão com a descrição **Remove** , que quando clicado apresenta a mensagem *It's gone!*, o botão fica com a descrição **Add**e quando clicado novamente apresenta o texto *It's back!* e o checkbox na tela.

A solução para automatização deste processo foi criada a partir do BDD abaixo:

```
#language: pt

@checkbox
Funcionalidade: adicionar e remover o checkbox

Cenário: remover checkbox
Quando eu clico no botão
Então verifico se o checkbox foi removido.

Cenário: adicionar checkbox
Quando clico no botão
Então verifico se o checkbox foi adicionado. 
```
Na pasta *pages* criou o arquivo *checkbox_pages.rb* para criar a classe definir os elementos, no caso para este teste foi definido o slug *'dynamic_controls'*, mais os elementos do botão e do checkbox.

```
 set_url 'dynamic_controls'
 element :btn_remove, '#btn'
 element :btn_checkbox, 'input[type="checkbox"]'
```

**Código e descrição.**

`@checkbox_page.load` carrega a página web, chamando da classe a url setada.
`@checkbox_page.btn_remove.click` efetua a ação do clique no botão, chamando da classe o elemento do botão.
`texto = find('#message')` salva a mensagem na variável texto. 
`expect(texto.text).to eql "It's gone!"` Compara e valida se o texto armazenado na variável `texto` bate com o texto inserido.
 `@checkbox_page.btn_checkbox.click` efetua a ação de click chamando da classe o elemento do checkbox.
 
2.1.2 Nova aba

A página web do cenário abaixo apresenta um texto com link *Click Here*, que quando clicado abre uma nova aba com o texto *New Window*.

A solução para automatização deste processo foi criada a partir do BDD abaixo:
```
#language: pt

@open_window
Funcionalidade: Abrir nova Janela

    Cenário: Abrindo nova janela
        Quando eu clico no link
        Então verifico que abriu uma nova
```

Na pasta *pages* criou o arquivo *open_window_pages.rb* definindo o slug *'/windows'*, e o elemento do link.

```
 set_url '/windows'
 element :click_link, 'a[href="/windows/new"]'
```

**Código e descrição.**

`@openWindow.load` carrega a página web, chamando da classe a url setada.
`@openWindow.click_link.click` efetua a ação do clique no botão, chamando da classe o elemento do texto.
`switch_to_window windows.last` muda para a ultima aba da janela aberta.
`expect(current_url).to eql 'https://the-internet.herokuapp.com/windows/new'` valida a url da aba em que está focando as ações.
`@mensagem = find('.example')` salva a mensagem na variável mensagem. 
`expect(@mensagem.text). to eq 'New Window'` Compara e valida se o texto armazenado na variável `mensagem` bate com o texto inserido.
`windows.last.close` fecha a aba.

2.1.3 Criar post via API

O cenário abaixo apresenta uma API pública que permite criar posts e comentários.

A solução para automatização deste processo foi criada a partir do BDD abaixo:

```
#language: pt

@post_via_api
Funcionalidade: Criar um POST através da API

    Cenario: Criar um POST
        Dado que envio os parâmetros corretos para o endpoint.
        Entao verifico se o cliente é cadastrado com sucesso na base.
```

**Código e descrição.**

Variável para armazenar o *body* da requisição. Os registros utilizados foram gerados a partir do Faker (que gera dados falsos). É definido o corpo da requisição e no final é definido o tipo de arquivo *.to_json*.

```
  @body = {
        "title": Faker::Superhero.name,
        "body": Faker::Esport.player,
        "userId": 1
    }.to_json
    @post_api = HTTParty.post 'http://jsonplaceholder.typicode.com/posts',
      :body => @body,
      :headers => {
          "Content-Type" => 'application/json'
      }
```

A variável que armazena o verbo *post* e nesse caso é definido da seguinte maneira
`:body => @body, :headers => {"Content-Type" => 'application/json'}` 
Ou seja, defino o tipo de requisição que tem que ser mandando, no caso *application/json*.

O `puts @post_api.body` apresenta no terminal o post.
`expect(@post_api.code).to eq 201` é dado um expect na requisição, esperando 201.
