// import { CreditasFormContainer } from './creditas-form-container.component'
// import loanTypesConfig from '@/src/config/types'
// import { TestUtils } from '@test/utils'

// describe('CreditasFormContainer component', () => {
//   let el

//   beforeAll(() => {
//     window.customElements.define(CreditasFormContainer.tag, CreditasFormContainer)
//   })

//   beforeEach(async () => {
//     el = await TestUtils.render(CreditasFormContainer.tag)
//   })

//   afterEach(() => {
//     el.removeEventListeners()
//   })

//   it('should update months select when loan type is updated', async () => {
//     spyOn(el, 'updateInitialRangeValues')

//     el.dispatchEvent(new CustomEvent('creditas-dropdown:changed', {
//       bubbles: true,
//       detail: {
//         label: 'garantia',
//         value: 'Imóvel'
//       }
//     }))

//     expect(el.selectedLoanType).toBe('Imóvel')
//     // expect(el.selectedLoanMonths).toBe(120)
//     // expect(el.updateInitialRangeValues).toHaveBeenCalled()
//   })
// })
