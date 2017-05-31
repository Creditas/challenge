namespace rec SimpleDomainModel

open System
open System.Text.RegularExpressions


module OrderModel = 
    open CustomerModel
    open PaymentModel
    open ProductModel
    open CommonTypes.CurrencyTypes
    
    /// This is a representation of an order that might have come from one of multiple stores.
    type Order = 
        { orderId : System.Guid
          customer : Customer
          items : OrderItem list
          shippingAddress : CustomerAddress
          closeDate : DateTime option
          orderFullfilmentStatus: OrderFulfillmentStatus
          payment : Payment 
          storeOfOrigin: Store}
          
    type Store = UsinaDoSom | SaraivaMegastore
    
    type OrderFulfillmentStatus = 
        | AwaitingProcessing
        | ProcessingPayment
        | Shipped
        | Delivered
        | Declined of reason : OrderDeclinationReason

    type OrderDeclinationReason =
        | OutOfStock
        | PaymentRejected
        | OtherReason

    type OrderItem = 
        { orderItemId : int
          orderId: System.Guid
          product : Product
          listPrice : decimal<BRL>
          sellingPrice : decimal<BRL> }

    type Invoice = 
        { invoiceId: int
          invoiceDate: DateTime
          billingAddres : CustomerAddress
          shippingAddress : CustomerAddress
          order : Order }

module CustomerModel = 
    
    /// In Brazil this number is used to uniquely indentify people. It's an identity document.
    type Cpf = 
        | Cpf of string
    
    let createValidCpf (cpfString : string) = 
        if cpfString.Length = 11 then Some cpfString
        else None
    
    type EmailAddress = 
        | EmailAddress of email : string
    
    let createEmail (s : string) = 
        if Regex.IsMatch(s, @"^\S+@\S+\.\S+$") then Some(EmailAddress s)
        else None
    let unwrapEmail (EmailAddress e) = e
    
    type CustomerAddress = { zipcode : string } //maybe this can be more restrictive...
    
    type Customer = 
        { cpf : Cpf
          name : string
          email : EmailAddress }


module ProductModel =
    open CommonTypes.CurrencyTypes
    
    type PhysicalProducItemType = Book | Other
    
    type DigitalProductItemType = DigitalMedia | Membership
    
    type ProductType = 
        | PhysicalItem of PhysicalProducItemType
        | DigitalItem of DigitalProductItemType

    //note: of course, this can be as complicated as wanted. It's not needed to invest in product modeling right now.
    type Product = 
        { productId : string
          productName : string
          itemType : ProductType
          listPrice : decimal<BRL> }
    
module PaymentModel = 
    
    type PaymentMethod = 
        | CreditCard of hashed : string
        | Debit
        | BrazilianBoleto
        | Paypal
        | Pagseguro

    type PaymentProcessingStatus = 
        | New
        | AwaitingPayment of dateOfOrderSubmisssion : DateTime
        | Paid of dateApproved : DateTime
        | Rejected of dateRejected : DateTime

    type Payment = 
        { paymentId : System.Guid
          authorizationNumber : string
          amount : decimal
          paymentStatus : PaymentProcessingStatus
          paymentMethod : PaymentMethod }
    
    //todo: here we would improve the payment model with more logic and probably, some services.
    //todo: here we could impose payment restrictions based on types of acquisitions
    
    
 
module OrderFullfilmentModel =

    open OrderModel
    open ProductModel 
    open OrderItemProcessingModel


    let startOrderFullfilment (order:Order) = 
        
        let rec handleOrderItems (orderItems: OrderItem list) =
            match orderItems with 
            | [] -> printfn "Itens processados"
            | currentItem::restOfItems -> 
                match currentItem.product.itemType with 
                    | PhysicalItem item  -> 
                        match item with
                            | Book -> processBookOrderItem order currentItem
                            | Other -> processPhysicalOrderItem order currentItem
                    | DigitalItem item -> 
                        match item with 
                            | DigitalMedia -> processDigitalMediaOrderItem order currentItem
                            | Membership -> processMembershipOrderItem order currentItem
                handleOrderItems restOfItems

        handleOrderItems order.items


