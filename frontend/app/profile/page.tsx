"use client";
import React from 'react';

export default function ProfilePage() {
  return (
    <div className="p-8 min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600 border-4 border-white shadow-lg">
            UN
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">User Name</h1>
            <p className="text-gray-500 mb-4">Member since Jan 2026</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">📚 Explorer</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">⭐ Reviewer</span>
            </div>
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
                <div className="text-center">
                    <span className="block text-xl font-bold text-gray-900">12</span>
                    <span className="text-xs text-gray-500 uppercase">Books Read</span>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                    <span className="block text-xl font-bold text-gray-900">2</span>
                    <span className="text-xs text-gray-500 uppercase">Current Loans</span>
                </div>
                 <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                    <span className="block text-xl font-bold text-gray-900">450</span>
                    <span className="text-xs text-gray-500 uppercase">Points</span>
                </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Current Loans */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Current Loans</h2>
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                    <div>
                        <h4 className="font-bold text-gray-900">The Design of Everyday Things</h4>
                        <p className="text-sm text-gray-500">Don Norman</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-sm text-red-500 font-medium">Due in 3 days</p>
                    <button className="text-indigo-600 text-sm hover:underline mt-1">Renew</button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}