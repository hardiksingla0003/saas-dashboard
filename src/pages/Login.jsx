import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const demoAccounts = [
  {
    email: "admin@demo.com",
    password: "Admin@123",
    role: "admin",
    name: "Admin User",
  },
  {
    email: "manager@demo.com",
    password: "Manager@123",
    role: "manager",
    name: "Manager User",
  },
  {
    email: "user@demo.com",
    password: "User@123",
    role: "user",
    name: "Demo User",
  },
];
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const account = demoAccounts.find(
        (acc) => acc.email === email && acc.password === password,
      );

      if (!account) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      login({
        id: Date.now(),
        name: account.name,
        role: account.role,
      });

      toast.success(`Welcome, ${account.name}!`);
      navigate("/dashboard");
      setLoading(false);
    }, 500);
  };
  const handleQuickLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="dark:text-white text-gray-900 text-2xl font-bold">
            Admin Panel
          </h1>
          <p className="dark:text-gray-400 text-gray-500 mt-1 text-sm">
            Sign in to your account
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border px-4 py-2 w-full border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border px-4 py-2 w-full border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-6">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3">
            - Quick login for demo -
          </p>
          <div className="flex gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                onClick={() => handleQuickLogin(acc)}
                className="flex-1 text-xs py-2 px-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition cursor-pointer capitalize"
              >
                {acc.role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
