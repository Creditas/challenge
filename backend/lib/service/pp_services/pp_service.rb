class PPService
  def initialize(invoice)
    @invoice = invoice
  end

  def serve
    puts "#{self.class.to_s}"
  end
end
