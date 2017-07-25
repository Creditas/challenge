# Solução ao desafio de data-science da Creditas

## Objetivo
Construir um modelo de predição para a probabilidade de um cliente ser enviado para a análise (coluna `sent_to_analysis`), dado que ele já foi pré-aprovado (coluna `pre_approved` igual a 1).

## Sobre o conjunto de dados (`../dataset.csv`)
O conjunto de dados original possui 22 colunas numéricas e 13 colunas categóricas. Entre as colunas numéricas, `id` e `Unnnamed: 0` podem ser consideradas colunas de indexação (uma por cliente). Além disso, uma das colunas é composta apenas de valores `null` (`loan_term`) e por isso não a utilizamos no modelo.

A maioria das colunas categóricas são nominais. Uma exceção é `education_level`, que pode ser tratado como uma categoria ordinal.

Uma ferramenta que me ajudou a visualizar os dados, além de usar `pandas` no `Jupyter`, foi a plataforma web do [`facets`](https://pair-code.github.io/facets/).

## Solução implementada
Minha solução pode ser dividida em dois passos:

* pré-processamento do dataset;

* preparação do conjunto de dados para o treinamento;

* construção do pipeline usado para fazer o treinamento do modelo de predição.

### Instruções
Instalar as bibliotecas requeridas:
    pip install -r requirements.txt

É necessário fazer download dos dados do nltk. Uma maneira de fazer isso é usar o comando:
    python -m nltk.downloader all

Para treinar o modelo:
    python run_model.py --train_file </path/to/train_file>

Para testar o modelo:
    python run_model.py --train_file </path/to/train_file> --test_file </path/to/test_file>

### Pré-processamento do dataset
O pré-processamento do dataset envolveu as seguintes tarefas:

* remoção das entradas não pré-aprovadas (`pre_approved != 1`);

* validação do estado (`state`) a partir do código postal (`zip_code`):
    * utilizei os dados do site dos Correios. Existe uma correspondência entre o primeiro dígito e o estado. Essa relação não é única, de forma que nem sempre possível determinar o estado a partir do dígito, mas é possível verificar se o estado é válido sob o ponto de vista do código postal;
    * essa etapa gera uma coluna a mais (`valid_state`), que contém 0 ou 1 de acordo com a validade do estado ao se usar o código postal;

* transformação do nível educacional (`educational_level`) em uma coluna numérica, ordenada pelo grau de escolaridade;

* uso de dados da tabela FIPE para criar coluna com valor do automóvel que será usado como garantia:
    * foi utilizada uma api disponibilizada em [http://fipeapi.appspot.com/](http://fipeapi.appspot.com/) para baixar os dados das marcas, modelos e preços;
    * nessa etapa, é gerada a coluna `auto_price`, com o preço do automóvel no momento da consulta (julho/2017);

* criação de coluna `discarded` para informar se o pedido do cliente foi descartado posteriormente:
    * usa-se a coluna `discard_reason` para gerar essa coluna: ela recebe valor 0 quando não houve descarte e 1 quando `discard_reason`tem valor não nulo;

* processamento da coluna `landing_page` em duas colunas, com a página raiz (`first_landing_page`) e a última página (`last_landing_page`);

* agrupamento dos motivos informados em `informed_purpose` em categorias fixas:
    * 7 categorias foram consideradas: `dívidas`, `investimento`, `viagem`, `reforma`, `casamento`, `aquisições` e `outros`;

* remoção de colunas com todos os valores nulos.

### Preparação do conjunto de dados para treinamento
Para transformar as variáveis categóricas em numéricas, utilizei um simples label encoder e apliquei o standard scaler para normalizar os valores.

Para que os outliers não impactassem o tratamento dos dados faltantes, seguiu-se três passos:

* remoção de outliers (foi considerado outlier o que estava fora de um intervalo pré-determinado, que tem como base os percentis 0.15 e 0.85 de cada coluna), transformando-os em valores nulos;

* preenchimento dos dados faltantes utilizando o algoritmo de clusterização k-means;

* inserção de volta dos outliers na coluna.

### Treinamento do modelo
Para treinar o modelo, foram testados três algoritmos de classificação: regressão logística, árvore de decisão e random forest. Visando a otimização de alguns hiperparâmetros (para alguns valores), foi utilizado o `grid_search` com validação cruzada em 5 folds. A otimização foi feita utilizando a métrica [`roc_auc_score`](http://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_auc_score.html), que mede a área abaixo da curva ROC. Além disso, antes de fazer a classificação, utilizou-se um algoritmo [`SelectKBest`](http://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.SelectKBest.html) para selecionar as melhores features do conjunto de dados de treinamento.

#### Resultado
Como seria de se esperar, o melhor algoritmo foi o `random forest` e o treinamento foi bastante rápido. O melhor modelo teve score `AUC` de aproximadamente `0.94`.

Algumas colunas parecem especialmente importantes para a classificação e removê-las tem um grande impacto no resultado. Em especial, a coluna `marital_status` parece ser bastante relevante, apesar de ter cerca de 97% de valores nulos.

## Possíveis melhorias para o futuro
* utilizar o one-hot-encoding para transformar as variáveis categóricas nominais em variáveis numéricas;

* testar mais hiperparâmetros ou mais ranges de hiperparâmetros;

* fazer match por similaridade entre modelo do carro fornecido na coluna `auto_model` e o modelo da tabela fipe, pois nem todos os nomes estão iguais;

* melhorar geração de predições adhoc.
