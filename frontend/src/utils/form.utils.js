export const checkFormValidity = formElement => formElement.checkValidity();

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ["SELECT", "INPUT"].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }));

export const toStringFormValues = (values, options) => {
  const IOF = options.IOF / 100;
  const INTEREST_RATE = options.taxaDeJuros / 100;
  const TIME = options.prazo / 1000;
  const VEHICLE_LOAN_AMOUNT = options.valorEmprestimo;

  return `Confirmação\n${values
    .map(value => `Campo: ${value.field}, Valor: ${value.value}`)
    .join("\n")}`.concat(
    `\nTotal ${(IOF + INTEREST_RATE + TIME + 1) * VEHICLE_LOAN_AMOUNT}`
  );
};

export function Send(values, options) {
  return new Promise((resolve, reject) => {
    try {
      resolve(toStringFormValues(values, options));
    } catch (error) {
      reject(error);
    }
  });
}

export const submitChallengeForm = (formElement, options) => {
  if (checkFormValidity(formElement)) {
    Send(getFormValues(formElement), options)
      .then(result => confirm(result, "Your form submited success"))
      .catch(error => Alert("Your form submited error", error));
  }
};

export const checkFormIsValid = ({
  valorEmprestimo,
  valorGarantia,
  maxEmprestimoDoGarantia
}) => valorEmprestimo <= (valorGarantia * maxEmprestimoDoGarantia) / 100;
