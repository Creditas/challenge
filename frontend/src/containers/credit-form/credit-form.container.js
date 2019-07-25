import './credit-form.container.css';

import { ChallengeSelector } from '../../components/selector/selector.component';
import { checkFormIsValid, submitChallengeForm } from '../../utils/form.utils';
import { ChallengeFormResult } from '../form-result/form-result.container';
import { ChallengeInputRangeGroup } from '../input-range-group/input-range-group.container';

export class ChallengeCreditForm extends HTMLElement {
  constructor() {
    super();
    this.config = require("../../config/config.json");
    const defaultGarantia = this.config.garantia[0];
    this.state = {
      garantia: defaultGarantia,
      prazo: defaultGarantia.prazos[0],
      valorGarantia: defaultGarantia.minGarantia,
      valorEmprestimo: defaultGarantia.minEmprestimo
    };
    this.overrideFormSubmit = this.overrideFormSubmit.bind(this);
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  overrideFormSubmit() {
    const formElement = document.querySelector(".form");
    formElement.addEventListener(
      "submit",
      function(event) {
        event.preventDefault();
        if (
          checkFormIsValid({
            valorEmprestimo: this.state.valorEmprestimo,
            valorGarantia: this.state.valorGarantia,
            maxEmprestimoDoGarantia: this.config.maxEmprestimoDoGarantia
          })
        ) {
          submitChallengeForm(formElement, {
            IOF: this.config.IOF,
            taxaDeJuros: this.config.taxaDeJuros,
            prazo: this.state.prazo,
            valorEmprestimo: this.state.valorEmprestimo
          });
        } else {
          alert("Valor do Emprestimo debe ser máximo 80% do valor da garantia");
        }
      }.bind(this)
    );
  }

  render() {
    setTimeout(() => this.overrideFormSubmit(), 0);

    this.innerHTML = `
          <form class="form" name="form">
            <div class="form__fields">
              <div class="field-group">
                <div class="field">
                  ${ChallengeSelector({
                    id: "parcelas",
                    label: "Número de parcelas",
                    options: this.state.garantia.prazos.map(prazo => ({
                      label: prazo,
                      value: prazo
                    })),
                    value: this.state.prazo,
                    onChange: value => {
                      this.setState({
                        ...this.state,
                        prazo: value
                      });
                    }
                  })}
                </div>
                <div class="field">
                ${ChallengeSelector({
                  id: "garantia",
                  label: "Garantia",
                  options: this.config.garantia.map(garantia => ({
                    label: garantia.label,
                    value: garantia.id
                  })),
                  value: this.state.garantia.id,
                  onChange: value => {
                    const garantia = this.config.garantia.find(
                      garantia => garantia.id === value
                    );
                    this.setState({
                      garantia,
                      prazo: garantia.prazos[0],
                      valorGarantia: garantia.minGarantia,
                      valorEmprestimo: garantia.minEmprestimo
                    });
                  }
                })}
                </div>
              </div>
              <div class="valor-garantia">
                ${ChallengeInputRangeGroup({
                  id: "valor-garantia",
                  value: this.state.valorGarantia,
                  label: "Valor da Garantia",
                  minValue: this.state.garantia.minGarantia,
                  maxValue: this.state.garantia.maxGarantia,
                  onChange: value => {
                    this.setState({
                      ...this.state,
                      valorGarantia: value
                    });
                  }
                })}
              </div>
              <div class="emprestimo">
                ${ChallengeInputRangeGroup({
                  id: "valor-emprestimo",
                  value: this.state.valorEmprestimo,
                  label: "Valor do Empréstimo",
                  minValue: this.state.garantia.minEmprestimo,
                  maxValue: this.state.garantia.maxEmprestimo,
                  onChange: value => {
                    this.setState({
                      ...this.state,
                      valorEmprestimo: value
                    });
                  }
                })}
              </div>
            </div>
            ${ChallengeFormResult({
              IOF: this.config.IOF,
              taxaDeJuros: this.config.taxaDeJuros,
              prazo: this.state.prazo,
              valorDoEmprestimo: this.state.valorEmprestimo
            })}
          </form>
  `;
  }
}
