import { Helpers } from './helpers'
import { Form } from '../form'

export const FormValidator = {
    validateField: function (id, rules) {
        var min = 3750.0
        var max = 125000.0
        var element = document.querySelector(id)

        let errors = []

        let error = "";

        rules.forEach(rule => {
            if (eval(rule.rule)) {
                errors.push(rule.errormessage)
            }
            else {
                if(errors.includes(rule.rule)) {
                    errors.filter(el => el !== rule.rule)
                }
            }
        })

        if (errors.length == 0) {

            if (element.closest(`div`).querySelector(`.errormessage`)) {
                element.closest(`div`).querySelector(`.errormessage`).remove();
                element.classList.remove("error");
                element.classList.remove("errorinput");
            }

            return true;
        }
        else if (errors.length > 0 && !element.closest(`div`).querySelector(`.errormessage`)) {
            let errorfield = document.createElement("p");
            errorfield.classList.add("errormessage");
            errorfield.innerHTML = errors[errors.length -1];
            element.closest("div").appendChild(errorfield);
            element.classList.add("error");
            element.classList.add("errorinput");
            return false;
        }
        else if (errors.length > 0) {
            element.closest(`div`).querySelector(`.errormessage`).innerHTML = errors[errors.length - 1];
        }
    }
}