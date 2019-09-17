const rules = {
  taxes: {
    iof: 6.38,
    interestRate: 2.34,
    maxValueToLoan: 80
  },
  vehicle: {
    loan: {
      minValue: 3000,
      maxValue: 100000
    },
    warranty: {
      minValue: 12000,
      maxValue: 24000
    },
    parcels: [24, 36, 48]
  },
  property: {
    loan: {
      minValue: 30000,
      maxValue: 4500000
    },
    warranty: {
      minValue: 150000,
      maxValue: 1000000
    },
    parcels: [120, 180, 240]
  }
}

export default rules
