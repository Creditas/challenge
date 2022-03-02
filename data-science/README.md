# Desafio Data Science - Creditas

## Introdução

Neste desafio apresentamos um problema real de Ciência de dados aqui da Creditas. Esperamos uma solução que possa ser apresentada para stakeholders, entre eles o próprio CEO. 

## O problema

A Creditas precisa entender como podemos priorizar os clientes de maneira que os clientes que tenham a maior probabilidade de serem enviados para a análise de crédito sejam atendidos primeiro.

### Contexto sobre o fluxo do cliente

Após preencher os dados no site da Creditas, solicitando um empréstimo com garantia de automóvel, o cliente passa por um conjunto de regras automáticas para saber se ele será pré-aprovado. Em caso positivo esse cliente pode prosseguir no fluxo e preencher uma quantidade maior de dados (ficha cadastral), o que irá agilizar o seu processo de atendimento. Em caso negativo, esse cliente fica impedido de fazer uma solicitação de empréstimo. Independente de preencher a ficha cadastral, o cliente pode ser atendido e um consultor de negócios fará a avaliação se a pessoa deve ou não ser enviada para análise.

### Objetivo

Mais detalhes sobre os campos do desafio podem ser encontrados no arquivo `description.csv`. 

O seu objetivo é construir um modelo de classificação que retorne a probabilidade que um cliente tem de ser enviado para análise de crédito **dado que ele foi pré-aprovado** para o empréstimo com garantia de automóvel. Contudo, apenas a construção do modelo não basta, já que é necessário que você realize a apresentação do mesmo para a equipe de Operações da Creditas e o time de Marketing e Analytics. Eles querem entender porque o seu modelo é melhor do que a decisão atual de priorização e para tal, é necessário que você realize a avaliação do modelo com métricas de classificação e avaliação dos atributos mais importantes para o modelo.


## Os dados
- Todos os dados necessários para modelagem estão no arquivo `dataset.csv`. A descrição dos dados está no arquivo `description.csv`.
- Nesta base estão todos os clientes que entraram no site, mesmo aqueles que não foram pré-aprovados, sendo necessário filtrar os clientes válidos.


## O que você precisa fazer

Utilizando um jupyter notebook, apresente a sua solução em python.

1. Apresentar uma **Análise Exploratória dos Dados** (Exploratory Data Analysis / EDA) com gráficos.
2. À partir da EDA acima, explicar decisões de pré-processamento, limpeza, e remoção de dados. 
3. Construir um modelo de classificação que retorne a probabilidade que um cliente tem de ser enviado para análise de crédito **dado que ele foi pré-aprovado** para o empréstimo com garantia de automóvel. O uso de bibiliotecas é livre, mas você deve ser capaz de explicar o conceito dos algoritmos utilizados de maneira sucinta, ou seja, como eles funcionam e porque os escolheu para uso.
4. Além do desenvolvimento da solução é necessário mostrar métricas de avaliação da solução desenvolvida. Pense em métricas que fazem sentido para o problema em questão e na particularidade destes dados.
5. Avaliação e interpretabilidade do modelo. Você deve responder quais variáveis são importantes para o modelo construído e porquê.
6. Você deve garantir que o seu código seja reproduzível e explicar como deveremos rodá-lo em um arquivo `.md`.


## Como entregar o desafio?
Para nos enviar seu código, você pode:
- Comprimir os arquivos do seu desafio em formato `.zip` ou equivalente.
- Mandar um email para `ds-squad@creditas.com.br`.


### Dicas
 - Os dados não estão normalizados. O cliente pode ter preenchido valores incomuns em alguns campos, como a renda.
 - Alguns dados estão faltando. Faz parte do exercício entender como que os dados faltantes serão tratados (ou justificar se não o serão).
 - Você poderá usar dados externos, desde que explique quais dados usou e como o fez.
 - Valorizamos a objetividade, portanto seja sucinto em suas explicações e vá direto ao ponto.
 - Acreditamos que uma boa avaliação pós modelagem é essencial! Não adianta só fazer um modelo e não entender o que está acontecendo ali.
 - Não há um limite fixo de tempo, porém acreditamos que é possível resolver o desafio em uma semana com dedicação parcial. Caso precise de mais tempo, entre em contato com o time pelo email: `ds-squad@creditas.com.br`
