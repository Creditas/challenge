<img src="https://www.creditas.com.br/static/images/logo-creditas-color-8367919c2a.svg" width="400">

# Challenge Frontend - Creditas
Esse é um teste de nivelamento. Queremos deixar claro que não é esperado que todos consigam realizá-lo por completo, já que é destinado a todos os níveis de carreira. Esperamos que todas as pessoas que queiram trabalhar conosco tentem realizá-lo.

Focamos aqui em design de código e design patterns em JavaScript. O objetivo é avaliar sua experiência em escrever **código de fácil manutenção, baixo acoplamento e alta coesão**.

A Creditas trabalha sempre com feedbacks construtivos e, portanto, daremos sempre uma atenção especial para todos que submeterem o teste, passando para o candidato quais são os pontos positivos do seu teste e os pontos a melhorar. Vale a pena tentar! :)

## Apresentação do problema

Você deverá melhorar a calculadora de simulação de crédito implementada neste projeto.

A interface está previamente definida, assim como os estilos.
Os desafios incluem refatorar o código e implementar funcionalidades (detalhados mais abaixo).

Sinta-se à vontade para componentizar o que achar que deve ser componentizado.
Só gostariamos que o teste fosse realizado com Javascript puro, nosso querido vanilla. O que acha de encarar o desafio?

O estado atual da calculadora:
<img style="display: block; margin: 0 auto;" src="./layout.png">



### Funcionalidade esperada

A aplicação deverá permitir ao usuário escolher o tipo de garantia que quer utilizar no pedido de empréstimo: ***"Veículo"*** ou ***"Imóvel"*** (o preenchimento padrão é *"Veículo"*) e seguir as regras de cálculo abaixo.

**Regras em comum**
- Taxa de IOF: 6.38%;
- Taxa de Juros: 2.34%;
- Valor máximo para empréstimo: 80% do valor da garantia;

*Fórmula do valor total a pagar*

```javascript
const valorTotalAPagar = ((iof / 100) + (taxaDeJuros / 100) + (prazo / 1000) + 1) * valorDoEmprestimo
```

*Fórmula do valor da parcela*

```javascript
const valorDaParcela = valorTotalAPagar / prazo
```

## Desafios a cumprir

### CSS
* **Refatorar para facilitar manutenção**

Atualmente o arquivo CSS possui muitos estilos, o que dificulta a legibilidade. Esperamos que você faça uma boa arganização dos estilos, isolando-os para torná-los mais legíveis e, assim, facilitar a manutenção.

### HTML / JS
* **Adicionar a opção de garantia _"Imóvel"_** (com as respectivas regras de cálculo)
* **Refatorar código antigo (e organizar código novo) para facilitar manutenção**

Hoje, a Creditas possui dois produtos: empréstimo com garantia de veículo e de imóvel. O projeto atual tem implementada apenas a opção de garantia *"Veículo"*, você deve implementar a opção *"Imóvel"*.
Ao mudar o tipo de garantia no elemento `select`, o usuário deve ver as opções de valores e prazos referentes ao tipo selecionado. Ou seja, ao selecionar veículo ou imóvel, você deve mostrar na tela opções diferentes nos campos do formulário e no slider. Veja abaixo os valores correspondentes:

**Veículo**
- Valor mínimo para empréstimo: R$ 3.000,00;
- Valor máximo para empréstimo: R$ 100.000,00;
- Prazos para veículo : 24 / 36 / 48 meses;

**Imóvel**
- Valor mínimo para empréstimo: R$ 30.000,00;
- Valor máximo para empréstimo: R$ 4.500.000,00;
- Prazos para imóvel : 120 / 180 / 240 meses;

Por fim, você deve exibir o valor da parcela no campo correspondente a cada mudança nos inputs do formulário.

## Desenvolvimento

### Pré-requisitos
Você precisa minimamente do [NodeJs](https://nodejs.org/en/) instalado para rodar a apliação e o [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) para baixar o repositório e submeter um pull-request

### Configurações para rodar o ambiente

Você precisa conhecer um pouco sobre o Git, que é uma ferramenta que nos ajuda a fazer o controle de versão dos nossos arquivos.

```shell
git clone https://github.com/Creditas/challenge.git
cd frontend/
npm install
npm start
```

Se tudo estiver ok, acesse a url [http://localhost:4000/](http://localhost:4000/)

### Construído com
Este projeto possui algumas bibliotecas para nos auxiliar nos testes e rodar a aplicação, são eles: *Webpack*, *Babel*, *Jest* e *Eslint*.

## Tests

Para rodar os testes é necessário executar o comando abaixo:

```shell
npm test
```

## Feedback (opcional)
Aqui na Creditas o feedback faz parte da nossa cultura, seria muito gratificante se, tendo concluído ou não o teste, você pudesse contribuir com nosso processo de contração respondendo [este pequeno questionário.](https://docs.google.com/forms/d/e/1FAIpQLSdTNMc2JqnvNxy4J3gAN-vQqsfG6PscH5hVQRC9dyMK1PlnRw/viewform?usp=sf_link)