module OrderItemProcessingModel = 
    open CommonTypes.RestrictedStrings
    open OrderModel
    open CustomerModel
    open CommonTypes.CurrencyTypes
    
    type PhysicalItemDeliveryRequest = 
        { orderId : Guid
          orderItem : OrderItem
          customer : Customer
          shippingLabelContent : String50
          shippingLabelAdditionalContent : String100 option }
    
    type DigitalDeliveryWorkflow = 
        | MembershipActivationAndEmail
        | EmailNotificationAndVoucher of voucherValue: decimal<BRL>
    

    type DigitalItemDeliveryRequest = 
        { orderId : Guid
          orderItem : OrderItem
          customer : Customer
          notificationSubject: String50
          notificationMessage: String
          deliveryWorkflow : DigitalDeliveryWorkflow }
          
    
    let processPhysicalOrderItem order item = 
            printfn "processing order item: common physical item..."
            let request = 
                { orderId = order.orderId
                  orderItem = item
                  customer = order.customer
                  shippingLabelContent = 
                      match createString50 ("Label for Order " + order.orderId.ToString()) with
                      | Some x -> x
                      | None -> failwith "Invalid Shipment Label Content"
                  shippingLabelAdditionalContent = None }
            DeliveryService.deliverPhysicalItem request


    let processBookOrderItem order item = 
            printfn "processing order item: physical book..."
            let request = 
                    { orderId = order.orderId
                      orderItem = item
                      customer = order.customer
                      shippingLabelContent = 
                          match createString50 ("Label for Order " + order.orderId.ToString()) with
                          | Some x -> x
                          | None -> failwith "Invalid Shipment Label Content"
                      shippingLabelAdditionalContent = 
                          match createString100 ("Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.") with
                          | Some x -> Some x
                          | None -> failwith "Invalid Supplementary Shipment Label Content"}
            DeliveryService.deliverPhysicalItem request



    let processMembershipOrderItem order item = 
        printfn "processing order item: membership activation..."
        let request = 
            {   orderId = order.orderId
                orderItem = item
                customer = order.customer
                deliveryWorkflow = MembershipActivationAndEmail
                notificationSubject = Option.get  (createString50 "Membership Activation")
                notificationMessage = "Notification message for membership activation."
            }
        DeliveryService.deliverDigitalItem request
    
    let processDigitalMediaOrderItem order item = 
        printfn "processing order item: digital media delivery..."
        let request = 
            {   orderId = order.orderId
                orderItem = item
                customer = order.customer
                deliveryWorkflow = EmailNotificationAndVoucher 10.0M<BRL> //passing the value of the voucher - strongly typed value
                notificationSubject = Option.get  (createString50 "Digital Media Delivery")
                notificationMessage = "Notification message informing availability of digital media."
            }
        DeliveryService.deliverDigitalItem request


module DeliveryService = 
    open OrderItemProcessingModel
    open NotificationServices
    open MembershipServices
    open VoucherServices
    
    let deliverPhysicalItem deliveryRequest = 
        printfn "%s" <| "Sending physical Item for order: " + deliveryRequest.orderId.ToString()
    
    let requestMembershipActivation (request : DigitalItemDeliveryRequest) = 
        activateMembership request
        request
    
    let notifyUserViaEmail (request : DigitalItemDeliveryRequest) = 
        let message = 
            { destination = request.customer.email
              subject = request.notificationSubject
              message = request.notificationMessage }
        sendEmail message
        request
    
    let requestVoucherGeneration (request : DigitalItemDeliveryRequest) voucherValue = 
        generateVoucher request voucherValue
        request
    
    let deliverDigitalItem deliveryRequest = 
        match deliveryRequest.deliveryWorkflow with
        | MembershipActivationAndEmail -> 
            printfn "starting workflow: membership activation and e-mail notification..."
            deliveryRequest
            |> requestMembershipActivation
            |> notifyUserViaEmail
            |> ignore
        | EmailNotificationAndVoucher voucherValue-> 
            printfn "starting workflow: e-mail notification and voucher generation..."
            deliveryRequest
            |> notifyUserViaEmail
            |> requestVoucherGeneration <| voucherValue
            |> ignore


module NotificationServices = 
    open CommonTypes.RestrictedStrings
    open CustomerModel
    
    type EmailMessage = 
        { destination : EmailAddress
          subject : String50
          message : string }
    
    let sendEmail emailMessage = 
        let destination = unwrapEmail emailMessage.destination
        let subject = unwrapString50 emailMessage.subject

        printfn "%s" <| "Sending notificatio via e-mail to: " + destination + " with subject: " + subject 
    
    let sendSms smsMessage = failwith "not implemented"
    let sendPushNotification pushNotificationMessage = failwith "not implemented"

module MembershipServices = 
    
    let activateMembership request = 
        let user = request.customer.name
        let item = request.orderItem.product.productName
        printfn "Activating membership for user %s with for item %s" user item

    
    let checkMembership request = failwith "not implemented"

module VoucherServices = 
    
    let generateVoucher request voucherValue = 
        let user = request.customer.name
        let item = request.orderItem.product.productName
        let value = decimal voucherValue 
        printfn "Generating voucher for user %s regarding item %s of %M R$" user item value



    let validateVoucher request = failwith "not implemented"
    let redeemVoucher request = failwith "not implemented"