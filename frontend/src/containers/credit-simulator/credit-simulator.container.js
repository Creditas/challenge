import './credit-simulator.container.css';

export class ChallengeCreditSimulator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = require("./credit-simulator.container.html");
  }
}
