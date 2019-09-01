import './creditas-footer.component.css'
import template from './creditas-footer.component.html'

export class CreditasFooter extends HTMLElement {
  static get tag () {
    return 'creditas-footer'
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = template
  }
}
