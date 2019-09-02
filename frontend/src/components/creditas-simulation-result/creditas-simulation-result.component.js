import './creditas-simulation-result.component.css'

export class CreditasSimulationResult extends HTMLElement {
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
    this.render()
  }

  /**
   * Is invoked each time the custom element is appended into
   * a document-connected element.
   *
   * @memberof CreditasSimulationResult
   */
  connectedCallback () {
    this.render()
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
}
