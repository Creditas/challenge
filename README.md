Assumptions
	
	- o pedido contém um unico produto para fins de simplicação conforme challange
	- o pedido é realizado pelo cliente e processado em pipeline. Seja usando um broker de mensageria como barramento
		ou uma engine de orquestração como o uber cadence. Assumi que receberei um evento de payment, o processarei
		e o passarei para o proximo step de processamento (provavelmente shipping).
	
Decisões

	- não utilizei logs pois apesar de extremamente úteis não faziam parte do requisito.
	- não fiz testes unitários pois eram um plus para o requisito.

POO (solid)

	- Com a solução proposta foram respeitados os 5 principios de orientação a objeto onde foram empregados
	diversos design patterns para satisfazer o requisito do challange
	
Design Patterns
	
	- utilizei o design pattern visitor para adicionar funcionalidas ao objeto Order em cenários especificos relacionados ao challange
	- utilizei o design pattern strategy para as diferentes formas (peculiaridades) de processar o pagamento de um pedido
	- utilizei o design pattern builder em alguns casos onde existe uma logica de construção mais complexa
		e assim separar a construção da representação dos mesmos
	- utilizei o design pattern Factory Method para fabricar objetos
	- utilizei o design pattern singleton para criar beans stateless/ligth weigth e consequentemente reutilizaveis
	- utilizei o design pattern template method para adicionar pontos de extenção as estrategias de processamento
	- poderia ter usado o design pattern abstract factory para carregar provider de cartão de acordo com o tipo
	     e bandeira
