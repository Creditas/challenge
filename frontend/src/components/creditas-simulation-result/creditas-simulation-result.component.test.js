import { CreditasSimulationResult } from './creditas-simulation-result.component'
import { TestUtils } from '@test/utils'

describe('CreditasSimulationResult component', () => {
  let mockAttributes = {
    'total-to-pay': '200.000,00',
    'monthly-fee': '111,00',
    'tax-rate': '6,0'
  }

  beforeAll(() => {
    window.customElements.define(CreditasSimulationResult.tag, CreditasSimulationResult)
  })

  it('should display quota title and value', async () => {
    const el = await TestUtils.render(CreditasSimulationResult.tag, mockAttributes)
    const quota = el.querySelector('.creditas-simulation-result__quota')

    expect(quota.querySelector('.creditas-simulation-result__title').innerText).toBe('Valor da Parcela')
    expect(quota.querySelector('.creditas-simulation-result__quota-details').innerText).toBe('R$ 111,00')
  })

  it('should display total amount to pay', async () => {
    const el = await TestUtils.render(CreditasSimulationResult.tag, mockAttributes)
    const amount = el.querySelector('.creditas-simulation-result__amount')

    expect(amount.querySelector('.creditas-simulation-result__title').innerText).toBe('Total a pagar')
    expect(amount.querySelector('.creditas-simulation-result__value').innerText).toBe('R$ 200.000,00')
  })

  it('should display total tax to pay', async () => {
    const el = await TestUtils.render(CreditasSimulationResult.tag, mockAttributes)
    const tax = el.querySelector('.creditas-simulation-result__tax')

    expect(tax.querySelector('.creditas-simulation-result__title').innerText).toBe('Taxa de juros (mês)')
    expect(tax.querySelector('.creditas-simulation-result__value').innerText).toBe('6,0%')
  })

  it('should display click to action button', async () => {
    const el = await TestUtils.render(CreditasSimulationResult.tag, mockAttributes)
    const cta = el.querySelector('.creditas-simulation-result__cta')

    expect(cta.innerText).toBe('SOLICITAR')
  })

  it('should trigger event when clicking cta', async () => {
    // TODO.
  })
})
