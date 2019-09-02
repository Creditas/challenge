import './creditas-range-input.component.css'

export class CreditasRangeInput extends HTMLElement {
  /**
   * Gets the tag of the web-component.
   *
   * @memberof CreditasRangeInput
   */
  static get tag () {
    return 'creditas-range-input'
  }

  /**
   * Is invoked each time the custom element is appended into
   * a document-connected element.
   *
   * @memberof CreditasRangeInput
   */
  connectedCallback () {
    this.render()
    this.setEventListeners()
  }

  /**
   * Sets all event listeners.
   *
   * @memberof CreditasDropdown
   */
  setEventListeners () {
    this.$input = this.querySelector(`#${this.labelFor}`)
    this.$range = this.querySelector(`#${this.labelFor}-range`)

    // Updating the input value onInput so the user can actually
    // see the value while dragging the slider.
    const updateInput = (e) => this.$input.value = event.target.value
    this.$range.addEventListener('input', updateInput)
    this.$range.addEventListener('change', updateInput)

    // Updating any other components once the input changes.
    this.$input.addEventListener('change', (event) => {
      this.$range.value = event.target.value

      this.dispatchEvent(new CustomEvent(`creditas-range-input:changed`, {
        bubbles: true,
        detail: {
          label: this.labelFor,
          value: event.target.value
        }
      }))
    })
  }

  /**
   * Renders the component.
   *
   * @memberof CreditasRangeInput
   */
  render () {
    this.labelFor = this.getAttribute('label-for')
    this.labelText = this.getAttribute('label-text')
    this.initialValue = this.getAttribute('initial-value')
    this.minValue = this.getAttribute('min-value')
    this.maxValue = this.getAttribute('max-value')

    this.innerHTML = `
      <div class="field-group">
        <div class="field">
          <label for="${this.labelFor}">${this.labelText}</label>
          <input type="text" name="${this.labelFor}" id="${this.labelFor}" value="${this.initialValue}" required />
        </div>
        <div class="field">
          <div class="creditas-range-input__range">
            <input type="range" name="${this.labelFor}-range" id="${this.labelFor}-range" min="${this.minValue}" max="${this.maxValue}" value="${this.initialValue}" step="100">
            <div class="creditas-range-input__range-values">
              <span>${this.minValue}</span>
              <span>${this.maxValue}</span>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
