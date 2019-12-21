module Domain
  module Commands
    class NullNextCommand

      def execute
        true
      end

      def unexecute
        nil
      end
    end
  end
end
