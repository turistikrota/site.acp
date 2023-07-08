import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const useAuthSchema = () => {
  const { t } = useTranslation("validation");
  return {
    login: Yup.object({
      email: Yup.string().required(t("required.email")),
      password: Yup.string().required(t("required.password")),
    }),
  };
};
