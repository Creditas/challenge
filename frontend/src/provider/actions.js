export const INITIAL_DATA = 'INITIAL_DATA';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const CHANGE_GUARANTEE = 'CHANGE_GUARANTEE';
export const SUBMIT = 'SUBMIT';

export const setInitalData = (dispatch, { guarantee, active }) => {
    const guaranteeActive = guarantee.filter((item) => item.type === active.guaranteeActive)[0];
    dispatch({
        type: INITIAL_DATA,
        payload: {
            ...guaranteeActive,
            months: guaranteeActive.months.map((month) => (
                { value: String(month), text: String(month) })),
            valueMonth: String(guaranteeActive.months[0]),
            valueGuarantee: guaranteeActive.min,
            minLoan: guaranteeActive.min * guaranteeActive.maxCreditPercentage,
            maxLoan: guaranteeActive.max * guaranteeActive.maxCreditPercentage,
            valueLoan: guaranteeActive.min * guaranteeActive.maxCreditPercentage,
        },
    });
};

export const setChangeGuarantee = (dispatch, { guarantee, event }) => {
    const guaranteeActive = guarantee.filter((item) => item.type === event.target.value)[0];
    dispatch({
        type: CHANGE_GUARANTEE,
        payload: {
            name: event.target.name,
            value: event.target.value,
            guarantee: {
                ...guaranteeActive,
                months: guaranteeActive.months.map((month) => (
                    { value: String(month), text: String(month) })),
                valueMonth: String(guaranteeActive.months[0]),
                valueGuarantee: guaranteeActive.min,
                minLoan: guaranteeActive.min * guaranteeActive.maxCreditPercentage,
                maxLoan: guaranteeActive.max * guaranteeActive.maxCreditPercentage,
                valueLoan: guaranteeActive.min * guaranteeActive.maxCreditPercentage,
            },
        },
    });
};

export const setChangeInputs = (dispatch, event) => {
    const input = event.target;
    let value = 0;

    if (input) {
        if (input.type === 'range') {
            value = Number(input.value);
        } else {
            value = input.value;
        }
    } else {
        value = event.value;
    }

    dispatch({
        type: CHANGE_INPUT,
        payload: {
            name: (event.target) ? event.target.name : event.name,
            value,
        },
    });
};

export const setSubmit = (dispatch, active) => {
    const ftt = active.ftt / 100;
    const interestRate = active.interestRate / 100;
    const termInMonths = active.valueMonth;
    const loanAmount = active.valueLoan;
    const totalLoanPayments = (ftt + interestRate + (termInMonths / 1000) + 1) * loanAmount;
    const monthlyPayment = totalLoanPayments / termInMonths;

    dispatch({
        type: SUBMIT,
        payload: {
            monthlyPayment: monthlyPayment.toFixed(2),
            total: totalLoanPayments.toFixed(2),
            interestRate: '111,12',
        },
    });
};
