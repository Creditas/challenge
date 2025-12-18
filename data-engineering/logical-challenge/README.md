# Creditas Data Engineering Challenge

### Introdução
Este é um teste baseado apenas em lógica, com isso você não precisa de nenhuma ferramenta complexa instalada, somente um jeito de executar a sua linguagem de programação favorita. Você irá encontrar 8 datasets relacionados aos problemas 1 e 2 com suas entradas e saídas na pasta ***/in-outs***. Esses datasets irão te ajudar a completar sua tarefa, você só precisa ter certeza de que a saída do seu código está exatamente igual à saída fornecida e voilà!  

## Problema 1 - O devorador de mensagens.
A Creditas tem dois sistemas, um produtor de mensagens (P) e um consumidor de mensagens (C) que se comunicam através de uma fila (Q). O produtor pode postar qualquer número de mensagens na fila a qualquer momento, e a única forma dessas mensagens saírem da fila é sendo consumidas por C.
<br />

**Descubra o número mínimo de mensagens que C consumiu usando duas formas de processamento:**

    Método 1 - Assuma que nesse método, o consumidor pode consumir qualquer número de mensagens a qualquer momento.
    Método 2 - Assuma que, a partir do primeiro momento que olhamos para a fila, C consome mensagens a uma taxa constante sempre que há mensagens na fila.
    
A entrada para o procesamento é um log contendo a quantidade de mensagens na fila em intervalos de 100-milissegundos.
Por exemplo, se a entrada é 10 5 15 5, isso significa que no momento 0ms há 10 mensagens na fila, no momento 100ms há 5 mensagens na fila e assim por diante. (Isto é 15 aos 200ms e 5 aos 300ms).

Análise: Com o primeiro método, C consumiu 15 mensagens para a entrada citada anteriormente: primeiro ele consome 5 mensagens, então mais 10 são postadas na fila, então ele consome mais 10. ***Não há outra maneira de consumo em que C consuma menos de 15 mensagens para o log acima.*** 

Para o segundo método, C deve ter consumido pelo menos 25 mensagens. Podemos determinar que C consome mensagens a uma taxa de pelo menos uma mensagem a cada 10 milissegundos. Ele começa com 10 mensagens na fila. Nos primeiros 100 milissegundos, ele consome 10 mensagens, então 5 mensagens são postadas na fila. Nos próximos 50 milissegundos, ele consome 5 mensagens e então a fila permanece vazia nos outros 50 milissegundos, então P posta 15 novas mensagens na fila. Finalmente C consome 10 mensagens nos últimos 100 milissegundos, ao final ainda restam 5 mensagens em Q.

### Entrada

A primeira linha da entrada fornece o número de casos de teste, T. Então nas linhas seguintes se encontram T casos de teste. Cada um consistirá em uma linha contendo um único inteiro N, seguido por uma linha contendo N inteiros separados por espaço contendo o número de mensagens na fila Q no início e em intervalos de 100 milissegundos (mi).

### Saída

Para cada caso de teste, imprima uma linha contendo "Caso #x: y z", em que x é o número do caso de teste (começando em 1), y é o número mínimo de mensagens que C poderia ter consumido usando o primeiro método de cálculo, e z é o número mínimo de mensagens que C poderia ter consumido usando o segundo método.

### Limites
<br />1 ≤ T ≤ 100.
<br />
<br />Dataset pequeno
<br />2 ≤ N ≤ 10.
<br />0 ≤ mi ≤ 100.
<br />
<br />Dataset grande
<br />2 ≤ N ≤ 1000.
<br />0 ≤ mi ≤ 10000.

### Exemplo


<table border="0">
 <tr>
    <td><b style="font-size:20px">Entrada</b></td>
    <td><b style="font-size:20px">Saída</b></td>
 </tr>
 <tr>
    <td valign="top">
    4
    <br>4
    <br>10 5 15 5
    <br>2
    <br>100 100
    <br>8
    <br>81 81 81 81 81 81 81 0
    <br>6
    <br>23 90 40 0 100 9
