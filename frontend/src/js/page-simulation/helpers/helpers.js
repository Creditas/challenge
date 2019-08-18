import { IOF, INTEREST_RATE } from './constants'

export const Helpers = {
    calculateLoanInstallment: (total, time) => {
      return total / time
    },
    calculateLoanMax: (warranty) => {
      return warranty * 0.8
    },
    calculateLoanTotal: (time, loanValue) => {
      return ((IOF + INTEREST_RATE + (time / 1000) + 1) * loanValue)
    },
    calculateWarrantyMax: (typeofLoan) => {
      return typeofLoan == "imovel" ? (4500000 / 0.8) : (100000 / 0.8)
    },
    calculateWarrantyMin: (typeofLoan) => {
      return typeofLoan == "imovel" ? (30000 / 0.8) : (3000 / 0.8)
    },
    toCurrency: (number) => {
      return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
    }
  }