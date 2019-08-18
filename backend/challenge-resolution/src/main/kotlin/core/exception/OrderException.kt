package main.kotlin.core.exception

abstract class OrderException: ChallengeException()
class OrderAlreadyPayException() : OrderException() {
    override val message = "The order has already been paid!"
    override val errorCode = 666666
}

class OrderEmptyCanBePaidException() : OrderException() {
    override val message = "Empty order can not be paid!"
    override val errorCode = 666666
}