A solução foi implementada nos arquivos

`bootstrap.rb`
    A função **process** presente no **Payment** que chamará as formas de pagamento para cada item
    Os atributos _voucher_ e _member_ no **Customer** que são respectivamente um array de valores que o cliente possui de desconto e um boolean sobre o cliente ser associado
    A função **member?** no **Customer** para poder confirmar a associação do cliente
    A função **giveVoucher** no **Customer** que serve para incluir um ticket de desconto para o usuário
    Adicionados os atributos _name_ e _email_ em **Membership** e a função **activate** para alterar o valor do atributo _member_ do cliente

`email.rb`
    A função **sendMail** para poder encaminhar email com o assunto,destinatário e mensagem informados

`shipping.rb`
    Possui as classes **FreeShippingLabel** e **PaidShippingLabel** que seguem as regras presentes no README.md.
    
`paymentHandler.rb`
    A classe mãe **paymentHandler** filtra qual handler deve ser utilizado de acordo com o tipo do item informado
    As classes **BookHandler**,**MembershipHandler**,**PhysicalHandler** e **DigitalHandler** implementam a função **conclude** seguindo as regras informadas no README.md para o pagamento dos diversos tipos de pedidos

