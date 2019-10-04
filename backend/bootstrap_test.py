'''
Test unit
'''

import unittest
import bootstrap as bt


class TestUnit(unittest.TestCase):
	def test_one(self):
		# This method test the classification of labels to product book
		foolano = bt.Customer('Fuluno de Tal', 'fulano@test.com')
		book = bt.Product(name='Awesome book', type='book')
		
		attributes = dict(
			costumer=foolano,
			product=book,
			address=None
		)
		product_notification2 = bt.Notification(attributes=attributes)
		product_notification2.ClassifyNotification()
		
		result = {bt.NotificationType.ShippingLabel, bt.NotificationType.AddressLabel, bt.NotificationType.NoTaxLabel}
		
		self.assertEqual(product_notification2.lst_notification_method, result, 'Result should be ' + str(result))


	def test_two(self):
		# This method test the Order Details when the product is digital
		foolano = bt.Customer('Fuluno de Tal', 'fulano@test.com')
		movie1 = bt.Product(name = 'Movie 1', type = 'digital')

		attributes = dict(
			costumer = foolano,
			product = movie1,
			address = None,
			lstItems = [bt.OrderItem(None, movie1)]
		)
		product_notification2 = bt.Notification(attributes=attributes)
		product_notification2.sendNotification()
		result = 'Product: ' + movie1.type + ' Name: ' + movie1.name	

		self.assertEqual(product_notification2.strNotificationEmail.split('\n')[0], result, 'Result should be ' + str(result))

		
if __name__ == '__main__':
    unittest.main()
