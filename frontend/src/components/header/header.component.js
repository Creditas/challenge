import './header.component.css';

export class ChallengeHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = require("./header.component.html");
  }
}
