import './form.css'

function getFormValues (formElement) {
  return Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))
}

const checkFormValidity = formElement => formElement.checkValidity()

const match = matchString => value => value.field === matchString

function calculationLending (values) {
  const IOF = 6.38 / 100
  const INTEREST_RATE = 2.34 / 100
  const TIME = values.find(match('parcelas')).value / 1000
  const VEHICLE_LOAN_AMOUNT = values.find(match('valor-emprestimo')).value
  return (IOF + INTEREST_RATE + TIME + 1) * VEHICLE_LOAN_AMOUNT
};

const toStringFormValues = values => {
  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`
    .concat(`\nTotal ${calculationLending(values)}`)
}

function Send (values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values))
    } catch (error) {
      reject(error)
    }
  })
}

function Submit (formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      const values = getFormValues(formElement)
      Send(values)
        .then(result => window.confirm(result, 'Your form submited success'))
        .catch(error => window.alert('Your form submited error', error))
    }
  })
}

function handleFields (formElement, totalElement, parcelaElement) {
  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .forEach((element) => {
      element.addEventListener('change', (event) => {
        const values = getFormValues(formElement)
        const lendinValue = calculationLending(values)
        totalElement.innerHTML = formatter.format(lendinValue)
        parcelaElement.innerHTML = formatter.format(lendinValue / values.find(match('parcelas')).value)
      })
    })
}

export { Submit, handleFields }
