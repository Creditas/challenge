import './form-result.container.css';

import { ChallengeButton } from '../../components/button/challenge-button.component';

const formatCurrency = num => {
  return num
    .toFixed(2)
    .toString()
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const ChallengeFormResult = props => {
  const valorTotalAPagar =
    (props.IOF / 100 + props.taxaDeJuros / 100 + props.prazo / 1000 + 1) *
    props.valorDoEmprestimo;
  const valorDaParcela = valorTotalAPagar / props.prazo;
  return `
<div class="form__result">
  <div class="quota__container">
    <h4>Valor da Parcela</h4>
    <div class="quota">
      <strong>R$</strong>
      <span>${formatCurrency(valorDaParcela)}</span>
    </div>
  </div>
  <div class="amount_container">
    <h4>Total a pagar</h4>
    <p>R$ ${formatCurrency(valorTotalAPagar)}</p>
  </div>
  <div class="tax__container">
    <h4>Taxa de juros (mês)</h4>
    <p>${props.IOF}%</p>
  </div>
  ${ChallengeButton({ label: "Solicitar" })}
</div>
  `;
};
