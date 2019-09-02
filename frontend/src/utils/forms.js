export const getFormValues = (formElement) =>
  Object.values(formElement.elements)
    .filter(element => element.nodeName === 'SELECT' || (element.nodeName === 'INPUT' && element.type === 'text'))
    .map(element => ({
      field: element.name,
      value: element.value
    }))
