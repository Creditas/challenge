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
  getFormValues,
  Send
} from '../src/index'
import { page } from './mocks'

function initializeAppMock () {
  document.body.innerHTML = page
}

function clean () {
  document.body.innerHTML = ''
}

const confirm = `
  Confirmação
  Campo: parcelas, Valor: 24
  Campo: garantia, Valor: vehicle
  Campo: valor-garantia, Valor: R$ 123.455,00
  Campo: valor-garantia-range, Valor: 123455
  Campo: valor-emprestimo, Valor: R$ 90.455,00
  Campo: valor-emprestimo-range, Valor: 90455
  Total R$100,513.60
`

describe('Creditas Challenge', () => {
  beforeEach(() => {
    initializeAppMock()
  })

  afterEach(() => {
    clean()
  })

  describe('Content::Methods', () => {
    it('should return the all form values', () => {
      const form = document.querySelector('.form')
      Send(getFormValues(form))
        .then((result) => expect(result).toBe(confirm))
    })

    it('should get all form values', () => {
      const form = document.querySelector('.form')
      expect(getFormValues(form)).toEqual([
        { 'field': 'parcelas', 'value': '24' },
        { 'field': 'garantia', 'value': 'vehicle' },
        { 'field': 'valor-garantia', 'value': 'R$ 331.000,00' },
        { 'field': 'valor-garantia-range', 'value': '331000' },
        { 'field': 'valor-emprestimo', 'value': 'R$ 90.455,00' },
        { 'field': 'valor-emprestimo-range', 'value': '90455' }
      ])
    })
  })
})
