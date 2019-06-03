const elements = {
  form: document.querySelector('.form'),
  installment: document.getElementById('parcelas'),
  warranty: {
    element: document.getElementById('garantia'),
    input: document.getElementById('valor-garantia'),
    range: {
      element: document.getElementById('valor-garantia-range'),
      min_label: document.getElementById('min-garantia-label'),
      max_label: document.getElementById('max-garantia-label')
    }
  },
  loan: {
    input: document.getElementById('valor-emprestimo'),
    range: {
      element: document.getElementById('valor-emprestimo-range'),
      min_label: document.getElementById('min-emprestimo-label'),
      max_label: document.getElementById('max-emprestimo-label')
    }
  },
  default: {
    installments: document.getElementById('valor-parcela'),
    total: document.getElementById('valor-total'),
    tax: document.getElementById('valor-juros')
  }
}

const warrantyOptions = {
  vehicle: {
    min_loan: 3000,
    max_loan: 100000,
    installments: {
      '24': 24,
      '36': 36,
      '48': 48
    }
  },
  home: {
    min_loan: 30000,
    max_loan: 4500000,
    installments: {
      '120': 120,
      '180': 180,
      '240': 240
    }
  }
}

const defaultValues = {
  TAX: 2.34,
  IOF: 6.38,
  LOAN: 0.8
}

export default {
  elements,
  warrantyOptions,
  defaultValues
}
