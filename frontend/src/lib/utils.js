import { data } from '.'

function currencyFormat (v, placeholder = true) {
  const value = v.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return placeholder ? `R$ ${value}` : value
}

function parseCurrencyToNumber (v) {
  return Number(v.replace(/[^0-9.-]+/g, ''))
}

const amount = (installment, loan) => {
  const installmentValue = parseCurrencyToNumber(installment)
  const loanValue = parseCurrencyToNumber(loan)
  const amount = (
    (data.defaultValues.IOF / 100) +
    (data.defaultValues.TAX / 100) +
    (installmentValue / 1000) + 1) *
    loanValue

  return amount
}

const quota = (total, installment) => (total / installment)

export default {
  currencyFormat,
  parseCurrencyToNumber,
  amount,
  quota
}
