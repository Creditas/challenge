export { on };
export { getElement };
export { append };
export { createElement };
export { createText };

function on(element, event, callback) {
  element.addEventListener(event, callback, true);
}

function getElement(element) {
  return document.body.querySelector(element);
}

function append(container, element) {
  let containerElement = container;

  if (!(container instanceof HTMLElement)) {
    containerElement = getElement(container)
  }

  containerElement.appendChild(element); 
}

function createElement(tagName) {
  return document.createElement(tagName);
}

function createText(text) {
  return document.createTextNode(text);
}