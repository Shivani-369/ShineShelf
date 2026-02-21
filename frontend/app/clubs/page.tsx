"use client";
import React, { useState, useEffect } from 'react';

export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/clubs');
      const data = await res.json();
      setClubs(data);
    } catch (err) {
      console.error('Failed to fetch clubs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleJoin = async (clubId: number) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('Please login to join clubs');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/clubs/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clubId, userId: user.id }),
      });
      if (res.ok) {
        alert('Joined club successfully!');
      } else {
        alert('Failed to join club');
      }
    } catch (err) {
      console.error('Join failed', err);
    }
  };
  return (
    <div className="p-8 min-h-screen bg-gray-50/50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Clubs</h1>
        <p className="text-gray-500 mt-1">Join a community of like-minded readers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club: any) => (
          <div key={club.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                {club.name[0]}
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                Active
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">{club.name}</h3>
            <p className="text-indigo-600 font-medium text-sm mb-4">{club.topic}</p>

            <div className="space-y-2 mb-6 text-sm text-gray-500 line-clamp-3">
              {club.description}
            </div>

            <button
              onClick={() => handleJoin(club.id)}
              className="w-full py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Join Club
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}