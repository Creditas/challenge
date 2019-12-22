import './variable/colors.css'
import './styles.css'
import './header/header.css'
import './header/__container/header__container.css'
import './field-group/field-group.css'
import './field/field.css'
import './range/__values/range__values.css'
import './range/__input/range__input.css'
import './form/__result/form__result.css'
import './footer/footer.css'
import './quota/quota.css'
import './quota/__container/quota__container.css'
import './button/button.css'
import Submit from './form/form'
import getFormValues from './form/__fields/form__fields'
import handleChangeRangeUnderMinValue from './range/range'

export default class CreditasChallenge {
  static initialize () {
    this.registerEvents()
  }

  static registerEvents () {
    const formElement = document.querySelector('.form')
    const fromValues = getFormValues(formElement)
    Submit(formElement, fromValues)

    handleChangeRangeUnderMinValue(
      document.getElementById('valor-garantia-range'),
      document.getElementById('valor-garantia'),
      12000.0
    )

    handleChangeRangeUnderMinValue(
      document.getElementById('valor-emprestimo-range'),
      document.getElementById('valor-emprestimo'),
      30000.0
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
