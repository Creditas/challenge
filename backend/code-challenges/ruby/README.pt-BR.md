# Configuração e Instalação

## Pré-requisitos
Você precisa ter ruby na versão `3.0.2` instalada na sua máquina.

Recomendamos o uso de um _version manager_. Os mais populares são:
- [rvm](https://rvm.io/) 
- [rbenv](https://github.com/rbenv/rbenv)
- [asdf](https://github.com/asdf-vm/asdf)


## Instale as dependência

Usamos o `bundler` como gerenciador de dependências

```sh
gem install bundler
```

Para instalar as gems (somente uso do rspec para testes unitários)

```sh
bundle install
```

## Running Project and test

Estamos utilizando rspec para teste unitário

```sh
rspec
```

Você deve esperar um teste falhando
