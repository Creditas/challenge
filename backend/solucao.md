A Solução foi implementada na sua essencia nos arquivos
- paymentservice.rb  ( Processador de pagamento de acordo com tipo de produto)
- notification.rb ( classes de notificação  / email)
- shipping_label.rb (classes de impressão de shipping_label)
- bootstrap.rb - alteração / customização de classes customer(novos atributos) e membership(novos atributos) e payment (addVoucher)

Observação : 
Para este processamento , uma outra alternativa seria a aplicação de CQRS - poderiamos ter quebrado em eventos e usar EventSource/EventStore 
, e termos um Middleare de mensageria para armazenar e processar este evento em segundo momento
