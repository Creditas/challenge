class ProductType
  attr_reader :name
  def initialize
    @name = self.class
  end

  def shipping_label
    nil
  end

  def mail_body
    nil
  end

  def is_service?
    false
  end

  def send_discount?
    false
  end
end

class BookType < ProductType
  def shipping_label
    'Shipping label with no taxes'
  end
end

class ServiceType < ProductType
  def is_service?
    true
  end
  
  def mail_body
    'subcription activated'
  end
end

class PhysicalProductType < ProductType
  def shipping_label
    'default shipping label'
  end
end

class MediaType < ProductType
  def send_discount?
    true
  end
  
  def mail_body
    'You just won 10% discount'
  end
end