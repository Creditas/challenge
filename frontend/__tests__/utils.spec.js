/* <!--
  =========================================================
  Que tal aumentar o coverage para que ele comece a passar
  nos critérios do desafio?

  Objetivo: Alcançar 80% de cobertura, mas não se preocupe
  se não chegar a alcançar a objetivo, faça o quanto você
  acha que é necessário para garantir segurança quando um
  outro amigo for mexer no mesmo código que você :)

  Confira nossas taxas de coberturas atuais :(

  ----------|----------|----------|----------|----------|-------------------|
  File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
  ----------|----------|----------|----------|----------|-------------------|
  All files |    15.79 |        0 |     9.52 |    14.29 |                   |
  index.js  |    15.79 |        0 |     9.52 |    14.29 |... 72,76,78,83,91 |
  ----------|----------|----------|----------|----------|-------------------|
  Jest: Uncovered count for statements (32)exceeds global threshold (10)
  Jest: "global" coverage threshold for branches (80%) not met: 0%
  Jest: "global" coverage threshold for lines (80%) not met: 14.29%
  Jest: "global" coverage threshold for functions (80%) not met: 9.52%
--> */

import {
  checkFormValidity,
  Submit
} from '../src/index'

import { simple } from './mocks'

import { utils } from '../src/lib'

function initializeAppMock () {
  document.body.innerHTML = simple
}

function clean () {
  document.body.innerHTML = ''
}

describe('Creditas Challenge', () => {
  beforeEach(() => {
    initializeAppMock()
  })

  afterEach(() => {
    clean()
  })

  describe('Utils::Validations', () => {
    it('should return true when form has valid', () => {
      const form = document.querySelector('.form')
      const input = document.querySelector('input')
      input.value = 10
      expect(checkFormValidity(form)).toBeTruthy()
    })

    it('should return false when form has not valid', () => {
      const form = document.querySelector('.form')
      expect(checkFormValidity(form)).toBeFalsy()
    })

    it('should add event listener to submit data form', () => {
      const container = document.querySelector('.form')
      Submit(container)
    })
  })

  describe('Utils::Methods', () => {
    it('should parse integer value to currency', () => {
      const value = 438765235
      expect(utils.currencyFormat(value)).toEqual('R$ 438,765,235.00')
    })

    it('should return the quota value', () => {
      const total = 18000
      const installments = 36
      expect(utils.quota(total, installments)).toEqual(500)
    })

    it('should return the amount value', () => {
      const loan = 'R$ 95.000,00'
      const installments = '36'
      expect(utils.amount(installments, loan)).toEqual(106.704)
    })

    it('should parse integer value to currency without BRL format', () => {
      const value = 438765235
      expect(utils.currencyFormat(value, false)).toEqual('438,765,235.00')
    })

    it('should parse currency value to number', () => {
      const value = 'R$ 438'
      expect(utils.parseCurrencyToNumber(value, true)).toEqual(438)
    })
  })
})
