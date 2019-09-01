import './creditas-header.component.css'
import template from './creditas-header.component.html'

export class CreditasHeader extends HTMLElement {
  static get tag () {
    return 'creditas-header'
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = template
  }
}
