require 'require_all'
require_all 'lib'

beltrano = Customer.new('Beltrano', 'beltrano.silva@creditas.com.br')
xbox = Product.new(name: 'Console Xbox One', price: 1820.00,type: :physical)
digital = Product.new(name: 'Music: The Unforgiven - Metallica', price: 18.00, type: :digital)
membership = Product.new(name: 'Signature monthly Internet 100MB', price: 87.90,type: :membership)
book = Product.new(name: 'Domain-Driven Design: Tackling Complexity in the Heart of Software', price: 58.00, type: :book)
