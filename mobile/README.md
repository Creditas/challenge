# Teste Android - Bankfacil

## Lista de usuários

Para organizar as informações do seu quadro de funcionários a empresa Human Resources gostaria de ter um aplicativo Android.

Para isto é necessário criar um aplicativo que ao acessado exiba uma listagem de todos os **90** funcionários da empresa com suas fotos e nome logo abaixo.

> Dado o novo aplicativo dos funcionários da Human Resources 

> Quando for acessado

> Deve-se exibir uma lista dos 90 funcionários com suas fotos assim como seus respectivos nome.

As imagens abaixo podem ser utilizadas como exemplos de como o aplicativo pode ficar:

[vertical](http://s11.postimg.org/vofjja6yp/Screenshot_20160131_230130.png)

[horizontal](http://s27.postimg.org/m4xzx3uc2/Screenshot_20160131_230124.jpg)

Para realizar essa integração a empresa possui a seguinte API a qual retorna todos os usuários cadastrados:

REQUEST:
```sh
curl -X GET http://api.randomuser.me/?results=10
```

RESPONSE:
```sh
{
  results: [{
    user: {
      gender: "female",
      name: {
        title: "ms",
        first: "manuela",
        last: "velasco"
      },
      location: {
        street: "1969 calle de alberto aguilera",
        city: "la coruña",
        state: "asturias",
        zip: "56298"
      },
      email: "manuela.velasco50@example.com",
      username: "heavybutterfly920",
      password: "enterprise",
      salt: ">egEn6YsO",
      md5: "2dd1894ea9d19bf5479992da95713a3a",
      sha1: "ba230bc400723f470b68e9609ab7d0e6cf123b59",
      sha256: "f4f52bf8c5ad7fc759d1d4156b25a4c7b3d1e2eec6c92d80e508aa0b7946d4ba",
      registered: "1303647245",
      dob: "415458547",
      phone: "994-131-106",
      cell: "626-695-164",
      DNI: "52434048-I",
      picture: {
        large: "http://api.randomuser.me/portraits/women/39.jpg",
        medium: "http://api.randomuser.me/portraits/med/women/39.jpg",
        thumbnail: "http://api.randomuser.me/portraits/thumb/women/39.jpg",
      },
      version: "0.6"
      nationality: "ES"
    },
    seed: "graywolf"
  }]
}
```

**Você será o responsável por criar esse aplicativo ou uma parte dele, o objetivo é usar as melhores práticas de desenvolvimento as quais você conhece, fazendo a integração com a API da empresa. Sinta-se a vontade para usar qualquer biblioteca que seja válida para a melhor execução do seu trabalho.**

Para nos enviar seu código, você pode:

Fazer um fork desse repositório, e nos mandar uma pull-request.
Nos dar acesso a um repositório privado seu (github, bitbucket, gitlab...) e nos avisar.
Nos enviar um git bundle do seu repositório para o e-mail challenge@bankfacil.com.br

Boa sorte!
