import { CreditasFooter } from './creditas-footer.component'
import { TestUtils } from '@test/utils'

describe('CreditasFooter component', () => {
  beforeAll(() => {
    window.customElements.define(CreditasFooter.tag, CreditasFooter)
  })

  it('should contain footer element with the right text', async () => {
    const el = await TestUtils.render(CreditasFooter.tag)
    const footer = el.querySelector('footer.creditas-footer')

    expect(footer.innerText).toBe('*Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quas non harum dolor eligendi id, ab corrupti blanditiis suscipit ex odit error alias minus. Enim dolores eum officiis quae rem!*')
  })
})
