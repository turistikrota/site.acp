export const Services = {
  Auth: "auth",
  Account: "account",
  Upload: "upload",
  Admin: "admin",
  Place: "place",
};

export const ApiUrls = {
  [Services.Auth]: import.meta.env.VITE_API_AUTH_SRV_URL,
  [Services.Admin]: import.meta.env.VITE_API_ADMIN_SRV_URL,
  [Services.Account]: import.meta.env.VITE_API_ACCOUNT_SRV_URL,
  [Services.Upload]: import.meta.env.VITE_API_UPLOAD_SRV_URL,
  [Services.Place]: import.meta.env.VITE_API_PLACE_SRV_URL,
};

export const apiUrl = (service, path) => `${ApiUrls[service]}${path}`;
