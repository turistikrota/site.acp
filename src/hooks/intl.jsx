
export const useLocalizedCurrencyFormatter = (locale, currency = 'USD') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency })
}