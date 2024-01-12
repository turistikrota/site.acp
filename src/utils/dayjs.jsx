import "dayjs/locale/en";
import "dayjs/locale/tr";
import relativeTime from 'dayjs/plugin/relativeTime';

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const useDayJS = () => {
  const {i18n} = useTranslation()
  dayjs.extend(relativeTime)
  dayjs.locale(i18n.language);
  return dayjs;
};
