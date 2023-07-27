import { SiteHosts } from "../config/site";

const Routes = {
  tr: {
    auth: {
      base: `${SiteHosts.auth.tr}?redirect=`,
    },
  },
  en: {
    auth: {
      base: `${SiteHosts.auth.en}?redirect=`,
    },
  },
};

export const getStaticRoute = (locale) => {
  return Routes[locale];
};

export const mergeUrlWithLocale = (locale, url) => `/${locale}${url}`;
