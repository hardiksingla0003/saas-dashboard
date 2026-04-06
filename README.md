# 🛡️ SaaS Admin Dashboard

A role-based admin dashboard built with React and Tailwind CSS, featuring full CRUD operations, authentication, and a clean responsive UI.

🔗 **Live Demo**: [saas-dashboard-ebon-five.vercel.app](https://saas-dashboard-ebon-five.vercel.app)

---

## 🚀 Demo Credentials

| Role    | Email            | Password    |
| ------- | ---------------- | ----------- |
| Admin   | admin@demo.com   | Admin@123   |
| Manager | manager@demo.com | Manager@123 |
| User    | user@demo.com    | User@123    |

> 💡 Or use the **Quick Login** buttons on the login page

---

## ✨ Features

- 🔐 **Role-Based Access Control (RBAC)** — Admin, Manager, User roles with different permissions
- 🛡️ **Protected Routes** — Route-level and component-level permission guards
- 👤 **Full CRUD** — Create, Read, Update, Delete users with localStorage persistence
- 🔍 **Search & Filter** — Debounced search, role filter, status filter
- 📊 **Sorting** — Click column headers to sort ascending/descending
- 📄 **Pagination** — 5 users per page with page controls
- 📤 **Export to CSV** — Download users list as a CSV file
- 🌙 **Dark Mode** — System preference detection + manual toggle, persisted in localStorage
- 🔔 **Toast Notifications** — Success/error feedback on all actions
- 📱 **Responsive Design** — Mobile sidebar overlay + desktop collapsible sidebar
- 🎨 **Status Badges** — Color-coded Active/Inactive indicators

---

## 🖥️ Pages

| Page          | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| **Login**     | Demo auth with credential validation and quick login buttons      |
| **Dashboard** | Stats overview, revenue line chart, users by role bar chart       |
| **Users**     | Full CRUD table with search, filter, sort, pagination, CSV export |
| **Settings**  | Profile name update, dark mode toggle, notification preference    |

---

## 🔑 Role Permissions

| Permission     | Admin | Manager | User |
| -------------- | ----- | ------- | ---- |
| View Dashboard | ✅    | ✅      | ✅   |
| View Users     | ✅    | ✅      | ❌   |
| Edit Users     | ✅    | ❌      | ❌   |
| Delete Users   | ✅    | ❌      | ❌   |
| View Settings  | ✅    | ✅      | ✅   |

---

## 🛠️ Tech Stack

| Technology      | Purpose                       |
| --------------- | ----------------------------- |
| React 18        | UI Library                    |
| React Router v6 | Client-side routing           |
| Tailwind CSS    | Styling                       |
| Recharts        | Charts and data visualization |
| Lucide React    | Icons                         |
| React Hot Toast | Toast notifications           |
| localStorage    | Data persistence              |

---

## 📁 Project Structure

```
src/
├── api/                  # API layer (usersApi.js)
├── components/           # Reusable components
│   ├── Filters.jsx
│   ├── MainLayout.jsx
│   ├── Modal.jsx
│   ├── Pagination.jsx
│   ├── RevenueChart.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   ├── Table.jsx
│   ├── Topbar.jsx
│   └── UsersChart.jsx
├── context/              # React Context
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── data/                 # Static data
│   └── dummyData.js
├── hooks/                # Custom hooks
│   ├── useAuth.js
│   └── useDebounce.js
├── pages/                # Page components
│   ├── AccessDenied.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Settings.jsx
│   └── Users.jsx
├── routes/               # Routing
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
└── utils/                # Utilities
    └── permissions.js
```

---

## ⚙️ Run Locally

```bash
# Clone the repository
git clone https://github.com/hardiksingla0003/saas-dashboard.git

# Navigate to project
cd saas-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🧠 Key Implementation Details

- **RBAC** — Permissions are defined in `utils/permissions.js` and checked at both route level (`ProtectedRoute`) and component level, providing defense in depth
- **Auth Persistence** — User session persisted in `localStorage` with a loading state to prevent redirect flicker on refresh
- **Debounced Search** — Custom `useDebounce` hook prevents filtering on every keystroke
- **API Abstraction** — All data operations go through `usersApi.js`, making it easy to swap localStorage for a real REST API
- **Dark Mode** — Detects system preference on first visit, persists user choice in localStorage

---

## 📌 Note

This project uses `localStorage` for data persistence as a demo. In production, the `api/usersApi.js` layer would be replaced with real API calls to a backend server.
