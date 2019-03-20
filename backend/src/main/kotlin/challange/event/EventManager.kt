object EventManager
{

    private val controller = HashMap<String, MutableList<Object>>()

    init {
        println("Inicializando EventManager")
    }

    fun <E>subscribe(eventType: String, event: Event<E>)
    {
        println("Inscrevendo event ${event.javaClass} no tópico ${eventType}")

        if(!controller.containsKey(eventType)) {
            println("Criando tópico ${eventType}")
            controller.put(eventType, mutableListOf<Object>())
        }

        var list = controller[eventType]
        list?.add(event as Object)
    }

    fun <E: Any>publish(eventType: String, event: E) {
        if(controller.containsKey(eventType)) {
            println("Lançado tópico ${eventType}")

            val list = controller[eventType]

            list?.forEach {
                Thread(Runnable {
                    println("Tópico ${eventType} capturado pelo ${it}")
                    (it as Event<E>).handler(event)
                }).start()
            }
        }
    }

}