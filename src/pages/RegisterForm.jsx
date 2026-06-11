import { useState } from "react";
import {
  FaUserPlus,
  FaTractor,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function FloatingInput({ type, name, label, value, onChange, children }) {
  return (
    <div className="relative mb-5">
      <input
        type={type}
        name={name}
        placeholder=" "
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

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleRoleSelect(role) {
    setSelectedRole(role);
    setFormData({ ...formData, role });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Registration Data:", formData);
  }

  return (
    <div>
      {/* Username */}
      <FloatingInput
        type="text"
        name="fullName"
        label="USERNAME"
        value={formData.fullName}
        onChange={handleChange}
      />

      {/* Email */}
      <FloatingInput
        type="email"
        name="email"
        label="EMAIL"
        value={formData.email}
        onChange={handleChange}
      />

      {/* Password */}
      <div className="relative">
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

      {/* Role Selection */}
      <p className="text-[11px] text-[#331107] mb-3 font-medium tracking-wide">
        SELECT ROLE
      </p>
      <div className="flex gap-4 mb-5">
        <button
          type="button"
          onClick={() => handleRoleSelect("Admin")}
          className={`flex-1 h-12 flex flex-col items-center justify-center gap-1 rounded-lg border text-sm transition-all duration-200 cursor-pointer
            ${
              selectedRole === "Admin"
                ? "border-[#171305] bg-[#171305] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-[#171305]"
            }`}
        >
          <FaShieldAlt className="text-base" />
          Admin
        </button>
        <button
          type="button"
          onClick={() => handleRoleSelect("Farmer")}
          className={`flex-1 h-12 flex flex-col items-center justify-center gap-1 rounded-lg border text-sm transition-all duration-200 cursor-pointer
            ${
              selectedRole === "Farmer"
                ? "border-[#99672d] bg-[#99672d] text-white"
                : "border-[#99672d] bg-transparent text-[#99672d] hover:bg-[#99672d]/10"
            }`}
        >
          <FaTractor className="text-base" />
          Farmer
        </button>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-3.5 bg-[#171305] text-white text-sm rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <FaUserPlus />
        Create Account
      </button>
    </div>
  );
}

export default RegisterForm;
