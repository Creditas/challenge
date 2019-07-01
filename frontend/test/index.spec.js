import {
  handleWarranty,
  submitForm,
} from '../app/scripts/index'

import { form } from './__mocks__'

function initializeAppMock() {
  document.body.innerHTML = form
}

function clean() {
  document.body.innerHTML = ''
}

describe('Creditas Challenge', () => {
  beforeEach(() => {
    initializeAppMock()
  })

  afterEach(() => {
    clean()
  })
})
