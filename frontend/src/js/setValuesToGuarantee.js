/**
 * set the information on the DOM depending on the type of guarantee
 **/

import { numberWithCommas } from './helpers'
import {
  TYPE_IMOVEL,
  TYPE_VEICULO,
  MIN_VALUE_VEICULO,
  MAX_VALUE_VEICULO,
  MONTHS_VEICULO,
  MIN_VALUE_IMOVEL,
  MAX_VALUE_IMOVEL,
  MONTHS_IMOVEL,
  MAX_CREDIT_PERCENTAGE
} from './constans'

export default (payload) => {
  switch (payload.key) {
    case TYPE_VEICULO:
      setValuesDOM(payload.element, {
        min: MIN_VALUE_VEICULO,
        max: MAX_VALUE_VEICULO,
        months: MONTHS_VEICULO
      })

      break
    case TYPE_IMOVEL:
      setValuesDOM(payload.element, {
        min: MIN_VALUE_IMOVEL,
        max: MAX_VALUE_IMOVEL,
        months: MONTHS_IMOVEL
      })
      break

    default:
      setValuesDOM(payload.element, {
        min: MIN_VALUE_VEICULO,
        max: MAX_VALUE_VEICULO,
        months: MONTHS_VEICULO
      })
      break
  }
}

export const setValuesDOM = (payload = {}, params = {}) => {
  Object
    .values(payload.months)
    .map((element, index) => {
      element.text = params.months[index]
      element.value = params.months[index]
    })

  payload.valueGuaranteeRange.min = Number(params.min)
  payload.valueGuaranteeRange.max = Number(params.max)
  payload.valueGuaranteeRange.value = 0
  payload.valueGuarantee.value = numberWithCommas(Number(params.min))
  payload
    .valuesGuaranteeRangeBottom
    .getElementsByTagName('span')[0]
    .innerText = numberWithCommas(Number(params.min))
  payload
    .valuesGuaranteeRangeBottom
    .getElementsByTagName('span')[1]
    .innerText = numberWithCommas(Number(params.max))

  payload.valueBusinessRange.min = Number(params.min) * MAX_CREDIT_PERCENTAGE
  payload.valueBusinessRange.max = Number(params.max) * MAX_CREDIT_PERCENTAGE
  payload.valueBusinessRange.value = 0
  payload.valueBusiness.value = numberWithCommas(Number(params.min) * MAX_CREDIT_PERCENTAGE)
  payload
    .valuesBusinessRangeBottom
    .getElementsByTagName('span')[0]
    .innerText = numberWithCommas(Number(params.min) * MAX_CREDIT_PERCENTAGE)
  payload
    .valuesBusinessRangeBottom
    .getElementsByTagName('span')[1]
    .innerText = numberWithCommas(Number(params.max) * MAX_CREDIT_PERCENTAGE)
}
