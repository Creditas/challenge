from unittest import TestCase, main
from bootstrap import Payment, Invoice, Order, OrderItem, Product, Address
from bootstrap import CreditCard, Customer, Membership

from bootstrap import Physical, Membership, Book, Digital


class TestBase(TestCase):
    """
    Classe base para inicialização da suites de testes
    """
    def setUp(self):
        self.customer = Customer()
        self.order = Order(self.customer)
        
        self.pan = Product(name='Awsome pan', type=Physical())
        self.netflix = Product(name='Video streaming service', type=Membership())
        self.book = Product(name='Awsome book', type=Book())
        self.show = Product(name='AC/DC Live in Argentina', type=Digital())

        self.customer.email = 'teste@teste.com'
        
    def tearDown(self):
        pass


class TestCompra(TestBase):
    """
    Classe de testes para compras de itens, verifica se o procedimento de entrega está correto.
    """
    def test_compra_item_fisico(self):
        self.order.add_product(self.pan)
        self.pan.type.shipping(self.order)

        # Verifica se o produto possui etiqueta de entrega preenchida
        self.assertEqual(self.order.address, self.pan.type.label)

        attributes = dict(
            order=self.order,
            payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
        )
        payment = Payment(attributes = attributes)
        payment.pay()

        self.assertTrue(payment.is_paid())

    def test_compra_assinatura_de_servico(self):
        self.order.add_product(self.netflix)
        # Possui email cadastrado para envio de aviso?
        self.assertIsNotNone(self.customer.email)

        self.netflix.type.shipping(self.order)
        # Tornou o assinante ativo?
        self.assertTrue(self.netflix.type.is_membership_active())

        attributes = dict(
            order=self.order,
            payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
        )
        payment = Payment(attributes = attributes)
        payment.pay()

        # Está pago?
        self.assertTrue(payment.is_paid())

    def test_compra_de_um_livro(self):
        self.order.add_product(self.book)
        self.book.type.shipping(self.order)

        # Adicionou o aviso de isenção?
        self.assertEqual(self.book.type.label,
            str(self.order.address) +
            ' Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.')

        attributes = dict(
            order=self.order,
            payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
        )
        payment = Payment(attributes = attributes)
        payment.pay()

        # Está pago?
        self.assertTrue(payment.is_paid())
    
    def test_compra_uma_midia_digital(self):
        self.order.add_product(self.show)
                
        # Possui email cadastrado para envio de aviso?
        self.assertIsNotNone(self.customer.email)

        self.show.type.shipping(self.order)
        # Adicionou voucher ao pedido?
        # Somente uma vez
        self.assertEqual(self.order.total_amount(), 0)

        attributes = dict(
            order=self.order,
            payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
        )
        payment = Payment(attributes = attributes)
        payment.pay()

        # Está pago?
        self.assertTrue(payment.is_paid())

    def test_compra_duas_midias_digitais(self):
        self.order.add_product(self.show)
        self.order.add_product(self.show)
        
        # Possui email cadastrado para envio de aviso?
        self.assertIsNotNone(self.customer.email)

        self.show.type.shipping(self.order)
        # Adicionou voucher ao pedido?
        # Somente uma vez
        self.assertEqual(self.order.total_amount(), 10)

        attributes = dict(
            order=self.order,
            payment_method=CreditCard.fetch_by_hashed('43567890-987654367')
        )
        payment = Payment(attributes = attributes)
        payment.pay()

        # Está pago?
        self.assertTrue(payment.is_paid())

if __name__ == '__main__':
    main()
