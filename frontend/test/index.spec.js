import {
  handleWarranty,
  handleLoanAmount,
  handleWarrantyAmount,
  selectInstallments,
  handleRange,
  submitForm,
} from '../app/scripts/index'

import { form } from './__mocks__'

function initializeMock() {
  document.body.innerHTML = form
}

function clean() {
  document.body.innerHTML = ''
}

describe('Creditas Challenge', () => {
  beforeEach(() => {
    initializeMock()
  })

  afterEach(() => {
    clean()
  })
})
