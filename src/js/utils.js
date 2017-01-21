export { on };
export { getElement };
export { append };
export { createElement };
export { createText };
export { localStorageGet };
export { localStorageSet };

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

function localStorageGet(key) {
  const rawValue = localStorage.getItem(key);
  let parsedValue = null;

  try {
    parsedValue = JSON.parse(rawValue);
  } catch(e) {
    parsedValue = rawValue;
  }

  return parsedValue;
}

function localStorageSet(key, value) {
  let parsedValue = value;

  if (typeof value !== 'string') {
    parsedValue = JSON.stringify(value);
  }

  localStorage.setItem(key, parsedValue);
}