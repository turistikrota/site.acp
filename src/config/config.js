export const Config = {
  turnstile: {
    siteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
  },
  locales: ["English", "Türkçe"],
  langs: ["en", "tr"],
  headers: {
    TurnstileToken: "X-Turnstile-Token",
    Authorization: "Authorization",
    AcceptLang: "Accept-Language",
    Credentials: "Access-Control-Allow-Credentials",
  },
  cdn: {
    notFound: "https://s3.turistikrota.com/ui/404.png",
    apps: {
      places: "places",
    },
  },
  places: {
    types: [
      "eating",
      "coffee",
      "bar",
      "beach",
      "amaze",
      "shopping",
      "transport",
      "culture",
      "health",
      "sport",
      "nature",
      "nightlife",
      "other",
    ],
  },
};
