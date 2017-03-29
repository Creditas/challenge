namespace DomainModel

open System
open System.Text.RegularExpressions

module CustomerTypes = 
    
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

open CustomerTypes
module OrderProcessingModel = 

    type Customer = 
        {   cpf : Cpf
            name : string
            email : EmailAddress }

    type PhysicalProducItemType = Book | Other
    type DigitalProductItemType = DigitalMedia | Membership
    type ProductType = 
        | PhysicalItem of PhysicalProducItemType
        | DigitalItem of DigitalProductItemType

    type Product = 
        { productId : string
          itemType : ProductType
          listPrice : decimal }

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

    type OrderDeclinationReason =
        | OutOfStock
        | PaymentRejected
        | OtherReason

    type OrderFulfillmentStatus = 
        | AwaitingProcessing
        | ProcessingPayment
        | Shipped
        | Delivered
        | Declined of reason : OrderDeclinationReason

    type Order = 
        { orderId : System.Guid
          customer : Customer
          items : OrderItem list
          shippingAddress : CustomerAddress
          closeDate : DateTime option
          payment : Payment }

    and OrderItem = 
        { orderItemId : int
          product : Product
          listPrice : decimal
          sellingPrice : decimal }

    type Invoice = 
        { billingAddres : CustomerAddress
          shippingAddress : CustomerAddress
          order : Order }


          

    let processPhysicalOrderItem item = printfn "processando ordem para item físico"

    let processMembershipOrderItem item  = printfn "processando assinatura digital"
    
    let processBookOrderItem item = printfn "processando livro físico"
    
    let processDigitalOrderItem item = printfn "processando mídia digital"




    let handleOrderFullfilment (order:Order) = 
        
        let rec handleOrderItems (orderItems: OrderItem list) =
            match orderItems with 
            | [] -> printfn "Itens processados"
            | head::tail -> 
                match head.product.itemType with 
                    | PhysicalItem item  -> 
                        match item with
                            | Book -> processBookOrderItem head
                            | Other -> processPhysicalOrderItem head
                    | DigitalItem item -> 
                        match item with 
                            | DigitalMedia -> processMembershipOrderItem head
                            | Membership -> processMembershipOrderItem head
                handleOrderItems tail

        handleOrderItems order.items
        