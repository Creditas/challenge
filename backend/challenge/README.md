
## Desafio para Backend Software Engineer

- Não foram feitos tratamentos de erro.
- Não foram consideradas as chamadas de acesso a Banco de dados
- Não faria uso de entidades em todas as camadas do codigo, iria recorrer a DTO's
- Voucher foi gerado para uso futuro.
- Usei Injeção por construtor, o que facilita os teste e não se faz necessario o uso de nenhum Runner.
- Foi utilizado um BigDecimalProvider, de modo que possamos controlar a crição do BigDecimal, assim evitando inumeras configurações atraves do sistema.
- Os Factories foram criados como estaticos, de modo a simplificar a escrita do exercicio, em um cenario real, não seriam estaticos, para facilitar a escrita dos testes. 
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
   

    
