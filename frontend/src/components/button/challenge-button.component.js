const noop = () => {};

export const ChallengeButton = props => {
  return `
<button onclick="${props.onClick ? props.onClick : noop}" class="button">
  ${props.label}
</button>
  `;
};
