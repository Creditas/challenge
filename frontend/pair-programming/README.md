## Desafio - Algoritmo (Pair Programming)

Você precisa renderizar uma lista de elementos formatada de forma humanizada, levando em consideração se deve ser apresentada usando uma conjunção (e) ou disjunção (ou). Você não sabe quantos elementos de fato podem estar presentes, mas sua solução deve seguir algumas regras:

- Exemplo 1:

```
Lista: [1]
Tipo: "disjunction | conjunction"

Resultado: "1"
```

- Exemplo 2:

```
Lista: [1, 2, 3]
Tipo: "conjunction"

Resultado: "1, 2 and 3"
```

```
Lista: [1, 2, 3]
Tipo: "disjunction"

Resultado: "1, 2 or 3"
```

- Exemplo 3:

```
Lista: [1, 2]
Tipo: "conjunction"

Resultado: "1 and 2"
```

```
Lista: [1, 2]
Tipo: "disjunction"

Resultado: "1 or 2"
```

- Exemplo 4:

```
Lista: [1, 2, 3, 4, 5]
Tipo: "conjunction"
Limite: 3

Resultado: "1, 2 ... and 5"
```

**Como rodar o projeto**

- `npm install`
- `npm run test`


**O que faremos nessa etapa?**

Para o software em questão temos apenas o boilerplate da função e um teste dummy. Na entrevista, iremos juntas construir as regras pendentes. A idéia não é desenvolvermos todas as regras específicas, mas sim entender como trabalhamos em time durante uma dinâmica de pareamento.

**Recadinhos**

Sugerimos que você se certifique que a aplicação está executando normalmente (compilando e com o teste passando) antes de iniciarmos.

Você pode utilizar o editor de texto de sua preferência. Recomendamos o [VSCode](https://code.visualstudio.com/).

É permitido pesquisar normalmente na internet caso surja alguma dúvida. 😉

Você irá conduzir o pareamento e precisará compartilhar sua tela, então certifique-se que não está compartilhando nenhum conteúdo confidencial.

Até mais!
