import { Locales } from "./locales";

export const Sites = {
  Auth: "auth",
  Listing: "listing",
};

export const SiteHosts = {
  [Sites.Auth]: {
    [Locales.En]: import.meta.env.VITE_AUTH_SITE_TR_HOST,
    [Locales.Tr]: import.meta.env.VITE_AUTH_SITE_EN_HOST,
  },
  [Sites.Listing]: {
    [Locales.En]: import.meta.env.VITE_LISTING_SITE_TR_HOST,
    [Locales.Tr]: import.meta.env.VITE_LISTING_SITE_EN_HOST,
  },
};
