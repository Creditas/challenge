export const numberWithCommas = (num) => {
    const number = num || 0;
    return number
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const checkFormValidity = (state) => {
    const { valueGuarantee, maxCreditPercentage, valueLoan } = state;
    const percent = valueGuarantee * maxCreditPercentage;
    const validate = {
        isValid: valueLoan <= percent,
        error: valueLoan <= percent
            ? null
            : {
                msg: `You cannot request a loan with a value greater than your guarantee,
        the maximum you can request with this guarantee is ${numberWithCommas(percent)}`,
                value: percent,
            },
    };
    return validate;
};
