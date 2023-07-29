export const Roles = {
  admin: "admin",
  Places: {
    any: "Places.any",
    list: "Places.list",
    create: "Places.create",
    update: "Places.update",
  },
};

export const AllPlaceRoles = Object.values(Roles.Places);

export const AllAppRoles = Object.values(Roles);
