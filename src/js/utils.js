export { on };
export { getElement };

function on(element, event, callback) {
  element.addEventListener(event, callback, true);
}

function getElement(element) {
  return document.body.querySelector(element);
}