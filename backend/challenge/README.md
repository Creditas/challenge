
# Desafio para Backend Software Engineer

## Proposta do exercicio
Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que recebem tratamentos a depender as situações específicas de cada um como segue:

- Se o pagamento for para um item físico, você deverá gerar um shipping label para o mesmo ser colocado na caixa do envio;
- Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
- Caso o pagamento seja um livro comum, você precisa gerar o shipping label com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
- Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

### O que é necessário fazer?

Você ficou designado a prototipar como poderá ser feita a nova versão deste fluxo de pagamento/regras de envio, pois a versão atual é frágil, **encadeada em if/else, switch/case**, exigindo modificações grandes a cada nova regra de envio/processamento inserida ou removida.

Crie as classes, métodos e suas respectivas chamadas (a seu critério) para que você consiga tratar os cenários acima.

**Não é necessário** criar as implementações para envio de e-mails, imprimir o _shipping label_, etc. Para estes casos (email, shipping label) crie apenas as chamadas de métodos, para indicar que ali seria o local aonde o envio ocorreria.

Como a proposta **não requer um código final funcionando**, não há a necessidade de implementar os testes de unidade. Entretanto, levaremos isso como _bonus points_. É permitido o uso de libs para facilitar a implementação dos testes.


## Resolução
-Foi mantido o modelo Sincrono de execução dos sistema, apenas utilizando de paralelismo no momento de processamento das regras de envio.
-De modo a evitar o acumulo de responsabilidades em uma unica classe, foi utilizado o pattern Strategy nas regras de envio, assim evitando 
- Para encapsular a escolha de qual implementação será utilizado pelo serviço, fazemos uso do pattern Factory
- Para encapsular o processo de envio, foi utilizado o pattern Facade

###  Ponto de atenção
- Não foram feitos tratamentos de erro.
- Não foram consideradas as chamadas de acesso a Banco de dados.
- Não faria uso de entidades em todas as camadas do codigo, iria recorrer a DTO's.
- Foi usado Junit e Mockito para escrita dos testes.
- Voucher foi gerado para uso futuro.
- Usei Injeção por construtor, o que facilita os teste e não se faz necessario o uso de nenhum Runner.
- Foi utilizado um BigDecimalProvider, de modo que possamos controlar a crição do BigDecimal, assim evitando inumeras configurações atraves do sistema.
- Os Factories foram criados como estaticos, de modo a simplificar a escrita do exercicio, em um cenario real, não seriam estaticos, para que possam ser testados. 
- Uma melhoria nesse processo, seria fazer uso de uma arquitetura voltada a eventos, utlizando filas/topicos, com as seguintes vantagens:
    * Escalabilidade
    * Baixo Acoplamento
    * Assincrono
    * Garantia de entrega
    * Dependendo da Tecnologia utilizada, podemos ter acesso a capacidade de reenvio de eventos.

### Patterns envolvidos
   - Factory
   - Builder 
   - Strategy
   - Facade
   - Provider
   

    
