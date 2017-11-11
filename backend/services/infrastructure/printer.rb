module Infrastructure
  class Printer
    def initialize(content)
      @content = content
    end

    def print
      puts '> Printer -----------'
      puts @content
      puts '---------------------'
    end
  end
end
