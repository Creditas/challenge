interface Event<E> {

    fun handler(event: E)
}