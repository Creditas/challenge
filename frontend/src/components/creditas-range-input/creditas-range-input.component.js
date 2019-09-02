import './creditas-range-input.component.css'

export class CreditasRangeInput extends HTMLElement {
  /**
   * Creates an instance of CreditasRangeInput.
   *
   * @memberof CreditasRangeInput
   */
  constructor () {
    super()

    // Attaching context to event listeners.
    this.onInputChange = this.onInputChange.bind(this)
    this.onRangeChange = this.onRangeChange.bind(this)
  }

  /**
   * Gets the tag of the web-component.
   *
   * @memberof CreditasRangeInput
   */
  static get tag () {
    return 'creditas-range-input'
  }

  /**
   * Setting up attributes to observe.
   *
   * @readonly
   * @static
   * @memberof CreditasRangeInput
   */
  static get observedAttributes() {
    return [
      'initial-value',
      'min-value',
      'max-value'
    ]
  }

  /**
   * Fired every time an attribute changes its value.
   *
   * @memberof CreditasRangeInput
   */
  attributeChangedCallback() {
    this.removeEventListeners()
    this.render()
    this.getDomElements()
    this.setEventListeners()
  }

  /**
   * Is invoked each time the custom element is appended into
   * a document-connected element.
   *
   * @memberof CreditasRangeInput
   */
  connectedCallback () {
    this.removeEventListeners()
    this.render()
    this.getDomElements()
    this.setEventListeners()
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
    `
  }

  /**
   * Gets all dom elements for later use only once.
   *
   * @memberof CreditasRangeInput
   */
  getDomElements () {
    this.$input = this.querySelector(`#${this.labelFor}`)
    this.$range = this.querySelector(`#${this.labelFor}-range`)
  }

  /**
   * Sets all event listeners.
   *
   * @memberof CreditasRangeInput
   */
  setEventListeners () {
    if (this.$range) {
      // Updating the input value onInput so the user can actually
      // see the value while dragging the slider.
      this.$range.addEventListener('input', this.onRangeChange, false)
      this.$range.addEventListener('change', this.onRangeChange, false)
    }

    if (this.$input) {
      // Updating any other components once the input changes.
      this.$input.addEventListener('change', this.onInputChange, false)
    }
  }

  /**
   * Removes all event listeners.
   *
   * @memberof CreditasRangeInput
   */
  removeEventListeners () {
    if (this.$range) {
      this.$range.removeEventListener('input', this.onRangeChange, false)
      this.$range.removeEventListener('change', this.onRangeChange, false)
    }

    if (this.$input) {
      this.$input.removeEventListener('change', this.onInputChange, false)
    }
  }

  /**
   * Triggered when the range input changes its value.
   *
   * @param {*} event
   * @memberof CreditasRangeInput
   */
  onRangeChange (event) {
    this.$input.value = event.target.value
  }

  /**
   * Triggered when the text input changes its value.
   *
   * @param {*} event
   * @memberof CreditasRangeInput
   */
  onInputChange (event) {
    // Keeping the input and range inputs in sync.
    this.$range.value = event.target.value

    this.dispatchEvent(new CustomEvent(`creditas-range-input:changed`, {
      bubbles: true,
      detail: {
        label: this.labelFor,
        value: event.target.value
      }
    }))
  }
}
