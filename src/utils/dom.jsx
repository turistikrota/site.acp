export const changeBodyAttribute = (attribute, value) => {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
};
