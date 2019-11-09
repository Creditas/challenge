export default {
    guarantee: [
        {
            type: 'IMOVEL',
            months: [120, 180, 240],
            min: 37500,
            max: 5625000,
            ftt: 6.38,
            interestRate: 2.34,
            maxCreditPercentage: 0.8,
        },
        {
            type: 'VEICULO',
            months: [24, 36, 48],
            min: 3750,
            max: 125000,
            ftt: 6.38,
            interestRate: 2.34,
            maxCreditPercentage: 0.8,
        }
    ],
    result: {
        monthlyPayment: '',
        total: '',
        interestRate: '',
    },
    active: {
        guaranteeActive: 'VEICULO',
        valueGuarantee: 0,
        valueLoan: 0,
    },
};
