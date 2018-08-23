# Considerações sobre o desafio

Pessoal obrigado pela oportunidade! segue abaixo as minhas cxonsiderações.

## Como rodar

```
bundle install
cucumber
```

## Decisões

* Resolvi usar o Cucumber e implementar apenas os cenários de sucesso porque os testes não eram o principal objetivo do desafio, mas eu precisava de algo para ir rodando e ver que não estava quebrando nada quando estava desenvolvendo a solução.
* Quebrei o bootstrap.rb em arquivos menores para facilitar a legibilidade, mas mantive as classes que tinha herança entre elas nos mesmos arquivos ( Product e OrderIten ).
* De padrões, eu usei os padrões factory e Template Method (ver as classes Catalog e OrderItem).
* Para introduzir novas regras e novos tipos de produtos se consegue criando novas classes que herdam de Product e OrderItem.
* Como as regras ficaram, em sua maioria, no OrderItem  e seus descendentes ficou mais fácil de criar um  novo order para novos tipos de produtos ou de fazer alterações em uma regra de um produto digital sem intreferir num produto físico 
