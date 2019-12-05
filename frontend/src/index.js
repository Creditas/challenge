import {
  toCurrency,
  checkFormValidity,
  checkValueIntegrity
} from './helpers'
import {
  optionValues,
  commonValues
} from './helpers/values'
import {
  el
} from './helpers/elements'

import './styles.css'

class CreditasChallenge {
  constructor(options, common) {
    this.optionValues = options
    this.commonValues = common
    this.initialize()
  }
  initialize() {
    document.addEventListener('DOMContentLoaded', () => {
      this.registerEvents()
    })
  }

  registerEvents() {
    this.Submit(el.form)
    this.changeValuesAccordingForm()
    this.getSelectOptions('garantia', el.warrantySelect)
    this.getSelectOptions('prazo', el.warrantySelect)
    this.populateSelect()

    this.handleRangeChange(el.warrantyRange, el.warrantyInput)
    this.handleRangeChange(el.loanRange, el.loanInput)

    this.handleInputChange(el.warrantyInput, el.warrantyRange, el.warrantyRange.min, el.warrantyRange.max)
    this.handleInputChange(el.loanInput, el.loanRange, el.loanRange.min, el.loanRange.max)

    el.rateValue.innerHTML = this.commonValues.juros + '%'
  }

  toggleValue(typeInput, val) {
    return typeInput === 'emprestimo' ? val * this.commonValues.valorEmprestimo : val
  }

  amount(prazo, emprestimo) {
    return ((this.commonValues.iof / 100) + (this.commonValues.juros / 100) + (prazo / 1000) + 1) * emprestimo
  }

  quota(total, prazo) {
    return (total / prazo)
  }

  setRangeValues(min, max, rangeType) {
    const minV = document.getElementById(`min-${rangeType}`)
    const maxV = document.getElementById(`max-${rangeType}`)
    const rangeValue = document.getElementById(`valor-${rangeType}-range`)
    const rangeInput = document.getElementById(`valor-${rangeType}`)

    const valorMin = this.toggleValue(rangeType, min)
    const valorMax = this.toggleValue(rangeType, max)
    minV.innerHTML = toCurrency(valorMin)
    maxV.innerHTML = toCurrency(valorMax)
    rangeValue.min = valorMin
    rangeValue.max = valorMax
    rangeValue.value = valorMin
    rangeInput.value = valorMin
  }

  getSelectOptions(fieldID, warrantySelect) {
    const select = document.getElementById(fieldID)
    const nodeIndex = warrantySelect.value || 'Veículo'
    const nodeList = this.optionValues[nodeIndex]
    const list = fieldID === 'garantia' ? Object.getOwnPropertyNames(this.optionValues) : nodeList.prazo
    for (let i of list) {
      select.options[select.options.length] = new Option(i, i)
    }

    this.setRangeValues(nodeList.valorMin, nodeList.valorMax, 'garantia')
    this.setRangeValues(nodeList.valorMin, nodeList.valorMin, 'emprestimo')
  }

  getFormValues(formElement) {
    return Object.values(formElement.elements)
      .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
      .map(element => ({
        field: element.name,
        value: element.value
      }))
  }

  toStringFormValues(values) {
    const total = this.amount(el.timeSelect.value, el.loanInput.value)

    const stringReturned = `Confirmação\n${values
    .map(value => `Campo: ${value.field} | \tValor: ${value.field.startsWith('valor') ? 'R$ ' + toCurrency(value.value) : value.value}`)
    .join('\n')}`.concat(
      `\nTotal: R$ ${toCurrency(total)}`)

    return stringReturned
  }

  Send(values) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.toStringFormValues(values))
      } catch (error) {
        reject(error)
      }
    })
  }

  Submit(formElement) {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault()
      checkFormValidity(formElement) && (
        this.Send(this.getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => alert('Your form submited error', error))
      )
    })
  }

  handleInputChange(input, range, min, max) {
    input.addEventListener('input', (e) => {
      if (checkValueIntegrity(e.target.value, min, max)) {
        range.value = input.value
        input === el.warrantyInput && this.setRangeValues(range.min, e.target.value, 'emprestimo')
      } else {
        alert('O valor é inválido')
        input.value = min
        range.value = min
      }
    })
  }

  getAmount() {
    return this.amount(el.timeSelect.value, el.loanInput.value)
  }

  handleRangeChange(range, input) {
    range.addEventListener('input', (e) => {
      input.value = e.target.value
      range === el.warrantyRange && this.setRangeValues(range.min, e.target.value, 'emprestimo')
    })
    this.getResult()
  }

  getResult() {
    el.totalValue.innerHTML = `${toCurrency(this.getAmount())}`
    el.quotaValue.innerHTML = toCurrency(this.quota(this.getAmount(), el.timeSelect.value))
  }

  populateSelect() {
    el.warrantySelect.addEventListener('change', () => {
      let select = el.timeSelect
      select.options.length = 0
      this.getSelectOptions('prazo', el.warrantySelect)
    })
  }

  changeValuesAccordingForm() {
    el.form.addEventListener('input', () => {
      this.getResult()
    })
  }
}

module.exports = new CreditasChallenge(optionValues, commonValues)
