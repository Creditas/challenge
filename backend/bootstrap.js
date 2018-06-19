class Payment {
  constructor({ authorizationNumber, amount, invoice, order, paymentMethod, paidAt } = {}) {
    this.authorizationNumber = authorizationNumber
    this.amount = amount
    this.invoice = invoice
    this.order = order
    this.paymentMethod = paymentMethod
    this.paidAt = paidAt
  }

  pay({ paidAt = new Date() } = {}) {
    this.order = this.order || { close: () => { console.log('Close!') }} // safety check
    this.amount = this.order.totalAmount || 0
    this.authorizationNumber = new Date().getMilliseconds()
    this.invoice = new Invoice({
      billingAddress: this.order.address,
      shippingAddress: this.order.address
    })

    this.paidAt = paidAt
    this.order.close({ paidAt })
  }

  isPaid() {
    return !!this.paidAt
  }
}

class Invoice {
  constructor({ billingAddress, shippingAddress, order }) {
    this.billingAddress = billingAddress
    this.shippingAddress = shippingAddress
    this.order = order
  }
}

class Order {
  constructor({ customer, attributes }) {
    this.items = []
    this.customer = customer

    const { orderItemClass, address } = attributes
    this.orderItemClass = orderItemClass || OrderItem
    this.address = address | new Address({ zipcode: '45678-979' })
  }

  addProduct({ product }) {
    this.items.push(new [this.orderItemClass]({ order: this, product }))
  }

  totalAmount() {
    return this.items.reduce((total, item) => { return total +  item.total}, 0)
  }

  close({ closedAt = new Date() }) {
    this.closeAt = closedAt
  }

  // remember: you can create new methods inside those classes to help you create a better design
}

class OrderItem {
 constructor({ order, product }) {
   this.order = order
   this.product = product
 }

 total() {
   return 10
 }
}

class Product {
  constructor({ name, type}) {
    // use type to distinguish each kind of product: physical, book, digital, membership, etc.
    this.name = name
    this.type = type
  }
}

class Address {
  constructor({ zipcode }) {
    this.zipcode = zipcode
  }
}

class CreditCard {
  static fetchByHashed({ code }) {
    return new CreditCard()
  }
}

class Customer {
  // you can customize this class by yourself
}

class Membership {
  // you can customize this class by yourself
}

// Book Example (build new payments if you need to properly test it)
const foolano = new Customer()
const book = new Product({ name: 'Awesome book', type: 'book' })
const bookOrder = Order(foolano)

bookOrder.addProduct({ book })

const paymentBook = new Payment({
  order: bookOrder,
  paymentMethod: CreditCard.fetchByHashed('43567890-987654367')
})

paymentBook.pay()
console.log(paymentBook.isPaid()) // < true
console.log(paymentBook.order.items[0].product.type)

// now, how to deal with shipping rules then?