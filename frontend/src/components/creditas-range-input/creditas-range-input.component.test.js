import { CreditasRangeInput } from './creditas-range-input.component'
import { TestUtils } from '@test/utils'

describe('CreditasRangeInput component', () => {
  let el
  let mockAttributes = {
    'label-for': 'for',
    'label-text': 'Text!',
    'initial-value': '45000',
    'min-value': '30000',
    'max-value': '100000'
  }

  beforeAll(() => {
    window.customElements.define(CreditasRangeInput.tag, CreditasRangeInput)
  })

  beforeEach(async () => {
    el = await TestUtils.render(CreditasRangeInput.tag, mockAttributes)
  })

  afterEach(() => {
    el.removeEventListeners()
  })

  it('should contain the passed in label', async () => {
    const label = el.querySelector('label')

    expect(label.getAttribute('for')).toBe('for')
    expect(label.innerText.trim()).toBe('Text!')
  })

  it('should render input text with the initial value', async () => {
    const input = el.querySelector('input[type="text"]')

    expect(input.getAttribute('id')).toBe('for')
    expect(input.getAttribute('name')).toBe('for')
    expect(input.value).toBe('45000')
  })

  it('should render the range input', async () => {
    const range = el.querySelector('input[type="range"]')

    expect(range.getAttribute('id')).toBe('for-range')
    expect(range.getAttribute('name')).toBe('for-range')
  })

  it('should render the min and max values', async () => {
    const rangeValues = el.querySelectorAll('.creditas-range-input__range-values span')

    expect(rangeValues[0].innerText).toBe('30000')
    expect(rangeValues[1].innerText).toBe('100000')
  })

  it('should update input value when range value changes', async () => {
    const input = el.querySelector('input[type="text"]')
    const range = el.querySelector('input[type="range"]')

    range.value = '65000'
    range.dispatchEvent(new Event('change'))

    expect(input.value).toBe('65000')
  })

  it('should update range value when input value changes', async () => {
    const input = el.querySelector('input[type="text"]')
    const range = el.querySelector('input[type="range"]')

    input.value = '45000'
    input.dispatchEvent(new Event('change'))

    expect(range.value).toBe('45000')
  })
})
