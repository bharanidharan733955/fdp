import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const EventLogin = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    gender: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
   const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.email.trim()) newErrors.email = 'Please enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      console.log('Submitted Data:', formData);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        alert('Redirecting to event dashboard...');
      }, 2000);
    }, 1500);
    nav("/selection");
  };

 
  // const handleButton = () => {
  //   handleSubmit();
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md transition-transform hover:-translate-y-1 hover:shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center text-white text-2xl rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 animate-pulse">
            🎉
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Event Login</h1>
          <p className="text-sm text-gray-500">Join our exclusive event experience</p>
        </div>

        {success && (
          <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-4 animate-slide-in">
            Redirecting to Payment Process.......
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Enter your full name' },
            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'Enter your email address' },
            { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
            { label: 'Organization/College', name: 'organization', type: 'text', placeholder: 'Enter your organization or college' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-semibold text-gray-600 uppercase mb-1">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                required
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                } focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white`}
              />
              {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
            </div>
          ))}

          <div>
            <label htmlFor="gender" className="block text-sm font-semibold text-gray-600 uppercase mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="mt-1 mr-2 scale-110"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
              I agree to the event terms and conditions
            </label>
          </div>
          {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms}</p>}

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70"
          >
            {loading && (
              <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-indigo-500 hover:underline">
            Need help? Contact event support
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventLogin;
