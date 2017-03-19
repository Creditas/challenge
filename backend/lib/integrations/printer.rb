class Printer
  def self.print(content)
    return true if ENV['RUBY_ENV'] == 'test'

    puts "--- PRINTING START ---"
    puts content
    puts "---- PRINTING END ----\n\n"
  end
end
