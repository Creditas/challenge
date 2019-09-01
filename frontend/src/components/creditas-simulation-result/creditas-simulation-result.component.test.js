import { CreditasSimulationResult } from './creditas-simulation-result.component'
import { TestUtils } from '@test/utils'

describe('CreditasSimulationResult component', () => {
  beforeAll(() => {
    window.customElements.define(CreditasSimulationResult.tag, CreditasSimulationResult)
  })

  it('should display quota title and value', async () => {
    const el = await TestUtils.render(CreditasSimulationResult.tag)
    const quota = el.querySelector('.creditas-simulation-result__quota')

    expect(quota.querySelector('.creditas-simulation-result__title').innerText).toBe('Valor da Parcela')
    expect(quota.querySelector('.creditas-simulation-result__quota-details').innerText).toBe('R$ 465,00')
  })

  it('should display total amount to pay', async () => {
    const el = await TestUtils.render(CreditasSimulationResult.tag)
    const amount = el.querySelector('.creditas-simulation-result__amount')

    expect(amount.querySelector('.creditas-simulation-result__title').innerText).toBe('Total a pagar')
    expect(amount.querySelector('.creditas-simulation-result__value').innerText).toBe('R$ 11.112,00')
  })

  it('should display total tax to pay', async () => {
    const el = await TestUtils.render(CreditasSimulationResult.tag)
    const tax = el.querySelector('.creditas-simulation-result__tax')

    expect(tax.querySelector('.creditas-simulation-result__title').innerText).toBe('Taxa de juros (mês)')
    expect(tax.querySelector('.creditas-simulation-result__value').innerText).toBe('111,12%')
  })

  it('should display click to action button', async () => {
    const el = await TestUtils.render(CreditasSimulationResult.tag)
    const cta = el.querySelector('.creditas-simulation-result__cta')

    expect(cta.innerText).toBe('SOLICITAR')
  })
})
