- Todo processamento começa na classe PaymentHandler. Ali eu instancio o IPaymentProcessor de acordo com o produto da ordem (cf. PaymentProcessorAttribute, que decora as classes de produtos—que tomei liberdade de criar, eliminando a ideia de um "ProductType"—, definindo assim quais classes processam os pagamentos do produto);

- Minha implementação foi feita em C# e, por isso, tira vantagem do que a linguagem oferece. O princípio, porém, poderia ser reaproveitado caso centralizássemos o "switch" principal na classe PaymentProcessorFactory, por exemplo. Com o uso do PaymentProcessorAttribute, no entanto, elimina-se a necessidade de if/elses ou switches completamente;

- O ideal é que todos os IPaymentProcessor fossem instanciados via dependency injector. Como isso implicaria uso de um framework externo e acarretaria em maior complexidade, achei que calhava criar construtores alternativos para que os parâmetros fossem opcionais (mesmo que isso aumentasse o acomplamento);

- Outro ponto que cogitei foi a criação de um repositório para obter o cartão de crédito a partir do hash;

- Não gostei muito da ideia de criar a mensagem de email no próprio PaymentProcessor. Acho que poderia haver um repositório de email bodies, um serviço responsável por construir essas mensagens... talvez uma classe EmailMessage com "to", "subject" etc também fosse uma solução melhor, mas sacrifiquei estas decisões em razão da simplicidade.