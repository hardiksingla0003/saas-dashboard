import { rolePermissions } from "../utils/permissions";
import { Navigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../api/usersApi";
import useAuth from "../hooks/useAuth";
import useDebounce from "../hooks/useDebounce";
import Filters from "../components/Filters";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";

const Users = () => {
  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [addOpen, setAddOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });
  const [formError, setFormError] = useState("");
  const usersPerPage = 5;
  const role = auth.user?.role;
  const permissions = rolePermissions[role];

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        setUsersList(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load users. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const debouncedSearch = useDebounce(search);

  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      if (!user) return false;
      const searchValue = debouncedSearch.toLowerCase();

      const matchesSearch =
        (user.name ?? "").toLowerCase().includes(searchValue) ||
        (user.email ?? "").toLowerCase().includes(searchValue) ||
        (user.role ?? "").toLowerCase().includes(searchValue);

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [usersList, debouncedSearch, roleFilter, statusFilter]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (!sortField) return 0;
      const valueA = (a[sortField] ?? "").toString().toLowerCase();
      const valueB = (b[sortField] ?? "").toString().toLowerCase();

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredUsers, sortField, sortOrder]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, roleFilter]);

  const handleEdit = useCallback((user) => {
    setSelectedUser(user);
    setEditOpen(true);
  }, []);

  const handleDelete = useCallback((user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!selectedUser) return;

    updateUser(selectedUser).then(() => {
      setUsersList((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? selectedUser : user)),
      );
      setEditOpen(false);
      setSelectedUser(null);
      toast.success("User updated successfully");
    });
  }, [selectedUser]);

  const handleSort = (field) => {
    if (sortField === field) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortField(null);
        setSortOrder("asc");
      }
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setFormError("Name and Email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      setFormError("Please enter a valid email.");
      return;
    }
    setFormError("");
    createUser(newUser).then((created) => {
      setUsersList((prev) => [...prev, created]);
      setAddOpen(false);
      setNewUser({
        name: "",
        email: "",
        role: "User",
        status: "Active",
      });
      toast.success("User created successfully");
    });
  };

  const confirmDelete = () => {
    deleteUser(selectedUser.id).then(() => {
      setUsersList((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setDeleteOpen(false);
      setSelectedUser(null);
      toast.success("User deleted successfully");
    });
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Role", "Status"];
    const rows = usersList.map((u) => [u.name, u.email, u.role, u.status]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    ...(permissions.canEditUser ? [{ key: "actions", label: "Actions" }] : []),
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="flex gap-3">
        {permissions.canEditUser && (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer transition"
            onClick={() => {
              setAddOpen(true);
            }}
          >
            + Add user
          </button>
        )}
        <button
          onClick={exportToCSV}
          className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer transition"
        >
          Export CSV
        </button>
      </div>
      <Filters
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      {loading ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-300">
          Loading users...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <Table
          columns={columns}
          data={currentUsers}
          onEdit={permissions.canEditUser ? handleEdit : null}
          onDelete={permissions.canDeleteUser ? handleDelete : null}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        indexOfFirst={indexOfFirstUser}
        indexOfLast={indexOfLastUser}
        onPageChange={setCurrentPage}
      />
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit User"
      >
        {selectedUser && (
          <div className="space-y-4">
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => {
                setSelectedUser((prev) => ({ ...prev, name: e.target.value }));
              }}
              className="border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2"
            />
            <input
              type="text"
              value={selectedUser.email}
              onChange={(e) => {
                setSelectedUser((prev) => ({ ...prev, email: e.target.value }));
              }}
              className="border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2"
            />
            <select
              className="border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2"
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
            <select
              className="border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2"
              value={selectedUser.status}
              onChange={(e) =>
                setSelectedUser((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete User"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p>
              Are you sure you want to delete <b>{selectedUser.name}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded cursor-pointer"
                onClick={() => setDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white rounded px-4 py-2 cursor-pointer"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add User"
      >
        <div className="space-y-4">
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, name: e.target.value }));
            }}
            placeholder="Name"
            className="border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2"
          />
          <input
            type="text"
            value={newUser.email}
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, email: e.target.value }));
            }}
            placeholder="Email"
            className="border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2"
          />
          <select
            className="border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2"
            value={newUser.role}
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, role: e.target.value }));
            }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
          <select
            className="border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2"
            value={newUser.status}
            onChange={(e) => {
              setNewUser((prev) => ({ ...prev, status: e.target.value }));
            }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded cursor-pointer"
              onClick={() => {
                setAddOpen(false);
                setFormError("");
                setNewUser({
                  name: "",
                  email: "",
                  role: "User",
                  status: "Active",
                });
              }}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 cursor-pointer transition"
              onClick={handleAddUser}
            >
              Add user
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
