import './variable/colors.css'
import './styles.css'
import './header/header.css'
import './header/__container/header__container.css'
import './field-group/field-group.css'
import './field/field.css'
import './form/__fields/form__fields.css'
import './range/range.css'
import './range/__values/range__values.css'
import './range/__input/range__input.css'
import './form/__result/form__result.css'
import './footer/footer.css'
import './quota/quota.css'
import './quota/__container/quota__container.css'
import './button/button.css'
import Submit from './form/form'

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export function handleChangeRangeVehicleUnderWarranty (
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  const MIN_VALUE = 12000.0
  warrantyRangeElement.addEventListener('change', function (event) {
    vehicleWarrantyElement.value =
      (Number(MIN_VALUE) * Number(event.target.value)) / 100 + Number(MIN_VALUE)
  })
}

export function handleChangeVehicleLoanAmount (
  loanAmountRangeElement,
  loanAmountElement
) {
  const MIN_VALUE = 30000.0
  loanAmountRangeElement.addEventListener('change', function (event) {
    loanAmountElement.value =
      (Number(MIN_VALUE) * Number(event.target.value)) / 100 + Number(MIN_VALUE)
  })
}

export default class CreditasChallenge {
  static initialize () {
    this.registerEvents()
  }

  static registerEvents () {
    const formElement = document.querySelector('.form')
    const fromValues = getFormValues(formElement)  
    Submit(formElement, fromValues)

    handleChangeRangeVehicleUnderWarranty(
      document.getElementById('valor-garantia-range'),
      document.getElementById('valor-garantia')
    )

    handleChangeVehicleLoanAmount(
      document.getElementById('valor-emprestimo-range'),
      document.getElementById('valor-emprestimo')
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
