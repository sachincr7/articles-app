const AccessControl = require("accesscontrol");

let grantsObject = {
  admin: {
    profile: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    article: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!date", "!_id"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };
