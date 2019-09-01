import './creditas-simulation-result.component.css'
import template from './creditas-simulation-result.component.html'

export class CreditasSimulationResult extends HTMLElement {
  static get tag () {
    return 'creditas-simulation-result'
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = template
  }
}
