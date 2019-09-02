export default {
  default: 'Veículo',
  maxLoanRate: 0.8,
  types: {
    'Veículo': {
      minWarrantyAmount: 3750.0, // (minLoanAmount * 100) / 80
      maxWarrantyAmount: 125000.0,  // (maxLoanAmount * 100) / 80
      minLoanAmount: 3000.0,
      // We don't need maxLoanAmount, since it's calculated
      // on the fly based on maxLoanRate.
      months: [24, 36, 48]
    },
    'Imóvel': {
      minWarrantyAmount: 37500.0, // (minLoanAmount * 100) / 80
      maxWarrantyAmount: 5625000.0,  // (maxLoanAmount * 100) / 80
      minLoanAmount: 30000.0,
      // We don't need maxLoanAmount, since it's calculated
      // on the fly based on maxLoanRate.
      months: [120, 180, 240]
    }
  }
}
