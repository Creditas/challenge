# Descrição
- Entendi que ao fechar o pedido, depois do pagamento ter sido concluído, as diferentes regras de negócios por tipo de produto devem ser tomadas (enviar etiqueta, criar assinatura e etc.). Para tal, foram criadas 4 classes, uma para cada tipo de produto (book, digital, membership, physical) que extendem o item do pedido, utilizando o método close para a implementação das regras de negócios.
- A implementação foi feita em PHP. Então escrevi as classes bases baseada no bootstrap.py e implementei novas classes.

## Dependências
- Docker
- Composer
- PHP 7.2.15
- Apache

## Instalação
```
#Entrar no diretório para iniciar o docker
$ cd src/

#Iniciar os containers no docker
$ docker-compose up --build

#Acessar a aplicação no browser
http://localhost

#Para rodar os testes, veja o container criado
$docker ps

#Entre no shell do container
$docker exec -it <nome_do_container> bash

#Rode os testes
$php ./vendor/bin/phpunit --bootstrap vendor/autoload.php --testdox Tests
```