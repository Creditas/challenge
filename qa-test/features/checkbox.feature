

Feature: Adionar e remover o checkbox
    In order to value
    As a role
    I want feature

    
@remover
Scenario: Remover checkbox
    Given que estou na página Dynamic Controls
    When clico no botão "Remove"
    Then o checkbox é removido 
    And  a mensagem "It's gone!" aparece


@adicionar
Scenario: Adicionar checkbox
    Given que estou na página Dynamic Controls sem checkbox
    When clico no botão "Add"
    Then o checkbox é adicionado
    And  a mensagem "It's back!" aparece

