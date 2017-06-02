#### Conclusão
A solução encontrada para realizar este desafio é conhecida como Duck Typing.

Sabendo que teria que trabalhar com diversos tipos de produtos e, para cada um destes tipos deveria ser implementado uma uma certa regra, nada melhor como definir uma interface onde todos que implementarem esta interface devam, de forma obrigatória, sobrescrever um devido comportamento para agir de maneira correta em relação a sua regra.

Dessa forma, um produto, seja ele físico, digital ou qualquer outro tipo, irá definir a sua regra ou o que deverá ser feito.

Duck typing é fortemente indicado para quando temos que trabalhar com este tipo de regras em OO, quando temos muitos tratamentos de "tipos" de dados. Isso ajuda a eliminar a acoplamento do nosso código e um emaranhados de if elses. 