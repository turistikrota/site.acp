import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const checkQuestion = async ({
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  cancelButtonExists,
}) => {
  const { value: result } = await MySwal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: cancelButtonExists,
    confirmButtonText,
    cancelButtonText,
  });
  return result;
};

const error = ({ title, text }) => {
  MySwal.fire({
    title,
    text,
    icon: "error",
  });
};

export const useAlert = () => {
  const { t } = useTranslation("alert");

  return {
    check: async ({
      title = t("check.title"),
      text = t("check.text"),
      confirmButtonText = t("check.confirm"),
      cancelButtonText = t("check.cancel"),
      cancelButtonExists = true,
    }) => {
      return await checkQuestion({
        title,
        text,
        confirmButtonText,
        cancelButtonText,
        cancelButtonExists,
      });
    },
    error: ({ title = t("error.title"), text = t("error.text") }) => {
      error({ title, text });
    },
  };
};
