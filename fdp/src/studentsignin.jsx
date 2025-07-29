import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Illustration = () => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-l-2xl p-8">
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
      <circle cx="60" cy="60" r="60" fill="url(#paint0_linear)" />
      <ellipse cx="60" cy="60" rx="32" ry="36" fill="#fff" fillOpacity="0.15" />
      <ellipse cx="60" cy="60" rx="20" ry="22" fill="#fff" fillOpacity="0.25" />
      <ellipse cx="60" cy="60" rx="10" ry="11" fill="#fff" fillOpacity="0.5" />
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
    <h2 className="text-white text-2xl font-bold mb-2 drop-shadow">Welcome Back!</h2>
    <p className="text-white/80 text-center text-base">Sign in to access your events and manage your registrations.</p>
  </div>
);

const FloatingLabelInput = ({ id, label, type, value, onChange, error, ...props }) => (
  <div className="relative mb-6">
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`block w-full px-4 pt-6 pb-2 text-base bg-white/80 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all peer`}
      placeholder=" "
      {...props}
    />
    <label htmlFor={id} className={`absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500 ${error ? 'text-red-500' : ''}`}>{label}</label>
    {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
  </div>
);

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (type === 'checkbox') setRemember(checked);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user.userId);
      if (formData.email === "boss@gmail.com") {
        nav('/AdminDash');
      } else {
        nav('/dash');
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="flex w-full max-w-3xl bg-white/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Left illustration */}
        <div className="hidden md:flex w-1/2">
          <Illustration />
        </div>
        {/* Right form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          <div className="mb-8 text-center">
            <span className="inline-block text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent tracking-tight mb-2">E-Groots</span>
            <div className="text-lg text-gray-700 font-semibold">Sign In</div>
            <div className="text-sm text-gray-400">Access your event account</div>
          </div>
          <form onSubmit={handleSubmit}>
            <FloatingLabelInput
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
            />
            <div className="relative mb-6">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`block w-full px-4 pt-6 pb-2 text-base bg-white/80 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all peer pr-12`}
                placeholder=" "
                required
                autoComplete="current-password"
              />
              <label htmlFor="password" className={`absolute left-4 top-2 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500 ${errors.password ? 'text-red-500' : ''}`}>Password</label>
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7Z"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                ) : (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M17.94 17.94A9.97 9.97 0 0 1 12 19c-5.4 0-9-7-9-7a17.6 17.6 0 0 1 4.06-5.94M21 21 3 3m7.5 7.5A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/><path stroke="currentColor" strokeWidth="2" d="M9.88 9.88A3 3 0 0 1 15 12c0 .83-.34 1.58-.88 2.12"/></svg>
                )}
              </button>
              {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-500 rounded mr-2"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg tracking-wide mb-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" /><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                  Signing In...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
          <div className="text-center mt-4 text-sm text-gray-500">
            Don’t have an account?{' '}
            <a href="/register" className="text-indigo-500 font-medium hover:underline">Register here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;