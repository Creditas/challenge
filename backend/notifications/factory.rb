class Notifications::Factory
  def self.create(type)
    case type
      when :email
        Notifications::Providers::Email.new
    end
  end
end
