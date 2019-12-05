export const toCurrency = number => number.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const checkFormValidity = formElement => formElement.checkValidity()

export const checkValueIntegrity = (value, min, max) => !isNaN(value) && ((value - min) * (value - max) <= 0)
