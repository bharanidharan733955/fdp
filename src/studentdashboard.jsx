import React, { useState } from 'react';
import { useNavigate } from 'react-router';
const WorkshopDashboard = ({ userDetails }) => {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample workshop data - in real app this would come from API
  const workshopData = {
    title: "STM Development Workshop",
    instructor: "Pugal",
    level: "Intermediate",
    startDate: "December 15, 2025",
    startTime: "9:00 AM",
    location: "Virtual Conference Room A",
    materials: [
      { name: "Workshop Slides", type: "PDF", size: "2.5 MB" },
      { name: "Code Examples", type: "ZIP", size: "15 MB" },
      { name: "Resource Links", type: "PDF", size: "1.2 MB" }
    ],
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <nav className="bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                📚
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Workshop Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {userDetails.fullName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Workshop starts in</p>
                <p className="text-lg font-bold text-blue-600">15 days</p>
              </div>
              <button
                 
                onClick={() =>  nav('/signin')}
                
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">
          {/* Workshop Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <p className="text-2xl font-bold">Registered</p>
              <p className="text-sm opacity-80">Payment Confirmed</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Workshop</h3>
              <p className="text-xl font-bold">{workshopData.title}</p>
              <p className="text-sm opacity-80">by {workshopData.instructor}</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Duration</h3>
              <p className="text-2xl font-bold">{workshopData.duration}</p>
              <p className="text-sm opacity-80">{workshopData.level} Level</p>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Starts</h3>
              <p className="text-lg font-bold">{workshopData.startDate}</p>
              <p className="text-sm opacity-80">{workshopData.startTime}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['overview', 'materials', 'preparation'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Workshop Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Title:</span>
                      <span className="text-gray-800">{workshopData.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Instructor:</span>
                      <span className="text-gray-800">{workshopData.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Duration:</span>
                      <span className="text-gray-800">{workshopData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Level:</span>
                      <span className="text-gray-800">{workshopData.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Location:</span>
                      <span className="text-gray-800">{workshopData.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Your Registration</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Name:</span>
                      <span className="text-gray-800">{userDetails.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Email:</span>
                      <span className="text-gray-800">{userDetails.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Phone:</span>
                      <span className="text-gray-800">{userDetails.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Organization:</span>
                      <span className="text-gray-800">{userDetails.organization}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Join Workshop (Zoom Link)
                    </button>
                    <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                      Download Certificate
                    </button>
                    <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                      Contact Instructor
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="max-w-4xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Workshop Schedule - Day 1</h3>
                <div className="space-y-4">
                  {workshopData.schedule.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      item.type === 'session' ? 'border-blue-500 bg-blue-50' :
                      item.type === 'break' ? 'border-green-500 bg-green-50' :
                      'border-purple-500 bg-purple-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">{item.topic}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.time}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.type === 'session' ? 'bg-blue-100 text-blue-800' :
                          item.type === 'break' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {item.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> All times are in your local timezone. Day 2 schedule will be available after Day 1 completion.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="max-w-4xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Workshop Materials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workshopData.materials.map((material, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {material.type === 'PDF' ? '📄' : material.type === 'ZIP' ? '📦' : '🔗'}
                        </div>
                        <span className="text-xs text-gray-500">{material.size}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{material.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{material.type} File</p>
                      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Additional Resources</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Pre-workshop setup guide will be emailed 48 hours before the workshop</li>
                    <li>• All materials will be available for download 30 days after the workshop</li>
                    <li>• Code repositories will be shared during the workshop</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'preparation' && (
              <div className="max-w-4xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Workshop Preparation</h3>
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 mb-3">✅ System Requirements</h4>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li>• Computer with stable internet connection</li>
                      <li>• Node.js 16+ installed</li>
                      <li>• Visual Studio Code or preferred code editor</li>
                      <li>• Chrome or Firefox browser</li>
                      <li>• Zoom client installed</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">📚 Pre-Workshop Learning</h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• Review React basics (components, props, state)</li>
                      <li>• Familiarize yourself with ES6+ features</li>
                      <li>• Complete the pre-workshop quiz (optional)</li>
                      <li>• Read the recommended articles (links in materials)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Important Notes</h4>
                    <ul className="text-sm text-yellow-700 space-y-2">
                      <li>• Workshop will be recorded for registered participants</li>
                      <li>• Please test your audio/video setup beforehand</li>
                      <li>• Have a backup internet connection if possible</li>
                      <li>• Keep your workspace quiet and distraction-free</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h4 className="font-semibold text-purple-800 mb-3">🎯 Learning Objectives</h4>
                    <ul className="text-sm text-purple-700 space-y-2">
                      <li>• Master advanced React hooks and custom hooks</li>
                      <li>• Implement efficient state management patterns</li>
                      <li>• Optimize React application performance</li>
                      <li>• Build reusable and maintainable components</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component to show the workshop dashboard with sample data
const WorkshopDashboardDemo = () => {
  const sampleUserDetails = {
    fullName: 'Boss',
    email: 'Boss@gmail.com',
    phone: '+91 1234569875',
    organization: 'E-groots'
  };

  const handleLogout = () => {
    alert('Logout clicked! In a real app, this would redirect to login.');
  };

  return <WorkshopDashboard userDetails={sampleUserDetails} onLogout={handleLogout} />;
};

export default WorkshopDashboardDemo;