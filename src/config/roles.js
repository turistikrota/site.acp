export const Roles = {
  admin: "admin",
  Places: {
    any: "place.all",
    list: "place.list",
    create: "place.create",
    update: "place.update",
    delete: "place.delete",
    enable: "place.enable",
    disable: "place.disable",
    Features: {
      all: "place.feature.all",
      list: "place.feature.list",
      create: "place.feature.create",
      disable: "place.feature.update",
      enable: "place.feature.enable",
      update: "place.feature.update",
      delete: "place.feature.delete",
    },
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