</td>
    <td valign="top">
    Case #1: 15 25
    <br>Case #2: 0 0
    <br>Case #3: 81 567
    <br>Case #4: 181 244</td>
 </tr>
</table>



## Problema 2 - Somos econômicos, porém divertidos!
Até o dia de hoje, a Creditas podia usar D diferentes templates de nós de computação para todas as suas aplicações (um template é um modelo de máquina pré definido com uma certa quantidade de núcleos de processamento, memória e armazenamento). Hoje, o principal midleware que adotamos restringe a quantidade de nós de cada template que as aplicações podem usar. Portanto, nossos engenheiros decidiram que nenhuma infraestrutura de aplicação pode usar mais do que C nós de cada um dos templates. Por exemplo, se C = 2 e os dois templates existentes tiverem 1 e 5 núcleos, é possível implantar uma aplicação que precise de 11 núcleos usando dois templates de 5 núcleos e um de 1 núcleo, ou uma aplicação que precise de 12 núcleos usando dois templates de 5 e dois de 1 núcleo, mas é impossível implantar uma aplicação que precise de 9 ou 17 núcleos (a quantidade de núcleos deve ser exata, não é permitido ter núcleos ociosos. Lembre-se, somos econômicos).

Infelizmente, agora você é o responsável por controlar os templates disponíveis. Uma boa notícia é: você pode solicitar novos templates ao cloud provider! Sua meta é tornar possível ***qualquer aplicação que precise de no máximo V núcleos ser implantada*** de acordo com as novas regras dos engenheiros. (Observe que isso pode não ter sido necessariamente possível antes da adoção do novo midleware). Além disso, você deseja introduzir o mínimo possível de novos templates, pois eles são muito caros e seu conjunto final de templates pré-existentes e novos pode não ter repetições.

**Qual é o menor número de templates que você precisa requisitar para que seja possível implantar qualquer aplicação com no máximo V núcleos?**

<br />

### Entrada
A primeira linha da entrada fornece o número de casos de teste, T. A seguir se encontram T casos de teste. Cada um consiste em uma linha com três valores separados por espaço C, D e V, seguidos por outra linha com D valores distintos separados por espaço, representando o número de núcleos nos templates disponíveis preexistentes, em ordem crescente.

### Saída
Para cada caso de teste, imprima uma linha contendo "Caso #x: y", em que x é o número do caso de teste (começando em 1) e y é o número mínimo de novos templates necessários, conforme descrito acima.

### Limites
1 ≤ T ≤ 100.
<br />Número de núcleos dos templates já existentes ≤ V.
<br /><br />Dataset pequeno
<br />C = 1.
<br />1 ≤ D ≤ 5.
<br />1 ≤ V ≤ 30.
<br /><br />Dataset grande
<br />1 ≤ C ≤ 100.
<br />1 ≤ D ≤ 100.
<br />1 ≤ V ≤ 109.

### Exemplo

<table border="0">
 <tr>
    <td><b style="font-size:20px">Entrada</b></td>
    <td><b style="font-size:20px">Saída</b></td>
 </tr>
 <tr>
    <td valign="top">
        4
        <br>1 2 3
        <br>1 2
        <br>1 3 6
        <br>1 2 5
        <br>2 1 3
        <br>3
        <br>1 6 100
        <br>1 5 10 25 50 100
    </td>
    <td valign="top">
            Case #1: 0
        <br>Case #2: 1
        <br>Case #3: 1
        <br>Case #4: 3
    </td>
 </tr>
</table>

No Caso #1, já é possível realizar o deploy de qualquer aplicação, porque o número necessário de núcleos (1, 2 e 3) pode ser gerado usando no máximo 1 de cada um dos templates disponíveis:<br />
    Aplicação de 1 núcleo = 1x 1 núcleo<br />
    Aplicação de 2 núcleos =  1x 2 núcleos<br />
    Aplicação de 3 núcleos =  1x 1 núcleo + 1x 2 núcleos<br />
<br />
No Caso #2, basta adicionar um template com 3 ou 4 cores -- qualquer que seja o escolhido, somente 1 novo template é necessário.
<br />
<br />
No Caso #3, a solução ideal é adicionar um template de 1 núcleo.
