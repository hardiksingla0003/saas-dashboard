const STORAGE_KEY = "users_data";

const defaultUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Lee",
    email: "sarah@example.com",
    role: "Manager",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Mike Ross",
    email: "mike@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 4,
    name: "Hardik",
    email: "hardik@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Alex",
    email: "alex@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 6,
    name: "Emma",
    email: "emma@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 7,
    name: "Noah",
    email: "noah@example.com",
    role: "User",
    status: "Inactive",
  },
];

const getStoredUsers = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredUsers());
    }, 300);
  });
};

export const createUser = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const newUser = { ...userData, id: Date.now() };
      const updated = [...users, newUser];
      saveUsers(updated);
      resolve(newUser);
    }, 300);
  });
};

export const updateUser = (updatedUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const updated = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      );
      saveUsers(updated);
      resolve(updatedUser);
    }, 300);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const updated = users.filter((user) => user.id !== id);
      saveUsers(updated);
      resolve(id);
    }, 300);
  });
};
