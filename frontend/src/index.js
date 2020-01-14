import './styles/index.scss'

import {
  clearOptions,
  addOptions,
  setRangesTags,
  mapRangeValue,
  getValueByPercentage,
  checkFormValidity,
  getFormValues
} from './helpers'
import dictonary from './dictonary'

const creditasChallenge = (() => {
  const iv = {
    IOF: 6.3,
    INTEREST_RATE: 2.34,
    BORROW_PERCENTAGE: 80
  }

  const st = {
    form: 'form',
    warrantyRange: 'valor-garantia-range',
    warrantyTextF: 'valor-garantia',
    loanRange: 'valor-emprestimo-range',
    loanTextF: 'valor-emprestimo',
    warrantyType: 'garantia',
    terms: 'parcelas',
    tagWarrantyRange: 'tag-garantia-range',
    tagLoanRange: 'tag-emprestimo-range',
    resultQuota: 'result-quota',
    resultAmount: 'result-amount-month',
    resultTax: 'result-tax'
  }

  const dom = {}

  const catchDom = () => {
    dom.form = document.getElementsByClassName(st.form)[0]
    dom.warrantyRange = document.getElementById(st.warrantyRange)
    dom.warrantyTextF = document.getElementById(st.warrantyTextF)
    dom.loanRange = document.getElementById(st.loanRange)
    dom.loanTextF = document.getElementById(st.loanTextF)
    dom.warrantyType = document.getElementById(st.warrantyType)
    dom.terms = document.getElementById(st.terms)
    dom.resultQuota = document.getElementById(st.resultQuota)
    dom.resultAmount = document.getElementById(st.resultAmount)
    dom.resultTax = document.getElementById(st.resultTax)
  }

  const suscribeEvents = () => {
    dom.form.addEventListener('submit', events.handleSubmit)
    dom.warrantyRange.addEventListener('change', events.handleChangeWarrantyRange)
    dom.loanRange.addEventListener('change', events.handleChangeLoanRange)
    dom.warrantyType.addEventListener('change', events.handleChangeWarrantyType)
    dom.terms.addEventListener('change', events.handleChangeTerm)
  }

  const events = {
    handleSubmit: (event) => {
      event.preventDefault()
      if (checkFormValidity(dom.form)) {
        functions.send(getFormValues(dom.form))
          .then(result => window.confirm(result, 'Your form submited success'))
          .catch(error => window.alert('Your form submited error', error))
      }
    },
    handleChangeWarrantyRange: (event) => {
      dom.warrantyTextF.value = mapRangeValue(event.target.value, iv.maxWarranty, iv.minWarranty)
      functions.calculateResult()
    },
    handleChangeLoanRange: (event) => {
      dom.loanTextF.value = mapRangeValue(event.target.value, iv.maxLoan, iv.minLoan)
      functions.calculateResult()
    },
    handleChangeWarrantyType: (event) => {
      const warrantyType = event.target.value
      functions.setBaseValues(warrantyType)
      functions.calculateResult()
    },
    handleChangeTerm: (event) => {
      iv.term = event.target.value
      functions.calculateResult()
    }
  }

  const functions = {
    toStringFormValues: values => (
      `Confirmação\n${values
        .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
        .join('\n')}`.concat(`\nTotal ${iv.totalLoanPayments}`)
    ),
    send: values => (
      new Promise((resolve, reject) => {
        try {
          resolve(functions.toStringFormValues(values))
        } catch (error) {
          reject(error)
        }
      })
    ),
    showBaseValues: () => {
      clearOptions(dom.terms)
      addOptions(dom.terms, iv.terms)

      dom.loanRange.value = 0
      setRangesTags(st.tagLoanRange, iv.minLoan, iv.maxLoan)
      dom.warrantyRange.value = 0
      setRangesTags(st.tagWarrantyRange, iv.minWarranty, iv.maxWarranty)

      dom.loanTextF.value = iv.minLoan
      dom.warrantyTextF.value = iv.minWarranty
    },
    setBaseValues: (warrantyType) => {
      iv.minLoan = dictonary[warrantyType].minLoan
      iv.maxLoan = dictonary[warrantyType].maxLoan
      iv.minWarranty = getValueByPercentage(iv.BORROW_PERCENTAGE / 100, iv.minLoan, 1)
      iv.maxWarranty = getValueByPercentage(iv.BORROW_PERCENTAGE / 100, iv.maxLoan, 1)
      iv.terms = dictonary[warrantyType].terms
      iv.term = dictonary[warrantyType].terms[0]
      functions.showBaseValues()
    },
    showResult: () => {
      dom.resultQuota.innerHTML = iv.monthlyPayment.toLocaleString('pt-br')
      dom.resultAmount.innerHTML = `R$ ${iv.totalLoanPayments.toLocaleString('pt-br')}`
      dom.resultTax.innerHTML = `${(iv.taxMonth * 100).toLocaleString('pt-br')}%`
    },
    calculateResult: () => {
      const time = iv.term / 1000
      const taxMonth = (iv.IOF / 100 + iv.INTEREST_RATE / 100 + time + 1)
      const totalLoanPayments = taxMonth * dom.loanTextF.value
      const monthlyPayment = totalLoanPayments / time
      iv.taxMonth = taxMonth
      iv.totalLoanPayments = totalLoanPayments
      iv.monthlyPayment = monthlyPayment
      functions.showResult()
    }
  }

  const initValues = () => {
    const firstSelect = Object.keys(dictonary)[0]
    dom.warrantyType.value = firstSelect
    functions.setBaseValues(firstSelect)
    functions.calculateResult()
  }

  const initialize = () => {
    catchDom()
    suscribeEvents()
    initValues()
  }

  return {
    init: initialize
  }
})()

creditasChallenge.init()
