import './creditas-footer.component.css'
import template from './creditas-footer.component.html'

export class CreditasFooter extends HTMLElement {
  /**
   * Gets the tag of the web-component.
   *
   * @readonly
   * @static
   * @memberof CreditasFooter
   */
  static get tag () {
    return 'creditas-footer'
  }

  /**
   * Is invoked each time the custom element is appended into
   * a document-connected element.
   *
   * @memberof CreditasFooter
   */
  connectedCallback () {
    this.render()
  }

  /**
   * Renders the component.
   *
   * @memberof CreditasFooter
   */
  render () {
    this.innerHTML = template
  }
}
