import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

const workshopsData = [
  {
    id: 1,
    title: 'Advanced JavaScript Mastery',
    category: 'technical',
    description: 'Deep dive into modern JavaScript concepts, ES6+, async programming, and advanced patterns used in production applications.',
    duration: '3 days',
    price: '$299',
    level: 'Advanced',
    participants: 'Max 20'
  }
//   {
//     id: 2,
//     title: 'UI/UX Design Fundamentals',
//     category: 'design',
//     description: 'Learn the principles of user interface and user experience design, including wireframing, prototyping, and usability testing.',
//     duration: '2 days',
//     price: '$199',
//     level: 'Beginner',
//     participants: 'Max 15'
//   },
//   {
//     id: 3,
//     title: 'Digital Marketing Strategy',
//     category: 'business',
//     description: 'Master modern digital marketing techniques, social media strategy, content marketing, and analytics to grow your business.',
//     duration: '2 days',
//     price: '$249',
//     level: 'Intermediate',
//     participants: 'Max 25'
//   },
//   {
//     id: 4,
//     title: 'Creative Writing Workshop',
//     category: 'creative',
//     description: 'Unlock your creative potential with exercises in storytelling, character development, and narrative techniques.',
//     duration: '1 day',
//     price: '$99',
//     level: 'All Levels',
//     participants: 'Max 12'
//   },
//   {
//     id: 5,
//     title: 'Python for Data Science',
//     category: 'technical',
//     description: 'Learn Python programming specifically for data analysis, machine learning, and data visualization using pandas, numpy, and matplotlib.',
//     duration: '4 days',
//     price: '$399',
//     level: 'Intermediate',
//     participants: 'Max 18'
//   },
//   {
//     id: 6,
//     title: 'Brand Identity Design',
//     category: 'design',
//     description: 'Create compelling brand identities from concept to completion, including logo design, color theory, and brand guidelines.',
//     duration: '3 days',
//     price: '$279',
//     level: 'Intermediate',
//     participants: 'Max 16'
//   }
];

const WorkshopEvents = () => {
  const [filtered, setFiltered] = useState(workshopsData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const nav = useNavigate();

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') setFiltered(workshopsData);
    else setFiltered(workshopsData.filter(w => w.category === category));
  };

  const handleSelect = (workshop) => {
    setSelectedWorkshop(workshop);
  };

  const handleConfirm = () => {
    nav("/payment");
    // alert(`You've selected "${selectedWorkshop.title}". Confirmation will be sent to your email.`);
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
            <div key={workshop.id} className={`bg-white rounded-2xl shadow-lg p-6 transition duration-300 hover:-translate-y-2 ${selectedWorkshop?.id === workshop.id ? 'border-4 border-blue-400' : ''}`}>
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
                <span className="text-lg font-bold text-blue-500">{workshop.price}</span>
              </div>
              <button onClick={() => handleSelect(workshop)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">Proceed Payment</button>
            </div>
          ))}
        </div>

        {selectedWorkshop && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
              <h2 className="text-2xl font-bold text-blue-500 mb-4">Confirm Selection</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to select "{selectedWorkshop.title}" for {selectedWorkshop.price}?</p>
              <div className="flex justify-center gap-4">
                <button onClick={handleConfirm}  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow">Confirm</button>
                <button onClick={() => setSelectedWorkshop(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:shadow">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkshopEvents;