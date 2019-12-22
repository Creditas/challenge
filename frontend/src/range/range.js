import './range.css'

function handleChangeRangeUnderMinValue (
  rangeElement,
  inputElement,
  minValue
) {
  rangeElement.addEventListener('change', function (event) {
    inputElement.value =
      (Number(minValue) * Number(event.target.value)) / 100 + Number(minValue)
  })
}

export default handleChangeRangeUnderMinValue
