export const getWarrancyData = (value) => {
  const options = {
    property: {
      installments: [120, 180, 240],
      maxLoan: 4500000,
      minLoan: 30000,
    },
    vehicle: {
      installments: [24, 36, 48],
      maxLoan: 100000,
      minLoan: 3000,
    },
  }

  return options[value]
}

export const getLoanCondition = {
  interestRate: 2.34,
  IOF: 6.38,
  tax: 1.25,
}

export const getTotalPrice = (installmentValue, loanAmount) => {
  const { interestRate, IOF } = getLoanCondition

  return ((IOF / 100) + (interestRate / 100) + (installmentValue / 1000) + 1) * loanAmount
}

export const getInstallmentPrice = (totalPrice, installment) => totalPrice / installment

export const formattedValue = (number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimunFractionDigits: 2,
}).format(number)

export const getFormValues = (formElement) => Object.values(formElement.elements)
  .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
  .map(element => ({
    name: element.name,
    value: element.value,
  }))

export const toStringFormValues = (values, parcel, loanAmount) => values.map(v => {
  const isCoinType = v.name === 'Garantia' || v.name === 'Parcelas'
  return `${v.name}: ${!isCoinType ? formattedValue(v.value) : v.value}`
})
  .join('\n')
  .concat(`\nTotal ${formattedValue(getTotalPrice(parcel, loanAmount))}`)

export const sendForm = (values, installmentSelected, loanAmount) => new Promise((resolve, reject) => {
  try {
    resolve(toStringFormValues(values, installmentSelected, loanAmount))
  }
  catch (error) {
    reject(error)
  }
})
