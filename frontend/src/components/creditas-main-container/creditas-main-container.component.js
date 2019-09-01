import './creditas-main-container.component.css'
import template from './creditas-main-container.component.html'

export class CreditasMainContainer extends HTMLElement {
  static get tag () {
    return 'creditas-main-container'
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = template
  }
}
