class Notification
    def send_notification(to:,subject:,message:)
        raise NotMethodError
    end
end 


class EmailNotification < Notification
    def send_notification(to:,subject:,message:)
       puts "send email > to:" + to + " subject: " + subject + " message:" + message  
    end
end 