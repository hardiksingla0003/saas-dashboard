export const rolePermissions = {
  admin: {
    canViewUsers: true,
    canEditUser: true,
    canDeleteUser: true,
  },
  manager: {
    canViewUsers: true,
    canEditUser: false,
    canDeleteUser: false,
  },
  user: {
    canViewUsers: false,
    canEditUser: false,
    canDeleteUser: false,
  },
};
