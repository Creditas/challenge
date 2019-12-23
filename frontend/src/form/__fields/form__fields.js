import './form__fields.css'

const data = {
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

function handleWarrantyChange (
  warrantyElement,
  minLendingElement,
  maxLendingElement,
  installmentsElement,
  warrantyRangeElement
) {
  warrantyElement.addEventListener('change', function () {
    const warrantyType = warrantyElement.value
    const values = data[warrantyType]
    updateInstallmentsOptions(Array.from(installmentsElement.options), values)
    updateLendingValues(minLendingElement, maxLendingElement, values)
    updateLimites(warrantyRangeElement, values)
  })
}

export { handleWarrantyChange }
