export const Services = {
  Auth: "auth",
  Account: "account",
  Upload: "upload",
  Admin: "admin",
  Place: "place",
  Business: "business",
  Category: "category",
};

export const ApiUrls = {
  [Services.Auth]: import.meta.env.VITE_API_AUTH_SRV_URL,
  [Services.Admin]: import.meta.env.VITE_API_ADMIN_SRV_URL,
  [Services.Account]: import.meta.env.VITE_API_ACCOUNT_SRV_URL,
  [Services.Upload]: import.meta.env.VITE_API_UPLOAD_SRV_URL,
  [Services.Place]: import.meta.env.VITE_API_PLACE_SRV_URL,
  [Services.Business]: import.meta.env.VITE_API_BUSINESS_SRV_URL,
  [Services.Category]: import.meta.env.VITE_API_CATEGORY_SRV_URL,
};

export const apiUrl = (service, path) => `${ApiUrls[service]}${path}`;
