module Flows::BookType
  def book(payment, item)
    p '---Book Item Shipping Address'
    p payment.order.customer.name
    p payment.order.customer.address
    p 'Produto isento de impostos conforme disposto na Constituicao Art. 150, VI, d' if item.product.commom?
  end
end