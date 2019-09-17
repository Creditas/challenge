const toStringFormValues = values => {
  const match = matchString => value => value.field === matchString
  const IOF = 6.38 / 100
  const INTEREST_RATE = 2.34 / 100
  const TIME = values.find(match('quota')).value / 1000
  const LOAN_AMOUNT = values.find(match('loanValue')).value

  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`.concat(`\nTotal ${(IOF + INTEREST_RATE + TIME + 1) * LOAN_AMOUNT}`)
}

export default toStringFormValues
