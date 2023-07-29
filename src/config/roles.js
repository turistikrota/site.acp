export const Roles = {
  admin: "admin",
  Places: {
    any: "Places.any",
    list: "Places.list",
    create: "Places.create",
    update: "Places.update",
  },
  Perms: {
    add: "admin.permission.add",
    remove: "admin.permission.remove",
    list: "admin.permission.list",
  },
};

export const AllPlaceRoles = Object.values(Roles.Places);

export const AllAppRoles = Object.values(Roles);

export const AllPermissionRoles = Object.values(Roles.Perms);
