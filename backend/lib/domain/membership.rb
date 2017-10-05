module Domain
  class Membership
    attr_reader :name, :active
    
    def initialize(name, active = false)
      @name = name
      @active = active
    end

    def activate
      @active = true
    end
  end
end
