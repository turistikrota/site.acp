import { useTranslation } from "react-i18next"

export const useLocalizedCurrencyFormatter = (currency = 'USD') => {
  const {i18n} = useTranslation()
  return new Intl.NumberFormat(i18n.language, { style: 'currency', currency: currency ? currency : 'USD' })
}