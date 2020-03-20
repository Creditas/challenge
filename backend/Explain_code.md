#### Alterações Realizadas no Código


Dois arquivos foram enviados e alterados para avaliação, sendo eles:
  - **bootstrap.py**
  - **test.py**

Considerando isso, serão apresentadas as linhas onde alguma alteração foi realizada no código anteriormente enviado. Iniciaremos falando sobre o bootstrap.py:

  - Nas linhas **2** e **3**, foram incluídas, respectivamente, as bibliotecas **random** e **string**,
  sendo que as mesmas foram utilizadas no código, e sua utilização será explicada no decorrer deste arquivo

  - Na linha **6** foi adicionada uma variável *paymentId* que representa um id de pagamento, sendo como uma chave primária para cada pagamento
  
  - Na linha **32**, a biblioteca *random* (anteriormente importada), é utilizada para a geração de 10 números aleatórios, concatenados, que servem como um identificador para cada pagamento. Em um caso real, deveria haver uma validação para ter a certeza de que esse número não foi utilizado anteriormente, visto que aqui gera um número randômico, mas que pode se repetir. Foi utilizado dessa forma apenas para teste.
  
  - Na linha **55** foi criada uma variável *ship_messages*, que é definida como uma lista vazia na linha **60**. Essa variável será útil para guardar todas as mensagens geradas na função de envio, para futuros testes.
  
  - A linha **70** traz uma alteração importante, visto que neste ponto é realizada a soma do valor do produto da ordem, ao total da ordem. Para montar um totalizador real considerando os preços dos produtos.
  
  - À partir da linha **77** é feita a criação de uma função que gera um novo *shipping label* que será posteriormente utilizado. Essa função possui dois parâmetros (item, notification), sendo um deles opcional (notification, valor padrão None). Se for passado um valor para o parâmetro *notification* ele irá mostrar a mensagem de "imposto"
  
  - As linhas **88** e **89** discorrem da criação de uma função *sendUserMail* que simula o envio de e-mails aos clientes
  
  - A linha **91** inicia a criação de uma função chamada *applyDiscount*, onde a função adiciona um objeto do tipo *Discount* à uma lista chamada *vouchers*, vinculada à cada cliente. Com isso, é possível ter uma simulação da criação de vouchers de desconto para a utilização em futuras compras pelo cliente.
  
  - À partir da linha **100** é feita a criação da função *ship*  que faz uma chamada de função diferente para cada tipo de produto, considerando as regras de cada um, definidas anteriormente.
  
  - A linha **128** foi alterada para retornar o valor do cadastro do produto, e não mais um valor padrão de 10. Isso foi feito juntamente com a alteração já citada, que soma o valor ao total da ordem.
  
  - Entre as linhas **130** e **136** temos a criação de uma classe *Discount* que trata das variáveis que simulam um voucher de desconto
  
  - Ainda, na classe *Product*, as linhas **143** e **146** discorrem da criação de um novo atributo, que será do valor dos produtos
  
  - A classe *Customer* começa na linha **161** e foi alterada para considerar alguns atributos (Personal Identification Number - pin, name, email e vouchers). Com esses atributos é possível fazer a criação de novos usuários.
  
  - Por último nesse arquivo, à partir da linha **177**, existe a definição da classe *Membership* que trata do controle de assinaturas do cliente, com a função para ativar uma nova assinatura (activateMemberships) e com a variável *activatedMemberships* que retorna as assinaturas do cliente.
  
  
  
Falando sobre o arquivo **test.py**, esse arquivo possui alguns testes unitários para maior segurança e qualidade do código desenvolvido:
  - As linhas **1** e **2** discorrem da importação de uma biblioteca para testes unitários, e da importação das classes do arquivo bootstrap.
  
  - A linha **10** faz a criaçã de um novo objeto de Customer, com os atributos da linha **4**
  
  - Entre as linhas **12** e **16** é feita a criação dos objetos dos produtos que serão adicionados à ordem, com atributos e nome, tipo e valor.
  
  - Entre as linhas **18** e **23** existe a adição dos produtos dentro de uma ordem definida e criada.
  
  - Da linha **25** até a linha ** 33** o pagamento de uma ordem com cartão de crédito, é simulado.

- As funções iniciadas nas linhas **35** e **46** são funções complementares, utilizadas no decorrer de código. Sendo que a primeira conta o pedaço de uma string que ela encontrar na lista passada por parâmetros. E a segunda busca o pedaço da string na lista, retornando se encontrou ou não.

-  À partir da linha **55** são realizados alguns testes unitários, sendo que o nome da função é o teste executado. Os testes estão separados dentro do código para maior organização dos testes e de futuras manutenções.