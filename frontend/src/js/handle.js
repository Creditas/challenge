import { updateFieldsByWarrantyType, updateFieldByRangeValue, updateResultCard, sendInformation } from './controller'

const isInputElement = (element) => ['SELECT', 'INPUT'].includes(element.nodeName)

const fromFormToValues = (formElement) => {
  return Object.values(formElement.elements)
    .filter(isInputElement)
    .map(element => ({
      field: element.name,
      value: element.value
    }))
}

const handleWarrantyChange = (
  event,
  minLendingElement,
  maxLendingElement,
  installmentsElement,
  warrantyRangeElement
) => {
  const warrantyType = event.target.value
  updateFieldsByWarrantyType(
    warrantyType,
    minLendingElement,
    maxLendingElement,
    installmentsElement,
    warrantyRangeElement
  )
}

const handleRangeLendingChange = (
  event,
  lendingInputElement
) => {
  const value = event.target.value
  updateFieldByRangeValue(value, lendingInputElement)
}

const handleRangeWarrantyChange = (
  event,
  lendingInputElement
) => {
  const value = event.target.value
  updateFieldByRangeValue(value, lendingInputElement)
}

const handleFieldsChange = (
  _,
  formElement,
  totalAmountElement,
  valueInstallmentElement
) => {
  const fieldValues = fromFormToValues(formElement)
  updateResultCard(
    fieldValues,
    totalAmountElement,
    valueInstallmentElement
  )
}

const handleFormSubmit = (
  _,
  formElement
) => {
  const fieldValues = fromFormToValues(formElement)
  sendInformation(
    fieldValues,
    formElement
  )
}

export default class CreditasChallenge {
  static initialize () {
    this.registerEvents()
  }

  static registerEvents () {
    const formElement = document.querySelector('.form')
    const warrantyElement = document.querySelector('#garantia')
    const minLendingElement = document.querySelector('#valor-min-emprestimo')
    const maxLendingElement = document.querySelector('#valor-max-emprestimo')
    const installmentsElement = document.querySelector('#parcelas')
    const rangeLendingElement = document.querySelector('#valor-emprestimo-range')
    const rangeWarrantyElement = document.querySelector('#valor-garantia-range')
    const valueLendingElement = document.querySelector('#valor-emprestimo')
    const valueWarrantyElement = document.querySelector('#valor-garantia')
    const totalAmountElement = document.querySelector('#total-a-pagar')
    const valueInstallmentElement = document.querySelector('#valor-parcela')

    rangeWarrantyElement.addEventListener('change', (event) => {
      handleRangeWarrantyChange(
        event,
        valueWarrantyElement
      )
    })

    rangeLendingElement.addEventListener('change', (event) => {
      handleRangeLendingChange(
        event,
        valueLendingElement
      )
    })

    warrantyElement.addEventListener('change', (event) => {
      handleWarrantyChange(
        event,
        minLendingElement,
        maxLendingElement,
        installmentsElement,
        rangeLendingElement
      )
    })

    Object.values(formElement.elements)
      .filter(isInputElement)
      .forEach((element) => {
        element.addEventListener('change', (event) => {
          handleFieldsChange(
            event,
            formElement,
            totalAmountElement,
            valueInstallmentElement
          )
        })
      })

    formElement.addEventListener('submit', function (event) {
      event.preventDefault()
      handleFormSubmit(
        event,
        formElement
      )
    })

    const fieldValues = fromFormToValues(formElement)
    updateResultCard(
      fieldValues,
      totalAmountElement,
      valueInstallmentElement
    )
  }
}
