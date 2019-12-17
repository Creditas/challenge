import './styles/main.css'

export const checkFormValidity = formElement => formElement.checkValidity()

export function Submit(formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    return alert('Solicitação enviada com sucesso!')
  })
}

function calculateResult() {
  const IOF = (6.38 / 100)
  const interestRate = (2.34 / 100)
  const quota = document.getElementById('parcelas').value
  const loanAmount = document.getElementById('valor-emprestimo').value
  const time = (quota / 1000)
  const total = (IOF + interestRate + time + 1) * loanAmount
  const totalQuota = total / quota

  document.getElementById('quota').innerHTML = totalQuota.toFixed(2)
  document.getElementById('amount').innerHTML = 'R$ ' + total.toFixed(2)
}

function handleChangeRangeUnderWarranty() {
  const warrantyRangeElement = document.getElementById('valor-garantia-range')
  const warrantyElement = document.getElementById('valor-garantia')
  const warrantyType = document.getElementById('garantia')
  const minWarrantyTitle = document.getElementById('min-garantia')
  const maxWarrantyTitle = document.getElementById('max-garantia')
  const quota = document.getElementById('parcelas')

  warrantyRangeElement.min = 12000.0
  warrantyRangeElement.max = 24000.0
  minWarrantyTitle.innerHTML = 'R$ 12.000'
  maxWarrantyTitle.innerHTML = 'R$ 24.000'

  warrantyType.addEventListener('change', function (event) {
    if(warrantyType.value == 'veiculo') {
      warrantyRangeElement.min = 12000.0
      warrantyRangeElement.max = 24000.0
      minWarrantyTitle.innerHTML = 'R$ 12.000'
      maxWarrantyTitle.innerHTML = 'R$ 24.000'
      warrantyElement.value = 12000

      quota[0].value = 24
      quota[0].innerHTML = 24
      quota[1].value = 36
      quota[1].innerHTML = 36
      quota[2].value = 48
      quota[2].innerHTML = 48
    }

    if(warrantyType.value == 'imovel') {
      warrantyRangeElement.min = 150000.0
      warrantyRangeElement.max = 8500000.0
      minWarrantyTitle.innerHTML = 'R$ 150.000'
      maxWarrantyTitle.innerHTML = 'R$ 8.500.000'
      warrantyElement.value = 150000

      quota[0].value = 120
      quota[0].innerHTML = 120
      quota[1].value = 180
      quota[1].innerHTML = 180
      quota[2].value = 240
      quota[2].innerHTML = 240
    }
  })

  warrantyRangeElement.addEventListener('change', function (event) {
    warrantyElement.value = warrantyRangeElement.value
  })

  warrantyElement.addEventListener('input', function (event) {
    warrantyRangeElement.value = warrantyElement.value
  })

  quota.addEventListener('change', function (event) {
    calculateResult()
  })
}

function handleChangeLoanAmount() {
  const loanAmountRangeElement = document.getElementById('valor-emprestimo-range')
  const loanAmountElement = document.getElementById('valor-emprestimo')
  const warrantyType = document.getElementById('garantia')
  const minLoanAmountTitle = document.getElementById('min-emprestimo')
  const maxLoanAmountTitle = document.getElementById('max-emprestimo')

  minLoanAmountTitle.innerHTML = 'R$ 3.000'
  maxLoanAmountTitle.innerHTML = 'R$ 100.000'
  loanAmountRangeElement.min = 3000.0
  loanAmountRangeElement.max = 100000.0

  warrantyType.addEventListener('change', function (event) {
    console.log(warrantyType.value)
    if(warrantyType.value == 'veiculo') {
      loanAmountRangeElement.min = 3000.0
      loanAmountRangeElement.max = 100000.0
      minLoanAmountTitle.innerHTML = 'R$ 3.000'
      maxLoanAmountTitle.innerHTML = 'R$ 100.000'
      loanAmountElement.value = 3000
    }

    if(warrantyType.value == 'imovel') {
      loanAmountRangeElement.min = 30000.0
      loanAmountRangeElement.max = 4500000.0
      minLoanAmountTitle.innerHTML = 'R$ 30.000'
      maxLoanAmountTitle.innerHTML = 'R$ 4.500.000'
      loanAmountElement.value = 30000
    }
  })

  loanAmountRangeElement.addEventListener('change', function (event) {
    loanAmountElement.value = loanAmountRangeElement.value
    calculateResult()
  })

  loanAmountElement.addEventListener('input', function (event) {
    loanAmountRangeElement.value = loanAmountElement.value
    calculateResult()
  })
}


export default class CreditasChallenge {
  static initialize() {
    this.registerEvents()
  }

  static registerEvents() {
    Submit(document.querySelector('.form'))

    handleChangeRangeUnderWarranty()
    handleChangeLoanAmount()

    calculateResult()
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})