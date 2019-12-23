import './range.css'

function handleChangeRangeUnderMinValue (
  rangeElement,
  inputElement
) {
  rangeElement.addEventListener('change', function (event) {
    inputElement.value = event.target.value
  })
}

export default handleChangeRangeUnderMinValue
