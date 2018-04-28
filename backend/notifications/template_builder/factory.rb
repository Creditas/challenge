class Notifications::TemplateBuilder::Factory
  def self.create(payment)
    case payment.order.items.first.product.type
      when :membership
        Notifications::TemplateBuilder::Templates::MembershipTemplate.new(payment)
      when :book
        Notifications::TemplateBuilder::Templates::BookTemplate.new(payment)
      when :digital
        Notifications::TemplateBuilder::Templates::DigitalTemplate.new(payment)
      else
        fail ArgumentError, "template not supported"
    end
  end
end
