class Helpers::Voucher
  include Singleton


  def create(type)
    {
      code: (0...8).map { (65 + rand(26)).chr }.join,
      discount: self.get_discount(type)
    }
  end

  def get_discount(type)
    case type
    when :digital_payment
        10
      else
        0
    end
  end
end
