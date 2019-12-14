import { loanData as data } from './data'
import { currencyTransform } from '../utils/currency'


/*
* COMPONENT STATE FUNCTIONS
*/

export function changeLoanRangeValues(selectElement) {
    document.querySelector('#loan-range-value').min = `${data[selectElement].minLoanValue}`
    document.querySelector('#loan-range-value').max = `${data[selectElement].maxLoanValue}`
    document.querySelector('#loan-range-label').innerHTML = `
        <span class="range__label">${data[selectElement].minLoanValue}</span>
        <span class="range__label">${data[selectElement].maxLoanValue}</span>
    `
}

export function resetRangeInputValues(selectElement) {
    document.querySelector('#loan-value').value = data[selectElement].minLoanValue;
    document.querySelector('#loan-range-value').value = data[selectElement].minLoanValue;
}

export function changeAvailableInstallmentValues(selectedWarranty) {
    document.querySelector('#installments').innerHTML = `
      ${data[selectedWarranty].installments.map(installment => `
        <option value="${installment}">${installment}</option>
      `)}`
}

export function handleChangeWarrantyType(selectElement) {
    selectElement.addEventListener('change', function (event) {
        event.preventDefault()
        changeLoanRangeValues(selectElement.value)
        resetRangeInputValues(selectElement.value)
        changeAvailableInstallmentValues(selectElement.value)
    })
}

export function handleChangeRangeVehicleUnderWarranty(warrantyRangeElement, warrantyInput) {
    warrantyRangeElement.addEventListener('change', function () {
        warrantyInput.value = warrantyRangeElement.value
    })
}

export function handleChangeVehicleLoanAmount(loanAmountRangeElement, loanAmountInput) {
    loanAmountRangeElement.addEventListener('change', function () {
        loanAmountInput.value = loanAmountRangeElement.value
    })
}

export function bindAnyFormChange(formElement) {
    formElement.addEventListener('change', getAllFormValues(formElement))
    calculateTotalPrice(formElement)
}

export function getAllFormValues(formElement) {
    console.log(Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
        field: element.name,
        value: element.value
    })))
    return Object.values(formElement.elements)
        .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
        .map(element => ({
            field: element.name,
            value: element.value})
        )
}

export function calculateTotalPrice() {
    const match = matchString => value => value.field === matchString
    const TIME = values.find(match('installments')).value / 1000
    const LOAN_AMOUNT = values.find(match('loan-value')).value
    console.log((data.IOF + data.INTEREST_RATE + TIME + 1) * LOAN_AMOUNT)
}

// export function calculateInstallmentPrice() {

// }

/*
* FORM HANDLER FUNCTIONS
*/

export function checkFormValidity(formElement) {
    formElement.checkValidity()
}

export function bindSubmit(formElement) {
    formElement.addEventListener('submit', sendValidForm(event, formElement))
}

export function sendValidForm(event, formElement) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
        bindSend(getFormValues(formElement))
            .then(result => confirm(result, 'Your form submited success'))
            .catch(error => Alert('Your form submited error', error))
    }
}

export function getFormValues(formElement) {
    Object.values(formElement.elements)
        .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
        .map(element => ({
            field: element.name,
            value: element.value
        }))
}

export function toStringFormValues(values) {
    console.log(values)
    const match = matchString => value => value.field === matchString
    const TIME = values.find(match('installments')).value / 1000
    const LOAN_AMOUNT = values.find(match('loan-value')).value

    return `Confirmação\n${values
        .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
        .join('\n')}`.concat(
            `\nTotal ${(data.IOF + data.INTEREST_RATE + TIME + 1) * LOAN_AMOUNT}`
        )
}


export function bindSend(values) {
    return new Promise((resolve, reject) => {
        try {
            resolve(toStringFormValues(values))
        } catch (error) {
            reject(error)
        }
    })
}
