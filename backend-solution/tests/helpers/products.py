from product import Product, ProductKind


physic_product = Product(
    name='physic_product',
    kind=ProductKind.physic,
    price=100
)

digital_product = Product(
    name='digital_product',
    kind=ProductKind.digital,
    price=200
)

book_product = Product(
    name='book_product',
    kind=ProductKind.book,
    price=50
)
