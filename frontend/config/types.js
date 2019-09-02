export default {
  default: 'Veículo',
  types: {
    'Veículo': {
      minWarrantyAmount: 3750.0, // (minLoanAmount * 100) / 80
      maxWarrantyAmount: 125000.0,  // (maxLoanAmount * 100) / 80
      minLoanAmount: 3000.0,
      maxLoanAmount: 100000.0,
      months: [24, 36, 48]
    },
    'Imóvel': {
      minWarrantyAmount: 37500.0, // (minLoanAmount * 100) / 80
      maxWarrantyAmount: 5625000.0,  // (maxLoanAmount * 100) / 80
      minLoanAmount: 30000.0,
      maxLoanAmount: 4500000.0,
      months: [120, 180, 240]
    }
  }
}
