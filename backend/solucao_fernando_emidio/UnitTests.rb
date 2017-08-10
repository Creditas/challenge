#!/usr/bin/ruby -w
$LOAD_PATH << '.'

require 'Membership'
require 'CreditCard'
require 'Customer'
require 'Address'
require 'Product'
require 'OrderItem'
require 'Order'
require 'Invoice'
require 'Payment'
require "test/unit"
require 'test/unit/ui/console/testrunner'


class TesteHelper
    def self.createPaymentObject(productName, productType)
     
        foolano = Customer.new
        product = Product.new(name: productName, type: productType)
        order = Order.new(foolano, type: productType)
        order.add_product(product)
        
        #        puts order.orderProductType
        
        PaymentFactory.createPaymentClass(order,nil, nil, nil,nil)
    end
end

# use type to distinguish each kind of product: physical, product, digital, membership, etc.
class TestPaymentFactory < Test::Unit::TestCase
 
    def test_boookpayment_creation
    
        tipo = :book
        nome = 'Book Product'
        payment = TesteHelper.createPaymentObject(nome, tipo )
            
        assert_equal("PaymentBook", payment.class.name)    
    end
    
    def test_physicalpayment_creation
    
    tipo = :physical
    nome = 'Physical'
    
    payment = TesteHelper.createPaymentObject(nome, tipo )
    
    assert_equal("PaymentPhysical", payment.class.name)
    
    end
    
    def test_digitalpayment_creation
    
    tipo = :digital
    nome = 'Digital'
    
    payment = TesteHelper.createPaymentObject(nome, tipo )
    
    assert_equal("PaymentDigital", payment.class.name)
    
    end
    
    def test_membershippayment_creation
    
    tipo = :membership
    nome = 'Membership'
    
     payment = TesteHelper.createPaymentObject(nome, tipo )
    
    assert_equal("PaymentMembership", payment.class.name)
    
    end

end

class TestPaymentRules < Test::Unit::TestCase
    def test_bookbusinessrules_generated
        
         #Caso o pagamento seja um livro comum, você precisa gerar o shipping label com uma notificação de
        #que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
        
        tipo = :book
        nome = 'Book Product'
        payment = TesteHelper.createPaymentObject(nome, tipo )
        payment.pay()
            
        assert_equal(true, payment.shippingLabelGenerated)
        assert_equal(true, payment.taxesFree)
        
    end
    
    def test_physicalproductsbusinessrules_generated
        
       #Se o pagamento for para um item físico, você deverá gerar um shipping label para o mesmo ser colocado na caixa do envio;
        
        tipo = :physical
        nome = 'Physical Product'
        payment = TesteHelper.createPaymentObject(nome, tipo )
        payment.pay()
            
        assert_equal(true, payment.shippingLabelGenerated)        
        
    end
    
    def test_membershipbusinessrules_generated
        
       #Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
        
        tipo = :membership
        nome = 'Membership Product'
        payment = TesteHelper.createPaymentObject(nome, tipo )
        payment.pay()
            
        assert_equal(true, payment.order.customer.getServiceStatus)
        assert_equal(true, payment.userNotificatedByEmail)    
        
    end
    
    def test_digitalbusinessrules_generated
        
       #Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher
       #de desconto de R$ 10 ao comprador associado ao pagamento.
        
        tipo = :digital
        nome = 'Digital Product'
        payment = TesteHelper.createPaymentObject(nome, tipo )
        payment.voucherValue = 10
        payment.pay()
            
        assert_equal(true, payment.userNotificatedByEmail)    
        assert_equal(10, payment.order.customer.getVoucher())       
        
    end
end

class OrderRules < Test::Unit::TestCase
    def test_tipoproduto_diferente_tipoordem
        
        tipoOrdem = :digital
        tipoProduto = :book        
        
        foolano = Customer.new
        product = Product.new(name: "teste", type: tipoProduto)
        order = Order.new(foolano, type: tipoOrdem)
        
        ex = nil
        begin
            order.add_product(product)
        rescue Exception => e
            ex = e
        end
        
        assert_equal(ex.class.name, "InvalidProductException")
        #assert_raise(order.add_product(product), InvalidProductException)
    end
end

#Test::Unit::UI::Console::TestRunner.new(TestPaymentFactory, 3, STDOUT)

