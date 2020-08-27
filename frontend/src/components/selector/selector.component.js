export const ChallengeSelector = props => {
  setTimeout(() => {
    document
      .getElementById(props.id)
      .addEventListener("change", event => props.onChange(event.target.value));
  }, 0);

  return `
<label for="${props.id}">${props.label}</label>
<select name="${props.id}" id="${props.id}" required>
  ${props.options.map(
    option =>
      `<option ${
        option.value == props.value ? 'selected="true"' : ""
      }" value="${option.value}">${option.label}</option>`
  )}
</select>
  `;
};
