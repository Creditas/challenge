export default {
  default: 'Veículo',
  types: {
    'Veículo': {
      minLoanAmount: 3000.0,
      maxLoanAmount: 100000.0,
      months: [24, 36, 48]
    },
    'Imóvel': {
      minLoanAmount: 30000.0,
      maxLoanAmount: 4500000.0,
      months: [120, 180, 240]
    }
  }
}
