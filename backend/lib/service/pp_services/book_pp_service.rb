require_relative 'pp_service'
class BookPPService < PPService
  def serve
    super
    PostMailService.new.deliver("Item isento de impostos conforme disposto na Constituição Art. 150, VI, d")
  end
end
