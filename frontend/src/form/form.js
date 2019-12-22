import './form.css'

export const checkFormValidity = formElement => formElement.checkValidity()

function calculationLendingVehicle (values) {
  const match = matchString => value => value.field === matchString
  const IOF = 6.38 / 100
  const INTEREST_RATE = 2.34 / 100
  const TIME = values.find(match('parcelas')).value / 1000
  const VEHICLE_LOAN_AMOUNT = values.find(match('valor-emprestimo')).value
  return (IOF + INTEREST_RATE + TIME + 1) * VEHICLE_LOAN_AMOUNT
};

export const toStringFormValues = values => {
  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`
    .concat(`\nTotal ${calculationLendingVehicle(values)}`)
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

export default function Submit (formElement, formValues) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(formValues)
        .then(result => window.confirm(result, 'Your form submited success'))
        .catch(error => window.alert('Your form submited error', error))
    }
  })
}
