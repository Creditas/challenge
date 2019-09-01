import { CreditasMainContainer } from './creditas-main-container.component'
import { TestUtils } from '@test/utils'

describe('CreditasMainContainer component', () => {
  beforeAll(() => {
    window.customElements.define(CreditasMainContainer.tag, CreditasMainContainer)
  })

  it('should contain a main element', async () => {
    const el = await TestUtils.render(CreditasMainContainer.tag)
    const main = el.querySelectorAll('main.creditas-main-container')

    expect(main.length).toBe(1)
  })

  it('should contain a title', async () => {
    const el = await TestUtils.render(CreditasMainContainer.tag)
    const title = el.querySelector('.creditas-main-container__title')

    expect(title.nodeName).toBe('H1')
    expect(title.innerText).toBe('Realize uma simulação de crédito utilizando seu bem como garantia.')
  })

  it('should render creditas-footer component', async () => {
    const el = await TestUtils.render(CreditasMainContainer.tag)

    console.log(el.querySelector('creditas-footer'))
    expect(el.querySelector('creditas-footer')).not.toBeNull()
  })
})
