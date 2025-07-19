import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const WorkshopDashboard = () => {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userDetails, setUserDetails] = useState(null);
  const [workshopData, setWorkshopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndWorkshop = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('No user logged in.');
        setLoading(false);
        return;
      }
      try {
        // Fetch user details
        const userRes = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserDetails(userRes.data);
        // Fetch latest paid event for user
        try {
          const eventRes = await axios.get(`http://localhost:5000/api/event-payment/user/${userId}`);
          setWorkshopData(eventRes.data.eventId);
        } catch (eventErr) {
          if (eventErr.response && eventErr.response.status === 404) {
            setWorkshopData(null); // No payment found, treat as not registered
          } else {
            setError('Failed to fetch user or event details.');
          }
        }
      } catch {
        setError('Failed to fetch user or event details.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndWorkshop();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">{error}</div>;
  }
  if (!userDetails || !workshopData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">
        <div className="mb-8 text-3xl font-bold">Welcome to Egroots Events!</div>
        <div className="mb-4 text-lg">You have not registered for any workshop yet.</div>
        <button
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition-colors"
          onClick={() => nav('/selection')}
        >
          Go to Workshop Selection
        </button>
      </div>
    );
  }

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
              <p className="text-sm opacity-80">{workshopData.category ? `Category: ${workshopData.category}` : ''}</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Duration</h3>
              <p className="text-2xl font-bold">{workshopData.duration}</p>
              <p className="text-sm opacity-80">{workshopData.level ? `${workshopData.level} Level` : ''}</p>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Price</h3>
              <p className="text-lg font-bold">{workshopData.price ? `${workshopData.price}` : 'N/A'}</p>
              <p className="text-sm opacity-80">{workshopData.participants ? `${workshopData.participants} Participants` : ''}</p>
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
                      <span className="font-medium text-gray-600">Category:</span>
                      <span className="text-gray-800">{workshopData.category || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Description: </span>
                      <span className="text-gray-800">{workshopData.description || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Duration:</span>
                      <span className="text-gray-800">{workshopData.duration || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Level:</span>
                      <span className="text-gray-800">{workshopData.level || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Price:</span>
                      <span className="text-gray-800">{workshopData.price ? `${workshopData.price}` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Participants:</span>
                      <span className="text-gray-800">{workshopData.participants || 'N/A'}</span>
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
            {/* Hide schedule and materials tabs since not in backend */}
            {activeTab === 'materials' && (
              <div className="max-w-4xl text-center text-gray-600 py-10">No materials available for this workshop.</div>
            )}
            {activeTab === 'preparation' && (
              <div className="max-w-4xl text-center text-gray-600 py-10">Preparation details will be shared soon.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDashboard;