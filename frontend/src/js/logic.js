const toCurrency = (value) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  return formatter.format(value)
}

const prettryValue = (value) => Number((value).toFixed(1)).toLocaleString('pt-BR')

const match = matchString => value => value.field === matchString

function calculationLending (values) {
  const IOF = 6.38 / 100
  const INTEREST_RATE = 2.34 / 100
  const TIME = values.find(match('parcelas')).value / 1000
  const VEHICLE_LOAN_AMOUNT = values.find(match('valor-emprestimo')).value
  return (IOF + INTEREST_RATE + TIME + 1) * VEHICLE_LOAN_AMOUNT
}

const fromValuesToString = values => {
  const amount = calculationLending(values)
  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`
    .concat(`\nTotal ${toCurrency(amount)}`)
}

const checkFormValidity = formElement => formElement.checkValidity()

export {
  toCurrency,
  match,
  calculationLending,
  fromValuesToString,
  checkFormValidity,
  prettryValue
}
