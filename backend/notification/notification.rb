module Notification
    class EmailNotification 
        def send_notification(to:,subject:,message:)
           puts "send email > to:" + to + " subject: " + subject + " message:" + message  
        end
    end     
end
