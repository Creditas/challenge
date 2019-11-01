/**
 * main class of the program
 **/
import DOM from './domElements'
import setValuesToGuarantee from './setValuesToGuarantee'
import {
  VALUE_GUARANTEE,
  VALUE_BUSINESS,
  MONTHS,
  FTT,
  INTEREST_RATE,
  MAX_CREDIT_PERCENTAGE
} from './constans'
import {
  send,
  checkFormValidity,
  numberWithCommas,
  getItemForm
} from './helpers'

export default class CreditasChallenge {
  /**
  * static function to calculate credits
  **/

  static calculateFormValues () {
    const ftt = FTT / 100
    const interestRate = INTEREST_RATE / 100
    const termInMonths = getItemForm(DOM.element.form, MONTHS).value
    const loanAmount = getItemForm(DOM.element.form, VALUE_BUSINESS).value.replace(',', '')
    const totalLoanPayments = (ftt + interestRate + (termInMonths / 1000) + 1) * loanAmount
    const monthlyPayment = totalLoanPayments / termInMonths
    return {
      totalLoanPayments,
      monthlyPayment
    }
  }

  /**
  * static function that returns an object with the methods to be used in each event defined in the suscribeEvents function.
  **/

  static events () {
    const objEvents = {
      guarantee: (event) => {
        setValuesToGuarantee({
          key: event.target.value,
          element: DOM.element
        })
      },
      underWarranty: (event) => {
        DOM.element.valueGuarantee.value = numberWithCommas(event.target.value)
      },
      loanAmount: (event) => {
        DOM.element.valueBusiness.value = numberWithCommas(event.target.value)
      },
      submit: (event) => {
        event.preventDefault()
        const checkForm = checkFormValidity(DOM.element.form, { VALUE_GUARANTEE, VALUE_BUSINESS, MAX_CREDIT_PERCENTAGE })
        if (checkForm.isValid) {
          send(this.calculateFormValues)
            .then(result => {
              DOM.element.quotaMonth.innerText = numberWithCommas(result.monthlyPayment.toFixed(2))
              DOM.element.quotaTotal.innerText = `R$ ${numberWithCommas(result.totalLoanPayments.toFixed(2))}`
            })
            .catch(error => alert('Your form submited error', error)) // eslint-disable-line
        } else {
          alert(checkForm.error.msg)// eslint-disable-line
          DOM.element.valueBusiness.value = numberWithCommas(checkForm.error.value) 
          DOM.element.valueBusinessRange.value = checkForm.error.value
        }
      }
    }

    return objEvents
  }

  /**
  * event subscription
  **/

  static suscribeEvents () {
    DOM.element.guarantee.addEventListener('change', this.events().guarantee)
    DOM.element.valueGuaranteeRange.addEventListener('change', this.events().underWarranty)
    DOM.element.valueBusinessRange.addEventListener('change', this.events().loanAmount)
    DOM.element.form.addEventListener('submit', this.events().submit)
  }

  /**
  * function initial
  **/

  static initialize () {
    DOM.init()
    this.suscribeEvents()
  }
}
