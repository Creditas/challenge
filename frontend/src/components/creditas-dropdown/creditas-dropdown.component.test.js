import { CreditasDropdown } from './creditas-dropdown.component'
import { TestUtils } from '@test/utils'

describe('CreditasDropdown component', () => {
  let el

  beforeAll(() => {
    window.customElements.define(CreditasDropdown.tag, CreditasDropdown)
  })

  afterEach(() => {
    el.removeEventListeners()
  })

  it('should render the label with the right text and for property', async () => {
    el = await TestUtils.render(CreditasDropdown.tag, {
      'label-for': 'for',
      'label-text': 'Text!',
      'dropdown-values': '25,50,100'
    })

    const label = el.querySelector('label')

    expect(label.getAttribute('for')).toBe('for')
    expect(label.innerText.trim()).toBe('Text!')
  })

  it('should render the select element with the right options', async () => {
    el = await TestUtils.render(CreditasDropdown.tag, {
      'label-for': 'for',
      'label-text': 'Text!',
      'dropdown-values': '25,50,100'
    })

    const select = el.querySelector('select')

    expect(select.getAttribute('id')).toBe('for')
    expect(select.getAttribute('name')).toBe('for')
  })

  it('should render the right options within the select element', async () => {
    el = await TestUtils.render(CreditasDropdown.tag, {
      'label-for': 'for',
      'label-text': 'Text!',
      'dropdown-values': '25,50,100'
    })

    const options = el.querySelectorAll('option')

    expect(options.length).toBe(3)
    expect(options[0].getAttribute('value')).toBe('25')
    expect(options[0].innerText.trim()).toBe('25')
    expect(options[1].getAttribute('value')).toBe('50')
    expect(options[1].innerText.trim()).toBe('50')
    expect(options[2].getAttribute('value')).toBe('100')
    expect(options[2].innerText.trim()).toBe('100')
  })

  it('should dispatch event', async (done) => {
    el = await TestUtils.render(CreditasDropdown.tag, {
      'label-for': 'for',
      'label-text': 'Text!',
      'dropdown-values': '25,50,100'
    })

    // Listenening for changes
    document.addEventListener('creditas-dropdown:changed', (e) => {
      expect(e.bubbles).toBe(true)
      expect(e.detail.label).toBe('for')
      expect(e.detail.value).toBe('50')
      done();
    })

    // Triggering change event on select.
    const select = el.querySelector('select')
    select.value = '50'
    select.dispatchEvent(new Event('change'))
  })
})
