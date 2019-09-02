import { toCurrency, calculateTotalToPay, calculateMonthlyFee } from './calculate-loan'

describe('calculate-loan utility', () => {
  it('should format number using pt-br style', () => {
    expect(toCurrency(6.123123)).toBe('6,12')
  })

  it('should calculate total amount to pay based on IOF and INTEREST_RATE', () => {
    expect(calculateTotalToPay(2000, 10)).toBe(2021.744)
  })

  it('should calculate monthly fee', () => {
    expect(calculateMonthlyFee(2000, 10)).toBe(200)
  })
})
