import { ChallengeHeader } from './components/header/header.component';
import { ChallengeCreditForm } from './containers/credit-form/credit-form.container';
import { ChallengeCreditSimulator } from './containers/credit-simulator/credit-simulator.container';

export class CreditasChallenge {
  static initialize() {
    this.registerComponents();
  }

  static registerComponents() {
    window.customElements.define("challenge-header", ChallengeHeader);
    window.customElements.define(
      "challenge-credit-simulator",
      ChallengeCreditSimulator
    );
    window.customElements.define("challenge-credit-form", ChallengeCreditForm);
  }
}
