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
import { Submit, handleFields } from './form/form'
import { handleWarrantyChange } from './form/__fields/form__fields'
import handleChangeRangeUnderMinValue from './range/range'

export default class CreditasChallenge {
  static initialize () {
    this.registerEvents()
  }

  static registerEvents () {
    Submit(document.querySelector('.form'))

    handleChangeRangeUnderMinValue(
      document.getElementById('valor-garantia-range'),
      document.getElementById('valor-garantia')
    )

    handleChangeRangeUnderMinValue(
      document.getElementById('valor-emprestimo-range'),
      document.getElementById('valor-emprestimo')
    )

    handleWarrantyChange(
      document.querySelector('#garantia'),
      document.querySelector('#valor-min-emprestimo'),
      document.querySelector('#valor-max-emprestimo'),
      document.querySelector('#parcelas'),
      document.querySelector('#valor-emprestimo-range'),
    )

    handleFields(
      document.querySelector('.form'), 
      document.querySelector('#total-a-pagar'),
      document.querySelector('#valor-parcela')
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
