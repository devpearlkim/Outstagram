export const focusInput = (ref) => {
  if (ref.current) {
    ref.current.focus();
  }
};

export const updateFormData = (prevFormData, name, value) => {
  return {
    ...prevFormData,
    [name]: value,
  };
};
