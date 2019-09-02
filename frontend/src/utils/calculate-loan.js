import { IOF, INTEREST_RATE } from '@/src/config/constants'

export const toCurrency = (n) => {
  return n.toLocaleString('pt-br', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export const calculateTotalToPay = (loanAmount, months) => {
  return ((IOF / 100) + (INTEREST_RATE / 100) + (months / 1000) + 1) * loanAmount
}

export const calculateMonthlyFee = (totalLoanPayments, months) => {
  return totalLoanPayments / months
}
