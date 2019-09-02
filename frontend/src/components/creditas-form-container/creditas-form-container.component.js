import './creditas-form-container.component.css'
import template from './creditas-form-container.component.html'
import { calculateTotalToPay, calculateMonthlyFee, toCurrency } from '@/src/utils/calculate-loan'
import { IOF } from '@/src/config/constants'
import loanTypesConfig from '@/src/config/types'

export class CreditasFormContainer extends HTMLElement {
  /**
   * Creates an instance of CreditasFormContainer.
   *
   * @memberof CreditasFormContainer
   */
  constructor () {
    super()

    // Initialising component.
    this.loanType = loanTypesConfig.default
    this.loanMonths = loanTypesConfig.types[this.loanType].months[0]
    this.loanAmount = loanTypesConfig.types[this.loanType].minLoanAmount

    // Attaching context to event listeners.
    this.onDropdownChange = this.onDropdownChange.bind(this)
    this.onRangeChange = this.onRangeChange.bind(this)
  }

  /**
   * Gets the tag of the web-component.
   *
   * @readonly
   * @static
   * @memberof CreditasFormContainer
   */
  static get tag () {
    return 'creditas-form-container'
  }

  /**
   * Is invoked each time the custom element is appended into
   * a document-connected element.
   *
   * @memberof CreditasFormContainer
   */
  connectedCallback () {
    this.removeEventListeners()
    this.render()
    this.getDomElements()
    this.updateInitialRangeValues()
    this.setEventListeners()

    this.updateSimulationBox()
  }

  /**
   * Renders the component.
   *
   * @memberof CreditasFormContainer
   */
  render () {
    this.innerHTML = template
  }

  /**
   * Gets all dom elements for later use only once.
   *
   * @memberof CreditasFormContainer
   */
  getDomElements () {
    this.$selectMonths = this.querySelector('.creditas-main-container__select-months')
    this.$selectTypes = this.querySelector('.creditas-main-container__select-types')
    this.$warrantyRange = this.querySelector('.creditas-main-container__warranty-range')
    this.$loanRange = this.querySelector('.creditas-main-container__loan-range')
    this.$simulationBox = this.querySelector('.creditas-main-container__simulation-box')
  }

  /**
   * Updates the range values if the type is changed.
   *
   * @memberof CreditasFormContainer
   */
  updateInitialRangeValues () {
    const TYPE = loanTypesConfig.types[this.loanType]

    this.$warrantyRange.setAttribute('initial-value', TYPE.minWarrantyAmount)
    this.$warrantyRange.setAttribute('min-value', TYPE.minWarrantyAmount)
    this.$warrantyRange.setAttribute('max-value', TYPE.maxWarrantyAmount)
    this.$loanRange.setAttribute('initial-value', TYPE.minLoanAmount)
    this.$loanRange.setAttribute('min-value', TYPE.minLoanAmount)
    this.$loanRange.setAttribute('max-value', TYPE.minLoanAmount)
  }

  /**
   * Sets all event listeners.
   *
   * @memberof CreditasFormContainer
   */
  setEventListeners () {
    this.addEventListener('creditas-dropdown:changed', this.onDropdownChange, false)
    this.addEventListener('creditas-range-input:changed', this.onRangeChange, false)
  }

  /**
   * Removes all event listeners.
   *
   * @memberof CreditasFormContainer
   */
  removeEventListeners () {
    this.removeEventListener('creditas-dropdown:changed', this.onDropdownChange, false)
    this.removeEventListener('creditas-range-input:changed', this.onRangeChange, false)
  }

  /**
   * Called when the warranty dropdown changes its value.
   *
   * @param {*} event
   * @memberof CreditasFormContainer
   */
  onDropdownChange (e) {
    if (e.detail && e.detail.label === 'garantia') {
      // Updating the months dropdown if the type is changed.
      const MONTHS = loanTypesConfig.types[e.detail.value].months.join(',')
      this.$selectMonths.setAttribute('dropdown-values', MONTHS)

      // Updating the selected loan type and the ranges values accordingly.
      this.loanType = e.detail.value
      this.loanMonths = loanTypesConfig.types[this.loanType].months[0]
      this.updateInitialRangeValues()
    }

    if (e.detail && e.detail.label === 'parcelas') {
      this.loanMonths = e.detail.value
    }

    this.updateSimulationBox()
  }

  /**
   * Updates the max loan range, depending on the warranty amount selected.
   * The loan a customer can get access to is never higher than 80% of the warranty provided.
   *
   * @param {*} e
   * @memberof CreditasFormContainer
   */
  onRangeChange (e) {
    if (e.detail && e.detail.label === 'garantia') {
      this.$loanRange.setAttribute('max-value', e.detail.value * loanTypesConfig.maxLoanRate)
    }

    if (e.detail && e.detail.label === 'emprestimo') {
      this.loanAmount = e.detail.value
    }

    this.updateSimulationBox()
  }

  /**
   * Updating the simulation box.
   *
   * @memberof CreditasFormContainer
   */
  updateSimulationBox () {
    const totalPayments = calculateTotalToPay(this.loanAmount, this.loanMonths)
    const monthlyFee = calculateMonthlyFee(totalPayments, this.loanMonths)

    this.$simulationBox.setAttribute('total-to-pay', toCurrency(totalPayments))
    this.$simulationBox.setAttribute('monthly-fee', toCurrency(monthlyFee))
    this.$simulationBox.setAttribute('tax-rate', toCurrency(IOF * 100))
  }
}
