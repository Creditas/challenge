package main.kotlin.core.exception

abstract class ProductException: ChallengeException()
class ProductAlreadyAddedException() : ProductException() {
    override val message = "The product have already been added. Change the amount if you want more."
    override val errorCode = 666666
}