import './styles.css';
import { 
  bindSubmit,
  bindAnyFormChange,
  handleChangeRangeVehicleUnderWarranty,
  handleChangeVehicleLoanAmount,
  handleChangeWarrantyType,
  changeRangeValuesByWarranty,
  changeAvailableInstallmentValues
} from './scripts/loan-calculator'

export default class LoanCalculatorComponent {
  static initialize() {
    this.registerEvents()
  }

  static registerEvents() {
    bindSubmit(document.querySelector('.calculator__form'))

    bindAnyFormChange(document.querySelector('.calculator__form'))

    handleChangeRangeVehicleUnderWarranty(
      document.querySelector('#warranty-range-value'),
      document.querySelector('#warranty-value')
    )

    handleChangeVehicleLoanAmount(
      document.querySelector('#loan-range-value'),
      document.querySelector('#loan-value')
    )

    handleChangeWarrantyType(document.querySelector('#warranty'))
  }
}

document.addEventListener('DOMContentLoaded', function () {
  LoanCalculatorComponent.initialize()
})