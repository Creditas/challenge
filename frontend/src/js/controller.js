import { 
  toCurrency,
  match,
  calculationLending,
  checkFormValidity,
  fromValuesToString
} from './logic'

const warrantyByType = {
  'imovel': {
    'minLending': 30000.0,
    'maxLending': 4500000.0,
    'installments': [
      120, 180, 240
    ]
  },
  'veiculo': {
    'minLending': 3000.0,
    'maxLending': 100000.0,
    'installments': [
      24, 36, 48
    ]
  }
}

function updateInstallmentsOptions (
  installmentsOptions,
  values
) {
  installmentsOptions.forEach((element, index) => {
    const installment = values.installments[index]
    element.text = installment
    element.value = installment
  })
}

function updateLimites (input, values) {
  input.min = values.minLending
  input.max = values.maxLending
}

function updateLendingValues (
  minLendingElement,
  maxLendingElement,
  values
) {
  minLendingElement.innerHTML = values.minLending
  maxLendingElement.innerHTML = values.maxLending
}

function updateFieldsByWarrantyType (
  warrantyType,
  minLendingElement,
  maxLendingElement,
  installmentsElement,
  warrantyRangeElement
) {
  const values = warrantyByType[warrantyType]
  updateInstallmentsOptions(Array.from(installmentsElement.options), values)
  updateLendingValues(minLendingElement, maxLendingElement, values)
  updateLimites(warrantyRangeElement, values)
}

function updateFieldByRangeValue (
  value,
  inputElement
) {
  inputElement.value = value
}

function updateResultCard (
  formValues,
  totalAmountElement,
  valueInstallmentElement
) {
  const lendinValue = calculationLending(formValues)
  const installmentsPerMonth = lendinValue / formValues.find(match('parcelas')).value
  totalAmountElement.innerHTML = toCurrency(lendinValue)
  valueInstallmentElement.innerHTML = toCurrency(installmentsPerMonth)
}

function send (values) {
  return new Promise((resolve, reject) => {
    try {
      resolve(fromValuesToString(values))
    } catch (error) {
      reject(error)
    }
  })
}

function sendInformation (
  formValues,
  formElement
) {
  if (checkFormValidity(formElement)) {
    send(formValues)
      .then(result => window.confirm(result, 'Your form submited success'))
      .catch(error => window.alert('Your form submited error', error))
  }
}

export {
  updateFieldsByWarrantyType,
  updateFieldByRangeValue,
  updateResultCard,
  sendInformation
}
