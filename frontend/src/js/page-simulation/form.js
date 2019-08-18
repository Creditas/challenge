import { Helpers } from './helpers/helpers'
import CreditasChallenge from './page-simulation'

var MIN_WARRANTY = 3750.0
var MAX_WARRANTY = 125000.0
var MIN_LOAN = 3000.0
var MAX_LOAN = 8000.0

export const Form = {
    checkFormValidity: formElement => formElement.checkValidity(),
    getFormValues: formElement => {
        return Object.values(formElement.elements)
            .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
            .map(element => ({
                field: element.name,
                value: element.value
            }))
    },
    toStringFormValues: values => {
        const match = matchString => value => value.field === matchString
        const TIME = values.find(match('parcelas')).value
        const VEHICLE_LOAN_AMOUNT = values.find(match('valor-emprestimo')).value

        return `Confirmação\n${values
            .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
            .join('\n')}`.concat(
                `\nTotal ${Helpers.calculateLoanTotal(TIME, VEHICLE_LOAN_AMOUNT)}`
            )
    },
    Send: function (values) {
        return new Promise((resolve, reject) => {
            try {
                resolve(Form.toStringFormValues(values))
            } catch (error) {
                reject(error)
            }
        })
    },
    Submit: function (formElement) {
        formElement.addEventListener('submit', function (event) {
            event.preventDefault()
            if (Form.checkFormValidity(formElement)) {
                Form.Send(Form.getFormValues(formElement))
                    .then(result => confirm(result, 'Your form submited success'))
                    .catch(error => alert('Your form submited error', error))
            }
        })
    },
    watchChangesOnInputsAndSelects: () => {
        document.querySelectorAll("input").forEach(el => {
            el.addEventListener("change", e => {
                Form.updateValues(e, Form.updateResults)
            })
        })
        document.querySelectorAll("select").forEach(el => {
            el.addEventListener("change", e => {
                Form.updateValues(e, Form.updateResults)
            })
        })
    },
    handleChangeRangeWarranty: function (
        warrantyRangeElement,
        WarrantyElement
    ) {
        warrantyRangeElement.addEventListener('change', function (event) {
            Form.updateWarrantyValue(WarrantyElement, event.target)
        })
    },
    handleChangeLoanAmount: function (
        loanAmountRangeElement,
        loanAmountElement
    ) {
        loanAmountRangeElement.addEventListener('change', function (event) {
            Form.updateLoanValue(loanAmountElement, event.target)
        })
    },
    updateLoanValue: (loan_el, loan_range_el) => {
        loan_el.value =
            Number(loan_range_el.value) == 0 ? Number(MIN_LOAN) : ((Number(MAX_LOAN) / 100) * Number(loan_range_el.value))
    },
    updateWarrantyValue: (wrt_el, wrt_range_el) => {
        wrt_el.value = Number(wrt_range_el.value) == 0 ? Number(MIN_WARRANTY) : ((Number(MAX_WARRANTY) / 100) * Number(wrt_range_el.value))
    },
    updateWarrantyRange: () => {
        let warranty = document.querySelector("#valor-garantia")
        let warranty_rg = document.querySelector("#valor-garantia-range")

        if (warranty.value <= MIN_WARRANTY) {
            warranty.value = MIN_WARRANTY
            warranty_rg.value = 0

        }
        else if (warranty.value < MAX_WARRANTY) {
            warranty_rg.value = (Number(warranty.value) / (Number(MAX_WARRANTY) / 100))
        }
        else if (warranty.value > MAX_WARRANTY) {
            warranty.value = MAX_WARRANTY
            warranty_rg.value = 100
        }
    },
    updateLoanRange: () => {
        let loan = document.querySelector("#valor-emprestimo")
        let loan_rg = document.querySelector("#valor-emprestimo-range")

        if (loan.value <= MIN_LOAN) {
            loan.value = MIN_LOAN
            loan_rg.value = 0

        }
        else if (loan.value < MAX_LOAN) {
            loan_rg.value = (Number(loan.value) / (Number(MAX_LOAN) / 100))
        }
        else if (loan.value > MAX_LOAN) {
            loan.value = MAX_LOAN
            loan_rg.value = 100
        }
    },
    updateValues: (e, cb) => {
        let typeofLoan = document.querySelector("#garantia").value

        MIN_WARRANTY = Helpers.calculateWarrantyMin(typeofLoan)
        if (e.target.id == "garantia") {
            Form.updateWarrantyRange()

            if (typeofLoan == "veiculo") {
                document.querySelector("#parcelas").innerHTML = `
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
        `
            }

            else if (typeofLoan == "imovel") {
                document.querySelector("#parcelas").innerHTML = `
        <option value="120">120</option>
        <option value="180">180</option>
        <option value="240">240</option>
        `
            }
        }


        let warranty = document.querySelector("#valor-garantia").value
        MAX_LOAN = Helpers.calculateLoanMax(warranty)

        if (typeofLoan == "veiculo") {

            document.querySelector("#valor-emprestimo").setAttribute("min", 3000)
            document.querySelector("#valor-emprestimo").setAttribute("max", MAX_LOAN)

            document.querySelector(".form__fields__group__field__range__values__span__loan-value--min").innerHTML = "R$ 3.000,00"
            document.querySelector(".form__fields__group__field__range__values__span__loan-value--max").innerHTML = (MAX_LOAN < 100000) ? Helpers.toCurrency(MAX_LOAN) : "R$ 100.000,00"

            MIN_LOAN = 3000
            MAX_WARRANTY = 125000
        }
        else if (typeofLoan == "imovel") {

            document.querySelector("#valor-emprestimo").setAttribute("min", 30000)
            document.querySelector("#valor-emprestimo").setAttribute("max", MAX_LOAN)

            document.querySelector(".form__fields__group__field__range__values__span__loan-value--min").innerHTML = "R$ 30.000,00"
            document.querySelector(".form__fields__group__field__range__values__span__loan-value--max").innerHTML = (MAX_LOAN < 4500000) ? Helpers.toCurrency(MAX_LOAN) : "R$ 4.500.000,00"

            MIN_LOAN = 30000
            MAX_WARRANTY = 5625000
        }

        document.querySelector(".form__fields__group__field__range__values__span__warranty--min").innerHTML = Helpers.toCurrency(Helpers.calculateWarrantyMin(typeofLoan))

        document.querySelector(".form__fields__group__field__range__values__span__warranty--max").innerHTML = Helpers.toCurrency(Helpers.calculateWarrantyMax(typeofLoan))

        MIN_WARRANTY = Helpers.calculateWarrantyMin(typeofLoan)

        Form.updateWarrantyValue(
            document.getElementById('valor-garantia-range'),
            document.getElementById('valor-garantia')
        )

        Form.updateLoanValue(
            document.getElementById('valor-emprestimo-range'),
            document.getElementById('valor-emprestimo')
        )

        Form.updateLoanRange()
        cb()
    },
    updateResults: () => {
        let time = document.querySelector("#parcelas").value
        let loanValue = document.querySelector("#valor-emprestimo").value
        let loanTotal = Helpers.toCurrency(Helpers.calculateLoanTotal(time, loanValue))
        let loanInstallments = Helpers.calculateLoanInstallment(Helpers.calculateLoanTotal(time, loanValue), time).toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

        document.querySelector(".form__result__amount__total").innerHTML = loanTotal
        document.querySelector(".form__result__quota__value__number").innerHTML = loanInstallments
    }
}