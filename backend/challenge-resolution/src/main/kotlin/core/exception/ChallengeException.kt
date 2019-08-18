package main.kotlin.core.exception

open class ChallengeException(open val errorCode:Int = 500) : RuntimeException()