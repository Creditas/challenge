## Overview


Decidi refatorar todo o arquivo de bootstrap, bem como o diagrama de classes inicial pois julguei que havia sobreposição de tarefas e responsabilidade entre os objetos. Na dúvida, foquei na simplicidade.  Classes como payment deram lugar ao metodo pay de payment_method, por exemplo. 

__Sobre classes removidas e design geral__

Encontrei alguma dificuldade na separação entre order_item e product. Se houvesse necessidade de adquirir, em uma mesma order, uma quantidade X de products, creio que seria util, porém, como o exemplo pede apenas um product por order, decidir remover a classe intermediaria.

No bootstrap.rb eu separei a criação de um usuario e a adição de um meio de pagamento. A razão para isso é ser mais fiel ao que seria um fluxo online: normalmente o usuário efetua um cadastro/login e, só depois é solicitado um meio de pagamento (para evitar formularios muito longos). O mesmo approach foi usado na adição de um shipping_address na order.

__Solucionando os ifs encadeados no delivery__

Para separar melhor a responsabilidade e diminuir acoplamento, preferi criar uma pequena estrutura de PubSub. Dessa forma, módulos "distantes" não precisariam ter referencias diretas entre si, bastando apenas a invocação de um evento. Usei isso, por exemplo, para adicionar o voucher em um usuario, dado a distancia entre esses dois fluxos. No arquivo pub_sub_wiring.rb é possivel ver as assinaturas de topicos. 

Preferi também seguir uma abordagem singleton/estatica para a criação de eventos, ao inves de injeção de dependencias. A razão para isso foi praticidade :-)

Vale ressaltar que isso poderia ser usado em qualquer interação de classes, porém preferi deixar apenas para os fluxos de "backoffice". Dessa forma seria mais simples debuggar algum problema no fluxo online e possível tornar toda a execução "pós compra" assincrona. 

__Cobertura de testes__

Creio haver pouca complexidade nas classes, portanto, na maior parte dos casos, os testes seriam apenas "set and get test", o que não é necessariamente util. Usei muitas vezes o "puts" para poder mostrar onde alguma ação maior seria executada, e também não me parece legal testar que o puts foi chamado.

Os testes podem ser rodados executando *rspec*.

__Sobre o nome Email_sender__

Concordo não ser um bom nome. Pensei em CommunicationProcessor, mas sofreria do mesmo mal.

__ Sobre o PubSub __

Conforme respondi por email, decidi manter o PubSub com a filtragem.

A estrutura de PubSub não contém a lógica de identificar qual processo deve ser executado, ela mantém um hub de eventos e interessados nos eventos. A parte de filtragem é uma abstração do que seria, por exemplo, um topic exchange em AMQP. 

Se realmente for vital remover a filtragem, poderiamos ter um topico para cada tipo de venda e os interessados se inscreverem nisso diretamente, mas eu acho essa solução menos elegante e mais invasiva. Um cliente interessado em receber qualquer tipo de venda precisaria se inscrever em varios tópicos para conseguir o que deseja.

Ou, se vocês preferirem ainda remover toda a estrutura de PubSub, poderia ser feito com strategy "manualmente", mas eu acho mais baixo nivel do que uma estrutura de eventos.

__Executando__

Testado com:

- ruby 2.3.1p112 (2016-04-26) [x86_64-linux-gnu]
- RSpec 3.7

Para rodar o fluxo de uma compra padrão, execute

- ruby bootstrap.rb

Para rodar os testes, execute

- rspec