import checkFormValidity from '../../helpers/checkFormValidity'
import send from '../../helpers/send'
import getFormValues from '../../helpers/getFormValues'
import currency from '../../helpers/currency'

import rules from '../../data/rules'

const Loan = class Loan {
  constructor (element) {
    this.loan = element

    this.loanWarrantyValue = element.querySelector(`[data-${Loan.name}-warranty-value]`)
    this.loanRangeWarrantyValue = element.querySelector(`[data-${Loan.name}-range-warranty-value]`)
    this.loanRangeWarrantyTextValues = element.querySelector(`[data-${Loan.name}-warranty-range-text-values]`)

    this.loanValue = element.querySelector(`[data-${Loan.name}-value]`)
    this.loanRangeValue = element.querySelector(`[data-${Loan.name}-range-value]`)

    this.loanWarranty = element.querySelector(`[data-${Loan.name}-warranty]`)
    this.loanQuota = element.querySelector(`[data-${Loan.name}-quota]`)
    this.loanRangeTextValues = element.querySelector(`[data-${Loan.name}-range-text-values]`)

    this.loanParcel = element.querySelector(`[data-${Loan.name}-parcel]`)
    this.teste = element.querySelector(`[data-${Loan.name}-total]`)

    this.loadDatas('vehicle')
    this.observe()
  }

  submit (formElement) {
    formElement.addEventListener('submit', event => {
      event.preventDefault()

      if (checkFormValidity(formElement)) {
        send(getFormValues(formElement))
          .then(result => confirm(result, 'Your form submited success'))
          .catch(error => alert('Your form submited error', error))
      }
    })
  }

  textValues (container, type, loan) {
    container.innerHTML = ''

    const fragment = document.createDocumentFragment()

    Object.entries(rules[type][loan]).forEach(value => {
      const span = document.createElement('span')
      span.textContent = currency(value[1])

      fragment.append(span)
    })

    return container.append(fragment)
  }

  inputAssign (elRange, type, loan) {
    Object.assign(elRange, {
      min: parseFloat(rules[type][loan].minValue),
      max: parseFloat(rules[type][loan].maxValue),
      value: parseFloat(rules[type][loan].minValue)
    })
  }

  loanCount (totalAmount) {
    return ((rules.taxes.iof / 100) + (rules.taxes.interestRate / 100) + (parseInt(this.loanQuota.options[this.loanQuota.selectedIndex].value) / 1000) + 1) * parseInt(totalAmount)
  }

  parcelCount (totalAmount, parcel) {
    return this.loanCount(totalAmount) / parseInt(parcel)
  }

  loanTotal () {
    return currency(this.loanCount(this.loanRangeValue.value))
  }

  parcelTotal () {
    return currency(this.parcelCount(this.loanRangeValue.value, this.loanQuota.options[this.loanQuota.selectedIndex].value)).replace('R$', '')
  }

  valuesToDisplay (input, target) {
    input.value = currency(target.value)

    this.teste.textContent = this.loanTotal()
    this.loanParcel.textContent = this.parcelTotal()
  }

  quotaOptions (type) {
    this.loanQuota.innerHTML = ''

    const fragment = document.createDocumentFragment()

    rules[type].parcels.forEach(parcel => {
      const option = document.createElement('option')
      option.value = parcel
      option.textContent = parcel

      fragment.append(option)
    })

    this.loanQuota.append(fragment)
  }

  observe () {
    this.loanRangeWarrantyValue.addEventListener('change', event => {
      this.valuesToDisplay(this.loanWarrantyValue, event.target)
    })

    this.loanRangeValue.addEventListener('change', event => {
      this.valuesToDisplay(this.loanValue, event.target)
    })

    this.loanQuota.addEventListener('change', () => {
      this.loanParcel.textContent = this.parcelTotal()
    })

    this.loanWarranty.addEventListener('change', event => {
      const type = event.target.options[event.target.selectedIndex].value

      this.quotaOptions(type)
      this.loadDatas(type)
    })

    this.submit(this.loan)
  }

  loadDatas (type) {
    this.inputAssign(this.loanRangeWarrantyValue, type, 'warranty')
    this.inputAssign(this.loanRangeValue, type, 'loan')

    this.textValues(this.loanRangeWarrantyTextValues, type, 'warranty')
    this.textValues(this.loanRangeTextValues, type, 'loan')

    this.valuesToDisplay(this.loanValue, this.loanRangeValue)
    this.valuesToDisplay(this.loanWarrantyValue, this.loanRangeWarrantyValue)
  }

  static get name () {
    return 'loan'
  }

  static init () {
    [...document.querySelectorAll(`[data-${Loan.name}]`)].forEach(element => new Loan(element))
  }
}

export { Loan }
