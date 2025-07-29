import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const WorkshopEvents = () => {
  const [workshopsData, setWorkshopsData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const nav = useNavigate();

  // ✅ Fetch courses from backend on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/getevents")  // adjust URL if needed
      .then(res => res.json())
      .then(data => {
        setWorkshopsData(data);
        setFiltered(data); // initialize filter view
      })
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') setFiltered(workshopsData);
    else setFiltered(workshopsData.filter(w => w.category === category));
  };

  const handleConfirm = (workshop) => {
    nav("/payment", { state: { amount: workshop.price, eventId: workshop._id, workshop: workshop } });
    console.log(workshop);
    setSelectedWorkshop(null);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen p-5 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-white mb-10">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Workshop Events</h1>
          <p className="text-lg opacity-90">Choose the perfect workshop for your learning journey</p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 mb-10">
          {['all', 'technical', 'design', 'business', 'creative'].map(cat => (
            <button
              key={cat}
              className={`px-6 py-3 rounded-full font-semibold backdrop-blur text-white border-2 transition ${selectedCategory === cat ? 'bg-white/30 border-white/60' : 'bg-white/20 border-white/30'} hover:bg-white/30`}
              onClick={() => handleFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(workshop => (
            <div key={workshop._id} className={`bg-white rounded-2xl shadow-lg p-6 transition duration-300 hover:-translate-y-2 ${selectedWorkshop?.id === workshop.id ? 'border-4 border-blue-400' : ''}`}>
              <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-xl p-4 mb-4">
                <div className="text-sm opacity-90">{workshop.category}</div>
                <div className="text-xl font-bold">{workshop.title}</div>
              </div>
              <p className="text-gray-700 mb-4">{workshop.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>📅 {workshop.duration}</span>
                <span>👥 {workshop.participants}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>📊 {workshop.level}</span>
                <span className="text-lg font-bold text-blue-500">₹{workshop.price}</span>
              </div>
              <button onClick={() => handleConfirm(workshop)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">Proceed Payment</button>
            </div>
          ))}
        </div>

        {/* Remove the Confirm Selection modal entirely */}
      </div>
    </div>
  );
};

export default WorkshopEvents;
