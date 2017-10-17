### Executando ###

```
ruby bootstrap.rb
```

### O que eu melhoraria ###
 - Iria refactorar o ShippingRules para devolver as classes e não realizar o perform dereto nele, assim, fica melhor inclusive para criar os testes com um rspec.
 - Criaria testes para o ShippingRules
 - Certamente deve ter uma maneira mais elegante e performatica para evitar um foreach e select aninhado (isso ficou bem feio)
 - Separaria em modulos para ficarem mais coerentes
