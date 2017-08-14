# frozen_string_literal: true

# Class responsible for print the label for a shipping
class PrinterService
  def self.print(labels)
    labels.each do |label|
      "Printing label: #{label}"
    end
  end
end
