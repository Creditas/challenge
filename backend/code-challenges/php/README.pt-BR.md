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
