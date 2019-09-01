import { CreditasHeader } from './creditas-header.component'
import { TestUtils } from '@test/utils'

describe('CreditasHeader component', () => {
  beforeAll(() => {
    window.customElements.define(CreditasHeader.tag, CreditasHeader)
  })

  it('should render the right logo', async () => {
    const el = await TestUtils.render(CreditasHeader.tag)
    const logo = el.querySelector('.creditas-header__title .creditas-header__logo')

    expect(logo.getAttribute('src')).toBe('https://staging.creditas.com.br/static/images/logo-creditas-white-3cd22a2808.svg')
  })

  it('should have a help link', async () => {
    const el = await TestUtils.render(CreditasHeader.tag)
    const links = el.querySelectorAll('.creditas-header__link')

    expect(links.length).toBe(1)
    expect(links[0].getAttribute('href')).toBe('#ajuda')
    expect(links[0].innerText).toBe('Ajuda')
  })
})
