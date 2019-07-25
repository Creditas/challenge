import './range.component.css';

const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const ChallengeRange = props => {
  setTimeout(() => {
    document
      .getElementById(props.id)
      .addEventListener("change", props.onChange);
  }, 0);

  return `
<div class="range">
  <input
    type="range"
    name="${props.id}"
    id="${props.id}"
    min="0"
    max="100"
    value="${props.value}"
    step="10"
  />
  <div class="range__values">
    <span>${formatNumber(props.min)}</span>
    <span>${formatNumber(props.max)}</span>
  </div>
</div>
  `;
};
