namespace rec DomainModel

open System
open System.Text.RegularExpressions

module CustomerModel = 
    
    type Cpf = Cpf of string
    let createValidCpf (cpfString:string) = 
        if cpfString.Length = 11 then 
            Some cpfString
        else None

    type EmailAddress = EmailAddress of email : string
    let createEmail (s : string) = 
        if Regex.IsMatch(s, @"^\S+@\S+\.\S+$") then Some(EmailAddress s)
        else None
    
    type CustomerAddress = {
        zipcode: string //todo: this can be more strict!
    }

    type Customer = 
        {   cpf : Cpf
            name : string
            email : EmailAddress }

module OrderModel = 
    open CustomerModel
    open PaymentModel
    open ProductModel
    
    //todo: make explicit order states
    type Order = 
        { orderId : System.Guid
          customer : Customer
          items : OrderItem list
          shippingAddress : CustomerAddress
          closeDate : DateTime option
          orderFullfilmentStatus: OrderFulfillmentStatus
          payment : Payment }

    
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
          listPrice : decimal
          sellingPrice : decimal }

    type Invoice = 
        { billingAddres : CustomerAddress
          shippingAddress : CustomerAddress
          order : Order }

module ProductModel =
    
    type PhysicalProducItemType = Book | Other
    
    type DigitalProductItemType = DigitalMedia | Membership
    
    type ProductType = 
        | PhysicalItem of PhysicalProducItemType
        | DigitalItem of DigitalProductItemType

    type Product = 
        { productId : string
          itemType : ProductType
          listPrice : decimal }
    
module PaymentModel = 
    
    type PaymentMethod = 
        | CreditCard of hashed : string
        | Debit

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
    open RestrictedStrings
    open OrderModel
    open CustomerModel
    
    type PhysicalItemDeliveryRequest = 
        { orderId : Guid
          orderItem : OrderItem
          customer : Customer
          shippingLabelContent : String50
          shippingLabelAdditionalContent : String100 option }
    
    type DigitalDeliveryWorkflow = 
        | MembershipActivationAndEmail
        | EmailNotificationAndVoucher
    
    type DigitalItemDeliveryRequest = 
        { orderId : Guid
          orderItem : OrderItem
          customer : Customer
          deliveryWorkflow : DigitalDeliveryWorkflow }
    
    let processPhysicalOrderItem order item = 
            printfn "processando ordem para item físico"
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
            printfn "processando livro físico"
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
        printfn "processando ativação de assinatura"
        let request = 
            {   orderId = order.orderId
                orderItem = item
                customer = order.customer
                deliveryWorkflow = MembershipActivationAndEmail
            }
        DeliveryService.deliverDigitalItem request
    
    let processDigitalMediaOrderItem order item = 
        printfn "processando entrga mídia digital"
        let request = 
            {   orderId = order.orderId
                orderItem = item
                customer = order.customer
                deliveryWorkflow = EmailNotificationAndVoucher
            }
        DeliveryService.deliverDigitalItem request


module DeliveryService = 
    open OrderItemProcessingModel
    
    let deliverPhysicalItem deliveryRequest =
        printfn "%s" ("Sending digital Item for order: " + deliveryRequest.orderId.ToString() )

    let deliverDigitalItem deliveryRequest =
        match deliveryRequest.deliveryWorkflow with
            | MembershipActivationAndEmail -> printfn "todo"
            | EmailNotificationAndVoucher -> printfn "todo"


module NotificationServices = 
    
    let sendEmail message = printfn "todo"
    let sendSms message = printfn "todo"
    let sendPushNotification message = printfn "todo"


module VoucherServices = 
    
    let generateVoucher request = printfn "todo"
    let validateVoucher request = printfn "todo"