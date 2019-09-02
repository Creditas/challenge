import './creditas-simulation-result.component.css'

export class CreditasSimulationResult extends HTMLElement {
  /**
   * Creates an instance of CreditasSimulationResult.
   *
   * @memberof CreditasSimulationResult
   */
  constructor () {
    super()

    // Attaching context to event listeners.
    this.onCtaClick = this.onCtaClick.bind(this)
  }

  /**
   * Gets the tag of the web-component.
   *
   * @readonly
   * @static
   * @memberof CreditasSimulationResult
   */
  static get tag () {
    return 'creditas-simulation-result'
  }

  /**
   * Setting up attributes to observe.
   *
   * @readonly
   * @static
   * @memberof CreditasSimulationResult
   */
  static get observedAttributes() {
    return [
      'monthly-fee',
      'total-to-pay',
      'tax-rate'
    ]
  }

  /**
   * Fired every time an attribute changes its value.
   *
   * @memberof CreditasSimulationResult
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
   * @memberof CreditasSimulationResult
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
   * @memberof CreditasSimulationResult
   */
  render () {
    let monthlyFee = this.getAttribute('monthly-fee')
    let totalToPay = this.getAttribute('total-to-pay')
    let taxRate = this.getAttribute('tax-rate')

    this.innerHTML = `
      <div class="creditas-simulation-result__container">
        <div class="creditas-simulation-result__quota">
          <h4 class="creditas-simulation-result__title creditas-simulation-result__title--big">Valor da Parcela</h4>
          <div class="creditas-simulation-result__quota-details">
            <strong>R$</strong>
            <span>${monthlyFee}</span>
          </div>
        </div>

        <div class="creditas-simulation-result__amount">
          <h4 class="creditas-simulation-result__title">Total a pagar</h4>
          <p class="creditas-simulation-result__value">R$ ${totalToPay}</p>
        </div>

        <div class="creditas-simulation-result__tax">
          <h4 class="creditas-simulation-result__title">Taxa de juros (mês)</h4>
          <p class="creditas-simulation-result__value">${taxRate}%</p>
        </div>

        <button class="creditas-simulation-result__cta">Solicitar</button>
      </div>
    `
  }

  /**
   * Gets all dom elements for later use only once.
   *
   * @memberof CreditasSimulationResult
   */
  getDomElements () {
    this.$cta = this.querySelector('.creditas-simulation-result__cta')
  }

  /**
   * Sets all event listeners.
   *
   * @memberof CreditasSimulationResult
   */
  setEventListeners () {
    if (this.$cta) {
      this.$cta.addEventListener('click', this.onCtaClick, false)
    }
  }

  /**
   * Removes all event listeners.
   *
   * @memberof CreditasSimulationResult
   */
  removeEventListeners () {
    if (this.$cta) {
      this.$cta.removeEventListener('click', this.onCtaClick, false)
    }
  }

  /**
   * Triggers creditas-cta:clicked event.
   *
   * @param {*} event
   * @memberof CreditasSimulationResult
   */
  onCtaClick (event) {
    event.preventDefault()
    this.dispatchEvent(new CustomEvent('creditas-cta:clicked', { bubbles: true }))
  }
}
