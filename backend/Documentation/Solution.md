## Solução adotada para o desafio
__Por: Leonardo Olberg__

Antes de adotar uma solução para o problema no domínio percebeu-se a necessidade de limpar o código, segue-se uma lista de atitudes tomadas:

- Separação de classes por arquivos; 
- Reorganização de métodos referentes a responsabilidades de classes;
- Organização das classes em cada contexto;

Após a refatoração do código foi implementado na classe Order o pattern **Strategy** que tem como premissa de solução a resolução de situações onde existem **muitos algoritmos para um mesmo fluxo de processo**. Ao que foi entendido do desafio, onde para o processo de compra diversos tipos de produtos ou serviços necessitavam de algoritmos próprios dadas as respectivas regras de negócio, a adoção do pattern resolveu o problema proposto, além de **possibilitar a adoção de diversos outros algoritmos para o fluxo de compra**.

Também foram implementados testes unitários simples para cada um dos fluxos de compra, sendo eles:

- **Compra de produto fisico;**
- **Compra de produto fisico, sendo este um livro;**
- **Assinatura de um serviço;**
- **Compra de um produto digital;**