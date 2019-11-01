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

import setValuesToGuarantee, { setValuesDOM } from '../src/js/setValuesToGuarantee'
import { numberWithCommas, getFormValues, getItemForm, send, checkFormValidity } from '../src/js/helpers'

function initializeAppMock () {
  document.body.innerHTML = `
    <form class="form" data-testid="form">
      <select name="parcelas" id="parcelas" required>
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
      </select>
      <select name="garantia" id="garantia" required>
        <option value="VEICULO">Veículo</option>
        <option value="IMOVEL">Imóvel</option>
      </select>
      <label for="valor-garantia">Valor da Garantia</label>
      <input name="valor-garantia" id="valor-garantia" value="3750" required />
      <input type="range" name="valor-garantia-range" id="valor-garantia-range" min="0" max="100" value="0" step="10">
      <div id="valor-garantia-range-value" class="range__values">
      <span>3,750</span>
      <span>80.000</span>
      </div>
      <input type="range" name="valor-emprestimo-range" id="valor-emprestimo-range" min="0" max="100" value="0" step="10">
      <div id="valor-emprestimo-range-value" class="range__values">
      <span>30.000</span>
      <span>60.000</span>
      </div>
      <input name="valor-emprestimo" id="valor-emprestimo" value="3000" required />
      <button type="button"></button>
    </form>
  `
}

function clean () {
  document.body.innerHTML = ''
}

describe('Creditas Challenge', () => {
  beforeEach(() => {
    initializeAppMock()
    // DOM.init()
  })

  afterEach(() => {
    clean()
  })

  describe('setValuesToGuarantee', () => {
    describe('Method: setValuesToGuarantee', () => {
      it('should return indefinitely change the DOM data for car', () => {
        const payload = {
          key: 'VEICULO',
          element: {
            months: document.getElementById('parcelas'),
            valueGuaranteeRange: document.getElementById('valor-garantia-range'),
            valueGuarantee: document.getElementById('valor-garantia'),
            valuesGuaranteeRangeBottom: document.getElementById('valor-garantia-range-value'),
            valueBusinessRange: document.getElementById('valor-emprestimo-range'),
            valueBusiness: document.getElementById('valor-emprestimo'),
            valuesBusinessRangeBottom: document.getElementById('valor-emprestimo-range-value')
          }
        }
        expect(setValuesToGuarantee(payload)).toEqual(undefined)
      })
    })

    describe('Method: setValuesToGuarantee', () => {
      it('should return indefinitely change the DOM data for Home', () => {
        const payload = {
          key: 'IMOVEL',
          element: {
            months: document.getElementById('parcelas'),
            valueGuaranteeRange: document.getElementById('valor-garantia-range'),
            valueGuarantee: document.getElementById('valor-garantia'),
            valuesGuaranteeRangeBottom: document.getElementById('valor-garantia-range-value'),
            valueBusinessRange: document.getElementById('valor-emprestimo-range'),
            valueBusiness: document.getElementById('valor-emprestimo'),
            valuesBusinessRangeBottom: document.getElementById('valor-emprestimo-range-value')
          }
        }
        expect(setValuesToGuarantee(payload)).toEqual(undefined)
      })
    })

    describe('Method: setValuesDOM', () => {
      it('should return  undefined as it only sends data to the DOM', () => {
        const params = {
          min: 3750.0,
          max: 125000.0,
          months: [24, 36, 48]
        }
        const elements = {
          months: document.getElementById('parcelas'),
          valueGuaranteeRange: document.getElementById('valor-garantia-range'),
          valueGuarantee: document.getElementById('valor-garantia'),
          valuesGuaranteeRangeBottom: document.getElementById('valor-garantia-range-value'),
          valueBusinessRange: document.getElementById('valor-emprestimo-range'),
          valueBusiness: document.getElementById('valor-emprestimo'),
          valuesBusinessRangeBottom: document.getElementById('valor-emprestimo-range-value')
        }
        expect(setValuesDOM(elements, params)).toEqual(undefined)
      })
    })

  })

  describe('Helpers...', () => {
    describe('Method: numberWithCommas', () => {
      it('should return a comma separated string value', () => {
        expect(numberWithCommas(10000000)).toBe('10,000,000')
      })
    })

    describe('Method: getFormValues', () => {
      it('should return an array with the fields and values of the form ', () => {
        const form = document.querySelector('.form')
        const expected = [
          { field: 'parcelas', value: '24' },
          { field: 'garantia', value: 'VEICULO' },
          { field: 'valor-garantia', value: '3750' },
          { field: 'valor-garantia-range', value: '0' },
          { field: 'valor-emprestimo-range', value: '0' },
          { field: 'valor-emprestimo', value: '3000' }
        ]
        expect(getFormValues(form)).toEqual(expected)
      })
    })

    describe('Method: getItemForm', () => {
      it('should return an object of the form with its field and value ', () => {
        const form = document.querySelector('.form')
        const expected = { field: 'parcelas', value: '24' }
        expect(getItemForm(form, 'parcelas')).toEqual(expected)
      })
    })

    describe('Method: send', () => {
      it('should return return a promise of a function ', () => {
        const func = () => ({})
        expect(send(func)).resolves.toEqual({})
      })
    })

    describe('Method: checkFormValidity', () => {
      it('should return true if the form fields are valid and if the loan is less than 80% of the guarantee ', () => {
        const form = document.querySelector('.form')
        const params = {
          VALUE_GUARANTEE: 'valor-garantia',
          VALUE_BUSINESS: 'valor-emprestimo',
          MAX_CREDIT_PERCENTAGE: 0.8
        }
        const expected = { isValid: true }
        expect(checkFormValidity(form, params)).toMatchObject(expected)
      })
      it('should return true false if the form fields are invalid and if the loan is greater than 80% of the guarantee ', () => {
        const form = document.querySelector('.form')
        const input = document.getElementById('valor-emprestimo')
        input.value = 4000
        const params = {
          VALUE_GUARANTEE: 'valor-garantia',
          VALUE_BUSINESS: 'valor-emprestimo',
          MAX_CREDIT_PERCENTAGE: 0.8
        }
        const expected = { isValid: false }
        expect(checkFormValidity(form, params)).toMatchObject(expected)
      })
    })

  })
})