export const Roles = {
  admin: "admin",
  dashboard: {
    view: "dashboard.view",
  },
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
      read: "place.feature.read",
    },
  },
  Business: {
    list: "business.list",
    create: "business.create",
    verify: "business.verify",
    delete: "business.delete",
    recover: "business.recover",
    reject: "business.reject",
    view: "business.view",
  },
  Categories: {
    any: "category.all",
    list: "category.list",
    create: "category.create",
    update: "category.update",
    delete: "category.delete",
    enable: "category.enable",
    disable: "category.disable",
  },
  Support: {
    Contact: {
      list: "support.contact.list",
      read: "support.contact.read",
    },
    Feedback: {
      list: "support.feedback.list",
     read: "support.feedback.read",
    },
    list: "support.list",
    close: "support.close",
    delete: "support.delete",
    removeMsg: "support.remove_msg",
    addMsg: "support.add_msg",
    update: "support.update",
    view: "support.view",
    super: "support.super",
  },
  Listing: {
    view: "listing.view",
    super: "listing.super",
  },
  Users: {
    list: "user_list",
  },
  Cdn: {
    upload: "cdn.upload",
  },
  Perms: {
    add: "admin.permission.add",
    remove: "admin.permission.remove",
    list: "admin.permission.list",
  },
};

export const AllPlaceRoles = Object.values(Roles.Places);

export const AllCategoryRoles = Object.values(Roles.Categories);

export const AllSupportFeedbackRoles = Object.values(Roles.Support.Feedback);

export const AllSupportContactRoles = Object.values(Roles.Support.Contact);

export const AllSupportRoles = [
  ...Object.values(Roles.Support),
  ...AllSupportFeedbackRoles,
  ...AllSupportContactRoles,
]

export const AllAppRoles = Object.values(Roles);

export const AllPermissionRoles = Object.values(Roles.Perms);

export const AllListingRoles = Object.values(Roles.Listing);