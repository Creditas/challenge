# join all the files mainly for testing
$LOAD_PATH << File.dirname(__FILE__)
require 'models/address'
require 'models/credit_card'
require 'models/customer'
require 'models/invoice'
require 'models/membership'
require 'models/order_item'
require 'models/order'
require 'models/payment'
require 'models/product'
require 'models/voucher'
require 'shipping/separate_service'
