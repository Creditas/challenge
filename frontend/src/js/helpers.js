/**
 * functions auxiliar
 **/

const getFormValues = (formElement) =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({ field: element.name, value: element.value }))

export const getItemForm = (formElement, element) => {
  const values = getFormValues(formElement)
  const match = matchString => value => value.field === matchString
  return values.find(match(element))
}

export const send = (funct) => new Promise((resolve, reject) => {
  try {
    resolve(funct())
  } catch (error) {
    reject(error)
  }
})

export const numberWithCommas = (num) => {
  const number = num || 0
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const checkFormValidity = (formElement, params) => {
  const valueGuarantee = getItemForm(formElement, params.VALUE_GUARANTEE).value.replace(',', '')
  const valueBusiness = getItemForm(formElement, params.VALUE_BUSINESS).value.replace(',', '')
  const percent = valueGuarantee * params.MAX_CREDIT_PERCENTAGE
  const validate = {
    isValid: (formElement.checkValidity() && valueBusiness <= percent),
    error: valueBusiness <= percent ? null : {
      msg: `You cannot request a loan with a value greater than your guarantee,
        the maximum you can request with this guarantee is ${numberWithCommas(percent)}`,
      value: percent
    }
  }
  return validate
}
