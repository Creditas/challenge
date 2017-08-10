#!/usr/bin/ruby -w

class Customer
    
    @serviceActivated = false
    @voucherGranted = 0
      
    def initialize()
        @name = ""
        @email = ""
    end
    
    def activateService()
        @serviceActivated = true
    end
    
    def getServiceStatus
        @serviceActivated
    end
    
    def setVoucher(value)
       @voucherGranted = value
    end
    
    def getVoucher()
       @voucherGranted
    end
        
end