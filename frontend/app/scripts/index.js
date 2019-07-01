import '../styles/main.css'
import {
  formattedValue,
  getFormValues,
  getInstallmentPrice,
  getLoanCondition,
  getTotalPrice,
  getWarrancyData,
  sendForm,
} from './utils/helpers'

import { elements } from './utils/data'

const selectInstallments = () => {
  const { installments, loan } = elements

  installments.addEventListener('change', (e) => {
    updateSummary(e.target.value, loan.input.value)
  })
}

const updateSummary = (parcel, loanAmount) => {
  const { summary } = elements
  const totalPrice = getTotalPrice(parcel, loanAmount)

  summary.total.innerHTML = formattedValue(totalPrice)
  summary.quota.innerHTML = formattedValue(getInstallmentPrice(totalPrice, parcel))
}

const handleLoanAmount = () => {
  const { installments, loan, warranty, warning } = elements
  const { tax } = getLoanCondition

  loan.input.addEventListener('blur', (e) => {
    const installmentSelected = installments[installments.selectedIndex].value
    const loanAmount = e.target.value

    warning.innerHTML = ''

    if (warranty.input.value < loanAmount * tax) {
      warning.innerHTML = `Para obter um empréstimo de ${formattedValue(loanAmount)} sua garantia não pode ser inferior a ${formattedValue(loanAmount * tax)}`
    }

    updateSummary(installmentSelected, loanAmount)
  })
}

const handleWarrantyAmount = () => {
  const { loan, warranty, warning } = elements
  const { tax } = getLoanCondition

  warranty.input.addEventListener('blur', (e) => {
    warning.innerHTML = ''
    loan.input.value = formattedValue(e.target.value / tax)
  })
}

export const handleWarranty = () => {
  const { installments, warranty } = elements
  const { tax } = getLoanCondition
  const installmentsEl = installments

  warranty.element.addEventListener('change', (e) => {
    const dataName = e.target.options[e.target.selectedIndex].dataset.name
    const { installments, loan, minLoan } = getWarrancyData(dataName)

    for (const i in installments) {
      installmentsEl.options[i] = new Option(installments[i], installments[i])
    }

    warranty.input.value = tax * minLoan
    loan.input.value = minLoan

    updateSummary(installments[0], minLoan)
  })
}

const handleRange = () => {
  const { loan, warranty } = elements
  const { tax } = getLoanCondition

  warranty.range.element.addEventListener('change', (e) => {
    const target = e.target.value

    warranty.input.value = target
    loan.input.value = target / tax
  })

  loan.range.element.addEventListener('change', (e) => {
    const target = e.target.value

    loan.input.value = target
    warranty.input.value = target * tax
  })
}

export const submitForm = () => {
  const { installments, form, loan } = elements
  const installmentSelected = installments[installments.selectedIndex].value

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    sendForm(getFormValues(e.target), installmentSelected, loan.input.value)
      .then(result => confirm(result, 'Your form submited success'))
      .catch(error => alert('Your form submited error', error))
  })
}

export default class CreditasChallenge {
  static initialize() {
    handleWarranty()
    handleLoanAmount()
    handleWarrantyAmount()
    selectInstallments()
    handleRange()
    submitForm()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  CreditasChallenge.initialize()
})
