import { Locales } from "./locales";

export const Sites = {
  Auth: "auth",
};

export const SiteHosts = {
  [Sites.Auth]: {
    [Locales.En]: import.meta.env.VITE_AUTH_SITE_TR_HOST,
    [Locales.Tr]: import.meta.env.VITE_AUTH_SITE_EN_HOST,
  },
};
