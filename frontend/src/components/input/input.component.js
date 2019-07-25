export const ChallengeInput = props => {
  setTimeout(() => {
    document.getElementById(props.id).addEventListener("blur", props.onChange);
  }, 0);

  return `
  <label for="${props.id}">${props.text}</label>
  <input
    type="text"
    required
    name="${props.id}"
    id="${props.id}"
    value="${props.value}"
  />
  `;
};
