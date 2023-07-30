export const parseApiError = ({ error, form, alert }) => {
  const arr = [checkIfValidationError, checkIfBaseError];
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i]({
        error,
        form,
        alert,
      })
    ) {
      return;
    }
  }
};

const checkIfValidationError = ({ error, form, alert }) => {
  if (Array.isArray(error)) {
    error.forEach((err) => {
      setFormError({
        form,
        msg: err.message,
        callback: () => alert.error({ text: err.message }),
        field: err.namespace,
      });
    });
    return true;
  }
  return false;
};
const checkIfBaseError = ({ error, alert }) => {
  if (error && typeof error === "string") {
    alert.error({ text: error });
  } else if (error && typeof error === "object" && error.message) {
    alert.error({ text: error.message });
  }
  return true;
};

const setFormError = ({ form, msg, callback, field }) => {
  if (form && form.setFieldError) {
    form.setFieldError(field || "base", msg);
    form.setSubmitting(false);
  } else {
    callback();
  }
};

export const isApiValidationError = (res) => {
  return Array.isArray(res) && res.length > 0 && res[0].namespace !== undefined;
};
