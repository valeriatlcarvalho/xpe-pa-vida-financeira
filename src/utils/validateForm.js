export function getErrors(formValues, fields) {
  let errors = {};
  for (const input in formValues) {
    if (fields.includes(input)) {
      if (!formValues[input] || formValues[input] === 0) {
        errors[input] = true;
      } else {
        errors[input] = false;
      }
    }
  }
  return errors;
}

export function formIsValid(formErrors) {
  for (const err in formErrors) {
    if (formErrors[err]) return false;
  }

  return true;
}

export function getFormValues(event) {
  const dataForm = new FormData(event.target);
  return [...dataForm.entries()];
}
