import './creditas-dropdown.component.css'

export class CreditasDropdown extends HTMLElement {
  /**
   * Creates an instance of CreditasDropdown.
   *
   * @memberof CreditasDropdown
   */
  constructor () {
    super()

    // Attaching context to event listeners.
    this.onChange = this.onChange.bind(this)
  }

  /**
   * Gets the tag of the web-component.
   *
   * @readonly
   * @static
   * @memberof CreditasDropdown
   */
  static get tag () {
    return 'creditas-dropdown'
  }


  /**
   * Setting up attributes to observe.
   *
   * @readonly
   * @static
   * @memberof CreditasDropdown
   */
  static get observedAttributes() {
    return [
      'dropdown-values'
    ]
  }

  /**
   * Fired every time an attribute changes its value.
   *
   * @memberof CreditasDropdown
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
   * @memberof CreditasDropdown
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
   * @memberof CreditasDropdown
   */
  render () {
    this.labelFor = this.getAttribute('label-for')
    this.labelText = this.getAttribute('label-text')
    this.dropdownValues = this.getAttribute('dropdown-values').trim().split(',')

    this.innerHTML = `
      <div class="creditas-dropdown">
        <label class="creditas-dropdown__label" for="${this.labelFor}">${this.labelText}</label>
        <select class="creditas-dropdown__select" name="${this.labelFor}" id="${this.labelFor}" required>
          ${this.dropdownValues.map((value) => `<option value="${value}">${value}</option>`)}
        </select>
      </div>
    `
  }

  /**
   * Gets all dom elements for later use only once.
   *
   * @memberof CreditasDropdown
   */
  getDomElements () {
    this.$dropdown = this.querySelector('.creditas-dropdown__select')
  }

  /**
   * Sets all event listeners.
   *
   * @memberof CreditasDropdown
   */
  setEventListeners () {
    if (this.$dropdown) {
      this.$dropdown.addEventListener('change', this.onChange, false)
    }
  }

  /**
   * Removes all event listeners.
   *
   * @memberof CreditasDropdown
   */
  removeEventListeners () {
    if (this.$dropdown) {
      this.$dropdown.removeEventListener('change', this.onChange, false)
    }
  }

  /**
   * Onchange event listener
   *
   * @param {*} event
   * @memberof CreditasDropdown
   */
  onChange (event) {
    this.dispatchEvent(new CustomEvent('creditas-dropdown:changed', {
      bubbles: true,
      detail: {
        label: this.labelFor,
        value: event.target.value
      }
    }))
  }
}
