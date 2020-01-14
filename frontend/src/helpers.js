// Only for logic
export const getValueByPercentage = (ptg1, value1, ptg2) => ((ptg2 * value1) / ptg1)

export const mapRangeValue = (rangeValue, max, min) => {
  const diff = max - min
  return ((Number(diff) * Number(rangeValue)) / 100 + Number(min))
}

export const checkFormValidity = formElement => formElement.checkValidity()

// Helpers which change DOM
export const clearOptions = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

export const addOptions = (node, options) => {
  options.forEach((option) => {
    const domOpt = document.createElement('option')
    domOpt.appendChild(document.createTextNode(option))
    domOpt.value = option
    node.appendChild(domOpt)
  })
}

export const setRangesTags = (id, min, max) => {
  const parent = document.getElementById(id)
  parent.children[0].innerHTML = min.toLocaleString('pt-br')
  parent.children[1].innerHTML = max.toLocaleString('pt-br')
}

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))
