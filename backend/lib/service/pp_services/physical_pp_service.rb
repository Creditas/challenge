require_relative '../pp_services/pp_service'
require_relative '../post_mail_service'
module Service
  class PhysicalPPService < PPService
    def serve
      PostMailService.new.deliver("")
    end
  end
end
