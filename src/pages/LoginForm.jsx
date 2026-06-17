import { useState } from "react";
import { FaSignInAlt, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function FloatingInput({ type, name, label, value, onChange, children }) {
  return (
    <div className="relative mb-5">
      <input
        type={type}
        name={name}
        placeholder=" "
        required
        value={value}
        onChange={onChange}
        className="
          peer w-full px-3 pt-5 pb-2
          border border-gray-300 rounded-lg
          bg-white text-sm outline-none
          focus:border-[#0d4a17] focus:ring-2 focus:ring-[#0d4a17]/20
          transition-all duration-200
        "
      />
      <label
        className="
          absolute left-3 top-2.5
          text-[10px] text-gray-400 pointer-events-none
          transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
          peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#0d4a17] peer-focus:font-semibold
          peer-[&:not(:placeholder-shown)]:top-1.5
          peer-[&:not(:placeholder-shown)]:text-[10px]
          peer-[&:not(:placeholder-shown)]:text-[#0d4a17]
          peer-[&:not(:placeholder-shown)]:font-semibold
          bg-white px-1 rounded
        "
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function LoginForm() {
  const [activeTab, setActiveTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/admin";
    } catch (err) {
      setError("Login failed. Make sure the server is running.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0d4a17] flex justify-center items-center px-4">
      <form
        className="w-full max-w-sm bg-[#f3efe4] p-8 rounded-2xl shadow-xl"
        onSubmit={handleSubmit}
      >
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/images/logo3.png"
            alt="Gona logo"
            className="w-25 h-25 mb-2"
          />
          <p className="text-xs text-gray-500 text-center">
            Smart Farm Management Platform
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#e6e0d3] rounded-xl overflow-hidden mb-6">
          <button
            type="button"
            onClick={() => setActiveTab(true)}
            className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 rounded-xl ${
              activeTab
                ? "bg-[#171305] text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(false)}
            className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 rounded-xl ${
              !activeTab
                ? "bg-[#171305] text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {activeTab ? (
          <>
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 text-center px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Email */}
            <FloatingInput
              type="email"
              name="email"
              label="EMAIL"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Password */}
            <div className="relative mb-4">
              <FloatingInput
                type={showPassword ? "text" : "password"}
                name="password"
                label="PASSWORD"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#171305] cursor-pointer z-10 text-base"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#171305] text-white text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <FaSignInAlt />
              Sign In
            </button>
          </>
        ) : (
          <RegisterForm />
        )}

        <p className="text-center mt-4 text-xs text-[#8b6f3d] cursor-pointer flex items-center justify-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FaArrowLeft /> Back to Gona Home
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
