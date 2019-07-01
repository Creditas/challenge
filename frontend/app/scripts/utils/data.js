export const elements = {
  form: document.querySelector('.form'),
  installments: document.getElementById('installments'),
  warning: document.querySelector('.warning'),
  warranty: {
    element: document.getElementById('warranty'),
    input: document.getElementById('warranty-amount'),
    range: {
      element: document.getElementById('warranty-amount-range'),
      min: document.getElementById('warranty-amount__range--min'),
      max: document.getElementById('warranty-amount__range--max'),
    },
  },
  loan: {
    input: document.getElementById('loan-amount'),
    range: {
      element: document.getElementById('loan-amount-range'),
      min: document.getElementById('loan-amount__range--min'),
      max: document.getElementById('loan-amount__range--max'),
    },
  },
  summary: {
    total: document.querySelector('.summary__total p'),
    quota: document.querySelector('.quota span'),
    button: document.querySelector('.button'),
  },
}
