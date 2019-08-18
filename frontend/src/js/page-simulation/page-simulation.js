import '../../scss/page-simulation.scss'
import { Form } from './form'

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
