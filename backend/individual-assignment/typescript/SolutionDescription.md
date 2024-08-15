## Desafio para Backend Software Engineer

A primeira parte da solução foi organizar as classes em arquivos específicos, de forma a visualizar melhor o que existia e para que cada classe tenha seu objetivo único.

Para compreender melhor o código e garantir que seguisse funcionando corretamente, a segunda parte da minha solução foi aplicar testes de unidade. Nessa etapa, decidi implementar também testes para as novas funcionalidades a serem criadas após a compra de cada tipo de produto. Para testar esses novos casos, coloquei as condições encadeadas em if/else somente para dividir e ter mais clareza das condições.

Agora com os testes dos cenários de sucesso das novas condições, criei novas classes para cada tipo de processamento com base no tipo de produto, usei um mapeamento dos respectivos tipos e classes associadas para os produtos.

Movi os arquivos relacionados a produto para uma pasta específica para melhorar a organização, o que deve ser feito com os outros domínios para organização conforme eles forem crescendo.

Por fim, adicionei um formatador de código para seguir um padrão. Ainda existem várias melhorias que podem ser aplicadas, como por exemplo a aplicação de testes para demais cenários, a organização da classe de pagamento e organização do restante do projeto.


### Exemplo de Futura Organização:

```
/src
├── bootstrap.ts
├── /common
│   ├── /providers
│   │   └── /tests
│   │       └── emailProviderService.spec.ts
│   │   └── emailProviderService.ts
├── /address
│   ├── /tests
│   │   └── address.spec.ts
│   ├── address.ts
├── /customer
│   ├── /tests
│   │   └── customer.spec.ts
│   ├── customer.ts
├── /invoice
│   ├── /tests
│   │   └── invoice.spec.ts
│   ├── invoice.ts
├── /order
│   ├── /tests
│   │   └── order.spec.ts
│   │   └── orderItem.spec.ts
│   ├── order.ts
│   ├── orderItem.ts
├── /payment
│   ├── /tests
│   │   └── payment.spec.ts
│   │   └── paymentMethod**.spec.ts
│   ├── payment.ts
│   ├── paymentMethod**.ts
│   ├── paymentTypes.ts
├── /product
│   ├── /index.ts // Opcional
│   ├── /product.ts
│   ├── /processors
│   │   └── /tests
│   │       └── *...Processor.spec.ts
│   │   └── *...Processor.ts
│   ├── /tests
│   │   └── product.spec.ts
```