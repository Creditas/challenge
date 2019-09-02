import './creditas-header.component.css'
import template from './creditas-header.component.html'

export class CreditasHeader extends HTMLElement {
  /**
   * Gets the tag of the web-component.
   *
   * @readonly
   * @static
   * @memberof CreditasHeader
   */
  static get tag () {
    return 'creditas-header'
  }

  /**
   * Is invoked each time the custom element is appended into
   * a document-connected element.
   *
   * @memberof CreditasHeader
   */
  connectedCallback () {
    this.render()
  }

  /**
   * Renders the component.
   *
   * @memberof CreditasHeader
   */
  render () {
    this.innerHTML = template
  }
}
