module Sales
  module Rules
    class Rule
      attr_reader :name, :action, :conditions

      def initialize(name:, action:, conditions:)
        @name = name
        @action = action
        @conditions = conditions
      end

      def applicable?(order)
        failed_conditions = @conditions.reject do |condition|
          condition.applicable?(order)
        end

        failed_conditions.empty?
      end

      def apply(order)
        @action.execute(order)
      end
    end

    class Manager
      attr_reader :rules

      def initialize(rules = [], &block)
        @rules = rules

        block.call(self) unless block.nil?
      end

      def apply(order)
        applicable_rules = @rules.select { |rule| rule.applicable?(order) }
        applicable_rules.each { |rule| rule.apply(order) }

        order
      end

      def <<(rule)
        @rules << rule
      end
    end
  end
end