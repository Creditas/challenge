export class DOMHandler {
    constructor() {
    }

    static getElement(selector) {
        return document.querySelector(selector);
    }

    static hideElement(element) {
        element.style.display = "none";
    }

    static createElementWithClass(element, elementClass) {
        const elementWithClass = document.createElement(element);
        elementWithClass.setAttribute('class', elementClass);
        return elementWithClass;
    }

    static activateButton(buttonElement, className) {
        const buttons = document.getElementsByClassName(className);

        for (let button of buttons) {
            button.classList.remove("active");
        }

        buttonElement.classList.add("active");
    }

    static activateContent(contentId, className) {
        const contents = document.getElementsByClassName(className);

        for (let content of contents) {
            DOMHandler.hideElement(content);
        }

        DOMHandler.getElement(`#${contentId}`).style.display = "block";
    }
}

export default DOMHandler;
