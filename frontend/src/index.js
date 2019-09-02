import './styles.css'
import { CreditasHeader } from '@components/creditas-header'
import { CreditasMainContainer } from '@components/creditas-main-container'
import { CreditasFormContainer } from '@components/creditas-form-container'
import { CreditasDropdown } from '@components/creditas-dropdown'
import { CreditasRangeInput } from '@components/creditas-range-input'
import { CreditasSimulationResult } from '@components/creditas-simulation-result'
import { CreditasFooter } from '@components/creditas-footer'

class CreditasChallenge {
  static initialize() {
    this.registerComponents()
  }

  static registerComponents() {
    window.customElements.define(CreditasHeader.tag, CreditasHeader)
    window.customElements.define(CreditasMainContainer.tag, CreditasMainContainer)
    window.customElements.define(CreditasFormContainer.tag, CreditasFormContainer)
    window.customElements.define(CreditasDropdown.tag, CreditasDropdown)
    window.customElements.define(CreditasRangeInput.tag, CreditasRangeInput)
    window.customElements.define(CreditasSimulationResult.tag, CreditasSimulationResult)
    window.customElements.define(CreditasFooter.tag, CreditasFooter)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
