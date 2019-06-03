import { data, utils } from './lib'

import './css/index.css'

export const checkFormValidity = formElement => formElement.checkValidity()

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export const toStringFormValues = values => {
  const total = utils.currencyFormat(getAmount())

  return `
    Confirmação\n
    ${values
    .map(({ field, value }) => `Campo: ${field}, Valor: ${value}`)
    .join('\n')}`
    .concat(`\nTotal ${total}
  `)
}

export function Send (values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit (formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => alert('Your form submited error', error))
    }
  })
}

export function handleChangeRangeVehicleUnderWarranty (
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  vehicleWarrantyElement.value = utils.currencyFormat(warrantyRangeElement.value)

  warrantyRangeElement.addEventListener('change', function (event) {
    const {
      vehicle: {
        min_loan: minLoan
      }
    } = data.warrantyOptions

    updateRangeFields(minLoan, event.target.value, 'loan')

    vehicleWarrantyElement.value = utils.currencyFormat(warrantyRangeElement.value)
  })
}

export function handleChangeVehicleLoanAmount (
  loanAmountRangeElement,
  loanAmountElement
) {
  loanAmountElement.value = utils.currencyFormat(loanAmountRangeElement.value)
  loanAmountRangeElement.addEventListener('input', function (event) {
    loanAmountElement.value = utils.currencyFormat(event.target.value)
  })
}

export function handleWarrantySelect (
  warrantyElement,
  installmentElement
) {
  warrantyElement.addEventListener('change', function (event) {
    const { value: warrantyValue } = warrantyElement
    const { installments: installmentsValues } = data.warrantyOptions[warrantyValue]

    installmentElement.options.length = 0

    for (let index in installmentsValues) {
      installmentElement.options[installmentElement.options.length] =
        new Option(installmentsValues[index], index)
    }

    const { min_loan: min, max_loan: max } = data.warrantyOptions[warrantyValue]

    updateRangeFields(min, max, 'warranty')
    updateRangeFields(min, max, 'loan')
  })
}

export const updateValues = (val, type) =>
  type === 'loan'
    ? val * data.defaultValues.LOAN
    : val

export function handleInput (input, range) {
  input.addEventListener('input', (e) => {
    range.value = input.value
    input === data.elements.warranty.input && updateRangeFields(range.min, e.target.value, 'loan')
  })
}

export function updateRangeFields (min, max, type) {
  const {
    range: {
      element,
      min_label: minLabel,
      max_label: maxLabel
    },
    input
  } = data.elements[type]

  const valorMin = updateValues(min, type)
  const valorMax = updateValues(max, type)

  getTotal()

  minLabel.innerHTML = utils.currencyFormat(valorMin)
  maxLabel.innerHTML = utils.currencyFormat(valorMax)
  element.min = valorMin
  element.max = valorMax
  element.value = valorMin
  input.value = utils.currencyFormat(valorMin)
}

export const getAmount = () =>
  utils.amount(data.elements.installment.value, data.elements.loan.input.value)

export function getTotal () {
  data.elements.default.total.innerHTML = utils.currencyFormat(getAmount())
  data.elements.default.installments.innerHTML = utils.currencyFormat(utils.quota(getAmount(), data.elements.installment.value), false)
}

export function updateTotalValues () {
  data.elements.form.addEventListener('input', () => {
    getTotal()
  })
}

export default class CreditasChallenge {
  static initialize () {
    this.registerEvents()
  }

  static registerEvents () {
    Submit(data.elements.form)

    handleChangeRangeVehicleUnderWarranty(
      data.elements.warranty.range.element,
      data.elements.warranty.input
    )

    handleChangeVehicleLoanAmount(
      data.elements.loan.range.element,
      data.elements.loan.input
    )

    handleWarrantySelect(
      data.elements.warranty.element,
      data.elements.installment
    )

    updateRangeFields(
      data.warrantyOptions.vehicle.min_loan,
      data.warrantyOptions.vehicle.max_loan,
      'warranty'
    )

    updateRangeFields(
      data.warrantyOptions.vehicle.min_loan,
      data.warrantyOptions.vehicle.max_loan,
      'loan'
    )

    handleInput(
      data.elements.warranty.input,
      data.elements.warranty.range.element
    )

    handleInput(
      data.elements.loan.input,
      data.elements.loan.range.element
    )

    updateTotalValues()

    data.elements.default.tax.innerHTML = `${data.defaultValues.TAX}%`
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
