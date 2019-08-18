import '../../scss/page-simulation.scss'
import { Form } from './form'
import { Helpers } from './helpers/helpers'

var MIN_WARRANTY = 3750.0
var MAX_WARRANTY = 125000.0
var MIN_LOAN = 3000.0
var MAX_LOAN = 8000.0

export default class CreditasChallenge {
  static initialize() {
    this.registerEvents()
  }

  static registerEvents() {

    Form.Submit(document.querySelector('.form'))

    Form.handleChangeRangeWarranty(
      document.getElementById('valor-garantia-range'),
      document.getElementById('valor-garantia')
    )

    Form.handleChangeLoanAmount(
      document.getElementById('valor-emprestimo-range'),
      document.getElementById('valor-emprestimo')
    )

    Form.watchChangesOnInputsAndSelects();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
