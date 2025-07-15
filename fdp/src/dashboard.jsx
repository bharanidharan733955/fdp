import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Star, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  Share2,
  Bell,
  Menu,
  Home,
  BarChart3,
  UserPlus,
  Settings,
  Mail,
  FileText,
  HelpCircle
} from 'lucide-react';
// Removed recharts import - using custom charts instead

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data - in real app, this would come from API
  const [dashboardData, setDashboardData] = useState({
    totalRegistrations: 30,
    totalViews: 13800,
    ratingsReviews: 0,
    payments: 2178,
    registrationGrowth: 15,
    viewsGrowth: 998,
    paymentsGrowth: 990
  });

  const registrationData = [
    { date: 'Jun 12', total: 2, male: 1, female: 1 },
    { date: 'Jun 13', total: 3, male: 2, female: 1 },
    { date: 'Jun 14', total: 4, male: 2, female: 2 },
    { date: 'Jun 15', total: 8, male: 4, female: 4 },
    { date: 'Jun 16', total: 15, male: 8, female: 7 },
    { date: 'Jun 17', total: 25, male: 13, female: 12 },
    { date: 'Jun 18', total: 30, male: 16, female: 14 }
  ];

  const domainData = [
    { name: 'Management', value: 0, percentage: 0, color: '#8884d8' },
    { name: 'Engineering', value: 28, percentage: 93.3, color: '#1e40af' },
    { name: 'Corporates', value: 0, percentage: 0, color: '#82ca9d' },
    { name: 'Others', value: 2, percentage: 6.7, color: '#ffc658' }
  ];

  const recentRegistrations = [
    { id: 1, name: 'John Doe', email: 'john@example.com', domain: 'Engineering', date: '2024-06-18', amount: 150 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', domain: 'Engineering', date: '2024-06-18', amount: 150 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', domain: 'Engineering', date: '2024-06-17', amount: 150 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', domain: 'Others', date: '2024-06-17', amount: 150 },
    { id: 5, name: 'David Brown', email: 'david@example.com', domain: 'Engineering', date: '2024-06-16', amount: 150 }
  ];

  const StatCard = ({ icon: Icon, title, value, growth, color = "blue" }) => (
    <div className={`bg-white rounded-lg p-6 shadow-sm border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {growth && (
            <p className="text-sm text-green-600 mt-1">+{growth}</p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-center h-16 bg-slate-900">
        <span className="text-white text-xl font-bold">Dashboard</span>
      </div>
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors ${
              currentPage === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage('registrations')}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors ${
              currentPage === 'registrations' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <UserPlus className="w-5 h-5 mr-3" />
            Registrations
          </button>
          <button
            onClick={() => setCurrentPage('analytics')}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors ${
              currentPage === 'analytics' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Analytics
          </button>
          <button
            onClick={() => setCurrentPage('payments')}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors ${
              currentPage === 'payments' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <CreditCard className="w-5 h-5 mr-3" />
            Payments
          </button>
        </div>
      </nav>
    </div>
  );

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hello MOHAN PRASANTH! 👋</h1>
          <p className="text-gray-600">Manage and monitor your opportunity with real-time insights from this dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">X</span>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">in</span>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">W</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Share Opportunity</p>
            <p className="text-xs text-gray-500">on various social media or email</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Share Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Registrations"
          value={dashboardData.totalRegistrations}
          growth={dashboardData.registrationGrowth}
          color="blue"
        />
        <StatCard
          icon={Eye}
          title="Total Views"
          value={`${(dashboardData.totalViews / 1000).toFixed(1)}K`}
          growth={dashboardData.viewsGrowth}
          color="green"
        />
        <StatCard
          icon={Star}
          title="Ratings and Reviews"
          value={dashboardData.ratingsReviews}
          color="yellow"
        />
        <StatCard
          icon={CreditCard}
          title="Payments"
          value={dashboardData.payments}
          growth={dashboardData.paymentsGrowth}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Registration Overview</h3>
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm">Total</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-sm">Male</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
              <span className="text-sm">Female</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 p-4 border rounded bg-gray-50">
            {registrationData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="flex flex-col items-center space-y-1">
                  <div 
                    className="w-full bg-blue-600 rounded-t" 
                    style={{ height: `${(item.total / 30) * 200}px` }}
                    title={`Total: ${item.total}`}
                  ></div>
                  <div 
                    className="w-full bg-blue-400 rounded-t" 
                    style={{ height: `${(item.male / 30) * 150}px` }}
                    title={`Male: ${item.male}`}
                  ></div>
                  <div 
                    className="w-full bg-pink-400 rounded-t" 
                    style={{ height: `${(item.female / 30) * 150}px` }}
                    title={`Female: ${item.female}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 transform -rotate-45">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Domains</h3>
            <div className="space-y-3">
              {domainData.map((domain, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: domain.color }}></div>
                    <span className="text-sm">{domain.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{domain.value}</span>
                    <span className="text-sm text-gray-500 ml-2">{domain.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Updates</h3>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No data available</p>
              <p className="text-gray-400 text-xs mt-1">Updates related to rounds and opportunity will be shown up here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RegistrationsContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Recent Registrations</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {registration.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{registration.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      registration.domain === 'Engineering' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {registration.domain}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{registration.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹{registration.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AnalyticsContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Registration Trends</h3>
          <div className="h-64 flex items-end space-x-2 p-4 border rounded bg-gray-50">
            {registrationData.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div 
                  className="w-full bg-blue-600 rounded-t transition-all duration-300 hover:bg-blue-700" 
                  style={{ height: `${(item.total / 30) * 200}px` }}
                  title={`${item.date}: ${item.total} registrations`}
                ></div>
                <span className="text-xs text-gray-600">{item.date.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Domain Distribution</h3>
          <div className="space-y-4">
            {domainData.map((domain, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{domain.name}</span>
                  <span className="text-sm text-gray-500">{domain.percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${domain.percentage}%`,
                      backgroundColor: domain.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentsContent = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Payment Summary</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">₹{dashboardData.payments.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">+{dashboardData.paymentsGrowth} from last period</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Average Payment</h3>
          <p className="text-3xl font-bold text-blue-600">₹{Math.round(dashboardData.payments / dashboardData.totalRegistrations)}</p>
          <p className="text-sm text-gray-500 mt-1">Per registration</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Payment Rate</h3>
          <p className="text-3xl font-bold text-purple-600">100%</p>
          <p className="text-sm text-gray-500 mt-1">All registrations paid</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRegistrations.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'registrations':
        return <RegistrationsContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'payments':
        return <PaymentsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <h1 className="text-xl font-semibold text-gray-800">Opportunity Dashboard</h1>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">MP</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;