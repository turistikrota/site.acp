import { openLoginWithRedirect } from "@/utils/auth";

export const checkUnauthorized = (error, lang) => {
  if (error && error.response && error.response.status === 401) {
    openLoginWithRedirect(lang);
    return true;
  }
  return false;
};

export const checkForbidden = (error) => {
  if (error && error.response && error.response.status === 403) {
    return true;
  }
  return false;
};
