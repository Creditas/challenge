import { CreditasHeader } from './creditas-header.component'
import { TestUtils } from '@test/utils'

describe('CreditasHeader component', () => {
  beforeAll(() => {
    window.customElements.define(CreditasHeader.tag, CreditasHeader)
  })

  it('should render ', async () => {
    const el = await TestUtils.render(CreditasHeader.tag)
    console.log(el.innerHTML)
  })
})
