# Desafio de Código

A proposta da aplicação que vamos desenvolver em conjunto é disponibilizar a uma pessoa as modalidades de empréstimo as quais ela tem acesso de acordo com algumas variáveis.

Devemos prover os seguintes modelos de empréstimo:

- Empréstimo pessoal. Taxa de juros: 4%
- Empréstimo com garantia. Taxa de juros: 3%
- Consignado. Taxa de juros: 2%

Abaixo seguem as regras de negócio relacionadas a concessão de empréstimo de acordo com o perfil da pessoa:

|                          | Empréstimo pessoal | Empréstimo c/ garantia | Consignado |
| ------------------------ | ------------------ | :--------------------: | ---------- |
| Salário <= 3000          | Sim                |       Sim\*\*\*        | Não        |
| Salário > 3000 e < 5000  | Sim                |        Sim\*\*         | Não        |
| Salário => 5000          | Sim                |         Sim\*          | Sim        |

- \* Clientes com menos de 30 anos
- \*\* Clientes que residem em SP
- \*\*\* Clientes com menos de 30 anos que residem em SP

### Utilização da aplicação:

A aplicação deve receber como entrada essas informações:

##### input

```json
{
  "customer": {
    "name": "Erikaya",
    "cpf": "123.456.789-10",
    "age": 29,
    "location": "BH",
    "income": 3000
  }
}
```

_Para fins de simplicidade, considere que vamos sempre receber os dados corretos (tipos e formatos)_

E deve responder essas informações:

##### output

```json
{
  "customer": "Erikaya",
  "loans": [
    {
      "type": "personal",
      "taxes": 1
    }
  ]
}
```

## Antes da entrevista
- Como faremos uma dinânima de pair programming, certifique-se que será possível compartilhar sua tela através do Google Meet.
- Faça o setup do projeto na linguagem de sua escolha. As instruções estão dentro das respectivas pastas. Isso poupará valiosos minutos da entrevista.
- Tome um tempo para se familiarizar com a problemática, arquivos e estrutura do projeto

## Durante a entrevista
- Este desafio será desenvolvido junto com tripulantes, numa dinâmica de pair programming
- A dinâmica de pair programming tenta simular o dia-a-dia dos tripulantes, então sinta-se à vontade pra tirar quaisquer dúvidas, pedir sugestões, etc. Nesta entrevista não existe certo e errado, temos  apenas interesse em enteder como você aborda problemas!

## Depois da entrevista
- O código construído durante esta avaliação é confidencial e NÃO deve ser compartilhado com outras pessoas além de nossos tripulantes

# Configuração e Instalação

## Pré-requisitos
Você precisa ter php na versão `8.1.0` instalada na sua máquina.

Recomendamos o uso de um _version manager_. Os mais populares são:
- [phpbrew](https://github.com/phpbrew/phpbrew) 
- [phpenv](https://github.com/CHH/phpenv)
- [phpversion](https://github.com/wilmoore/php-version)


## Instale as dependências

Usamos o `composer` como gerenciador de dependências:

Para instalar no Mac ou Linux:
```sh
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer
```

Para instalar no Windows:
Baixe o [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe) e siga todos os passos de instalação.

Para instalar as dependências:

```sh
composer install
```

## Rodando os testes

Estamos utilizando phpunit para teste unitário

```sh
vendor/bin/phpunit tests/LoanMatcherTest.php
```

Você deve esperar um teste falhando
