import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const EventLogin = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    organization: '',
    gender: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
   const nav = useNavigate();

  // Define steps
  const steps = [
    { id: 1, title: 'Personal Info', icon: '👤', fields: ['fullName', 'email'] },
    { id: 2, title: 'Contact Details', icon: '📱', fields: ['phone', 'organization'] },
    { id: 3, title: 'Security', icon: '🔒', fields: ['password'] },
    { id: 4, title: 'Preferences', icon: '⚙️', fields: ['gender', 'agreeTerms'] },
    { id: 5, title: 'Complete', icon: '✅', fields: [] }
  ];

  // Animated background particles
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-white/20 rounded-full animate-float';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      document.querySelector('.particles-container').appendChild(particle);
      
      setTimeout(() => particle.remove(), 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    const currentStepData = steps.find(s => s.id === step);
    
    if (currentStepData) {
      currentStepData.fields.forEach(field => {
        if (field === 'fullName' && !formData.fullName.trim()) {
          newErrors.fullName = 'Please enter your full name';
        }
        if (field === 'email' && !formData.email.trim()) {
          newErrors.email = 'Please enter your email address';
        } else if (field === 'email' && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Enter a valid email';
        }
        if (field === 'password' && !formData.password) {
          newErrors.password = 'Password is required';
        } else if (field === 'password' && formData.password && formData.password.length < 6) {
          newErrors.password = 'Minimum 6 characters required';
        }
        if (field === 'phone' && !formData.phone.trim()) {
          newErrors.phone = 'Please enter your phone number';
        }
        if (field === 'gender' && !formData.gender) {
          newErrors.gender = 'Please select your gender';
        }
        if (field === 'agreeTerms' && !formData.agreeTerms) {
          newErrors.agreeTerms = 'You must agree to the terms';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
  
    setLoading(true);
    setSuccess(false);
  
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      console.log(res.data);
      setSuccess(true);

      // Store userId if available
      if (res.data.user && res.data.user.userId) {
        localStorage.setItem('userId', res.data.user.userId);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
  
      setTimeout(() => {
        alert('Redirecting to event dashboard...');
        nav("/selection");
      }, 2000);
  
    } catch (err) {
      alert(err.response?.data?.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
  return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
            {[
              { label: 'Full Name', name: 'fullName', type: 'text', icon: '👤' },
              { label: 'Email Address', name: 'email', type: 'email', icon: '📧' },
            ].map(({ label, name, type, icon }) => (
              <div key={name} className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg transition-all duration-300 group-focus-within:scale-110">
                  {icon}
          </div>
                <input
                  id={name}
                  name={name}
                  type={type}
                  required
                  value={formData[name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField('')}
                  placeholder=" "
                  className={`w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border-2 rounded-xl text-white placeholder-transparent transition-all duration-300 ${
                    errors[name] 
                      ? 'border-red-400 focus:border-red-300' 
                      : focusedField === name 
                        ? 'border-purple-400 focus:border-purple-300' 
                        : 'border-white/30 focus:border-purple-300'
                  } focus:outline-none focus:ring-4 focus:ring-purple-500/20`}
                />
                <label 
                  htmlFor={name}
                  className={`absolute left-12 top-4 text-purple-200 transition-all duration-300 ${
                    formData[name] || focusedField === name 
                      ? 'text-xs -translate-y-6 text-purple-300' 
                      : 'text-sm'
                  }`}
                >
                  {label}
                </label>
                {errors[name] && (
                  <p className="text-red-300 text-xs mt-1 ml-4 animate-shake">{errors[name]}</p>
                )}
        </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Details</h3>
            {[
              { label: 'Phone Number', name: 'phone', type: 'tel', icon: '📱' },
              { label: 'Organization', name: 'organization', type: 'text', icon: '🏢' },
            ].map(({ label, name, type, icon }) => (
              <div key={name} className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg transition-all duration-300 group-focus-within:scale-110">
                  {icon}
                </div>
              <input
                id={name}
                name={name}
                type={type}
                required
                value={formData[name]}
                onChange={handleChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField('')}
                  placeholder=" "
                  className={`w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border-2 rounded-xl text-white placeholder-transparent transition-all duration-300 ${
                    errors[name] 
                      ? 'border-red-400 focus:border-red-300' 
                      : focusedField === name 
                        ? 'border-purple-400 focus:border-purple-300' 
                        : 'border-white/30 focus:border-purple-300'
                  } focus:outline-none focus:ring-4 focus:ring-purple-500/20`}
                />
                <label 
                  htmlFor={name}
                  className={`absolute left-12 top-4 text-purple-200 transition-all duration-300 ${
                    formData[name] || focusedField === name 
                      ? 'text-xs -translate-y-6 text-purple-300' 
                      : 'text-sm'
                  }`}
                >
                  {label}
                </label>
                {errors[name] && (
                  <p className="text-red-300 text-xs mt-1 ml-4 animate-shake">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-white mb-4">Security Setup</h3>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg transition-all duration-300 group-focus-within:scale-110">
                🔒
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                placeholder=" "
                className={`w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border-2 rounded-xl text-white placeholder-transparent transition-all duration-300 ${
                  errors.password 
                    ? 'border-red-400 focus:border-red-300' 
                    : focusedField === 'password' 
                      ? 'border-purple-400 focus:border-purple-300' 
                      : 'border-white/30 focus:border-purple-300'
                } focus:outline-none focus:ring-4 focus:ring-purple-500/20`}
              />
              <label 
                htmlFor="password"
                className={`absolute left-12 top-4 text-purple-200 transition-all duration-300 ${
                  formData.password || focusedField === 'password' 
                    ? 'text-xs -translate-y-6 text-purple-300' 
                    : 'text-sm'
                }`}
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-300 text-xs mt-1 ml-4 animate-shake">{errors.password}</p>
              )}
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-purple-200 text-sm">💡 Password must be at least 6 characters long</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-white mb-4">Preferences</h3>
            
            {/* Gender Selection */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg transition-all duration-300 group-focus-within:scale-110">
                👥
              </div>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
                onFocus={() => setFocusedField('gender')}
                onBlur={() => setFocusedField('')}
                className={`w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border-2 rounded-xl text-white transition-all duration-300 ${
                  errors.gender 
                    ? 'border-red-400 focus:border-red-300' 
                    : focusedField === 'gender' 
                      ? 'border-purple-400 focus:border-purple-300' 
                      : 'border-white/30 focus:border-purple-300'
                } focus:outline-none focus:ring-4 focus:ring-purple-500/20`}
              >
                <option value="" className="text-gray-600">Select Gender</option>
                <option value="Male" className="text-gray-600">Male</option>
                <option value="Female" className="text-gray-600">Female</option>
                <option value="Other" className="text-gray-600">Other</option>
            </select>
              {errors.gender && (
                <p className="text-red-300 text-xs mt-1 ml-4 animate-shake">{errors.gender}</p>
              )}
          </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-xl border border-white/20">
              <div className="relative">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
                  className="w-5 h-5 text-purple-600 bg-white/20 border-2 border-white/30 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                />
                <div className="absolute inset-0 w-5 h-5 rounded border-2 border-transparent pointer-events-none transition-all duration-200 group-hover:border-purple-300"></div>
              </div>
              <label htmlFor="agreeTerms" className="text-sm text-purple-200 leading-relaxed">
                I agree to the <span className="text-purple-300 underline cursor-pointer">event terms and conditions</span>
            </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-red-300 text-xs mt-1 animate-shake">{errors.agreeTerms}</p>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-white mb-4">Review & Complete</h3>
            <div className="bg-white/10 p-6 rounded-xl space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-purple-300 font-semibold">Name:</p>
                  <p className="text-white">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-purple-300 font-semibold">Email:</p>
                  <p className="text-white">{formData.email}</p>
                </div>
                <div>
                  <p className="text-purple-300 font-semibold">Phone:</p>
                  <p className="text-white">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-purple-300 font-semibold">Organization:</p>
                  <p className="text-white">{formData.organization}</p>
                </div>
                <div>
                  <p className="text-purple-300 font-semibold">Gender:</p>
                  <p className="text-white">{formData.gender}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-purple-200 text-sm">✅ All information looks good!</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="particles-container absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
          {/* Header with animated icon */}
          <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Event Registration</h1>
            <p className="text-purple-200">Join our exclusive event experience</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'bg-white/20 text-purple-200 border-2 border-white/30'
                  }`}>
                    {currentStep > step.id ? '✓' : step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mt-2 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-purple-200 text-sm">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
              </p>
            </div>
          </div>
          
          {success && (
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-2xl text-center mb-6 animate-bounce">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Redirecting to Payment Process...
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              )}
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
          <button
            type="submit"
            disabled={loading}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-70"
          >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
          </button>
              )}
            </div>
        </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <a href="#" className="text-purple-300 hover:text-white transition-colors duration-300 text-sm underline decoration-purple-400/50 hover:decoration-purple-400">
            Need help? Contact event support
          </a>
        </div>
      </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default EventLogin;