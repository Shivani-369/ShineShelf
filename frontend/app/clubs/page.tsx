"use client";
import React from 'react';

const CLUBS = [
  { id: 1, name: "Sci-Fi Enthusiasts", topic: "Science Fiction", members: 120, nextMeeting: "Jan 20, 2026", color: "bg-blue-500" },
  { id: 2, name: "Historical Fiction Lovers", topic: "History", members: 85, nextMeeting: "Jan 22, 2026", color: "bg-amber-600" },
  { id: 3, name: "Tech Talk", topic: "Technology", members: 200, nextMeeting: "Jan 25, 2026", color: "bg-indigo-500" },
  { id: 4, name: "Mystery & Thrillers", topic: "Mystery", members: 150, nextMeeting: "Jan 28, 2026", color: "bg-red-500" },
];

export default function ClubsPage() {
  return (
    <div className="p-8 min-h-screen bg-gray-50/50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Clubs</h1>
        <p className="text-gray-500 mt-1">Join a community of like-minded readers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CLUBS.map(club => (
          <div key={club.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${club.color} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                {club.name[0]}
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1">{club.name}</h3>
            <p className="text-indigo-600 font-medium text-sm mb-4">{club.topic}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-2">👥</span> {club.members} Members
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="mr-2">📅</span> Next: {club.nextMeeting}
              </div>
            </div>

            <button className="w-full py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
              Join Club
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}