import { loanData as data } from './data'
import { currencyTransform } from '../utils/currency'


/*
* COMPONENT STATE FUNCTIONS
*/


export function bindToAnyFormChange(formElement) {
    formElement.addEventListener('change', function() {
        changeTotalValue(formElement)
        changeValuePerInstallment(formElement)
    })
}

export function changeTotalValue(formElement) {
    document.querySelector('#total-value').innerText = `${currencyTransform(calculateTotalPrice(formElement))}`
}

export function changeValuePerInstallment(formElement) {
    document.querySelector('.installment').innerHTML = `<span>${currencyTransform(calculateInstallmentValue(formElement))}</span>`
}


export function handleChangeWarrantyType(selectElement) {
    selectElement.addEventListener('change', function() {
        changeLoanRangeLabel(selectElement.value)
        resetRangeInputValues(selectElement.value)
        changeInstallmentOptions(selectElement.value)
    })
}

export function changeLoanRangeLabel(selectElement) {
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

export function changeInstallmentOptions(selectedWarranty) {
    document.querySelector('#installments').innerHTML = `
      ${data[selectedWarranty].installments.map(installment => `
        <option value="${installment}">${installment}</option>
      `)}`
}

export function changeWarrantyInputValue(warrantyRangeElement, warrantyInput) {
    warrantyRangeElement.addEventListener('change', function() {
        warrantyInput.value = warrantyRangeElement.value
    })
}

export function changeLoanInputValue(loanAmountRangeElement, loanAmountInput) {
    loanAmountRangeElement.addEventListener('change', function() {
        loanAmountInput.value = loanAmountRangeElement.value
    })
}


/* 
* MATH FUNCTIONS
*/


export function calculateInstallmentValue(values) {
    const formValues = getFormValues(values)
    const totalPrice = calculateTotalPrice(values)
    const TIME = formValues.find(field => field.field === 'installments').value
    const installmentValue = Math.floor(totalPrice) / TIME
    return installmentValue
}

export function calculateTotalPrice(values) {
    const formValues = getFormValues(values)
    const TIME = formValues.find(field => field.field === 'installments').value / 1000
    const LOAN_AMOUNT = formValues.find(field => field.field === 'loan-value').value
    return ((data.IOF / 100) + (data.INTEREST_RATE / 100) + TIME + 1) * LOAN_AMOUNT
}


/*
* FORM HANDLER FUNCTIONS
*/

export function getFormValues(formElement) {
    return Object.values(formElement.elements)
        .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
        .map(element => ({
            field: element.name,
            value: element.value
        }))
}

export function printResults(values) {
    const formValues = getFormValues(values)

    return `Confirmação\n${formValues
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join('\n')}`.concat(
        `\nTotal ${currencyTransform(calculateTotalPrice(values))}\nValor da parcela ${currencyTransform(calculateInstallmentValue(values))}`
    ) 
}


export function bindSend(values) {
    return new Promise((resolve, reject) => {
        try {
            resolve(printResults(values))
        } catch (error) {
            reject(error)
        }
    })
}


export function checkFormValidity(formElement) {
    formElement.checkValidity()
}


export function bindSubmit(formElement) {
    formElement.addEventListener('submit', function (event) {
        event.preventDefault()
        if (formElement.checkValidity()) {
            bindSend(formElement)
                .then(result => {
                    confirm(result, 'Your form submited success')
                })
                .catch(error => console.error('Your form submited error', error))
        }
    })
}
