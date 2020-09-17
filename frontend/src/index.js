import './styles.css'
import { 
  bindSubmit,
  bindToAnyFormChange,
  changeWarrantyInputValue,
  changeLoanInputValue,
  handleChangeWarrantyType
} from './scripts/loan-calculator'

export default class LoanCalculatorComponent {
  static initialize() {
    this.registerEvents()
  }

  static registerEvents() {
    bindSubmit(document.querySelector('.calculator__form'))
    bindToAnyFormChange(document.querySelector('.calculator__form'))
    changeWarrantyInputValue(document.querySelector('#warranty-range-value'), document.querySelector('#warranty-value'))
    changeLoanInputValue(document.querySelector('#loan-range-value'), document.querySelector('#loan-value'))
    handleChangeWarrantyType(document.querySelector('#warranty'))
  }
}

document.addEventListener('DOMContentLoaded', function () {
  LoanCalculatorComponent.initialize()
})