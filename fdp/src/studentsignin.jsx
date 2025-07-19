import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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
    // setError(''); // Optional: to clear previous errors
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password
      });
  
      const { token, user } = response.data;
  
      // Optional: store token for later (e.g., protected routes)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user.userId); // <-- Store userId for later use
  
      // Navigate based on role or email
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-6">
      <div className="bg-white/90 backdrop-blur rounded-xl shadow-xl p-8 w-full max-w-md transition-transform hover:-translate-y-1">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center text-white text-2xl rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600">
            🔐
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
          <p className="text-sm text-gray-500">Access your event account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white`}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-500 font-medium hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
