import './creditas-main-container.component.css'
import template from './creditas-main-container.component.html'

export class CreditasMainContainer extends HTMLElement {
  /**
   * Gets the tag of the web-component.
   *
   * @readonly
   * @static
   * @memberof CreditasMainContainer
   */
  static get tag () {
    return 'creditas-main-container'
  }

  /**
   * Is invoked each time the custom element is appended into
   * a document-connected element.
   *
   * @memberof CreditasMainContainer
   */
  connectedCallback () {
    this.render()
  }

  /**
   * Renders the component.
   *
   * @memberof CreditasMainContainer
   */
  render () {
    this.innerHTML = template
  }
}
