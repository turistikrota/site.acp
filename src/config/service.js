export const Services = {
  Auth: "auth",
  Account: "account",
  Upload: "upload",
  Admin: "admin",
  Place: "place",
  Business: "business",
  Category: "category",
  Support: "support",
  Listing: "listing",
};

export const ApiUrls = {
  [Services.Auth]: import.meta.env.VITE_API_AUTH_SRV_URL,
  [Services.Admin]: import.meta.env.VITE_API_ADMIN_SRV_URL,
  [Services.Account]: import.meta.env.VITE_API_ACCOUNT_SRV_URL,
  [Services.Upload]: import.meta.env.VITE_API_UPLOAD_SRV_URL,
  [Services.Place]: import.meta.env.VITE_API_PLACE_SRV_URL,
  [Services.Business]: import.meta.env.VITE_API_BUSINESS_SRV_URL,
  [Services.Category]: import.meta.env.VITE_API_CATEGORY_SRV_URL,
  [Services.Support]: import.meta.env.VITE_API_SUPPORT_SRV_URL,
  [Services.Listing]: import.meta.env.VITE_API_LISTING_SRV_URL,
};

export const apiUrl = (service, path) => `${ApiUrls[service]}${path}`;
