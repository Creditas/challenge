## Desafio para Backend Software Engineer

Foi aplicado o pattern strategy para definir como seria o envio, dependendo do tipo do produto. Criou-se o método FINISH_ORDER dentro da classe ORDER para chamar o método SEND_ORDER passando o seu próprio objeto.

Dentro desse método eu avalio o tipo de cada item, e usando o método SEND do ruby faço a chamada do método usando o tipo do produto. 

Depois dessa fase, acreditei que a melhor forma seria aplicar o Single Responsability para cada método de envio. Dentro de cada um eu realizo as regras do tipo do item.