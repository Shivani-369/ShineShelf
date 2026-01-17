"use client";
import React, { useState } from 'react';

// Mock Data
const BOOKS = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", rating: 4.8, available: true, cover: "bg-amber-100" },
  { id: 2, title: "Project Hail Mary", author: "Andy Weir", category: "Sci-Fi", rating: 4.9, available: false, cover: "bg-blue-100" },
  { id: 3, title: "Atomic Habits", author: "James Clear", category: "Self-Help", rating: 4.7, available: true, cover: "bg-emerald-100" },
  { id: 4, title: "Dune", author: "Frank Herbert", category: "Sci-Fi", rating: 4.8, available: true, cover: "bg-orange-100" },
  { id: 5, title: "Educated", author: "Tara Westover", category: "Biography", rating: 4.6, available: true, cover: "bg-stone-100" },
  { id: 6, title: "1984", author: "George Orwell", category: "Classic", rating: 4.9, available: true, cover: "bg-red-100" },
];

const CATEGORIES = ["All", "Classic", "Sci-Fi", "Self-Help", "Biography"];

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                          book.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Books Catalogue</h1>
          <p className="text-gray-500 mt-1">Explore our vast collection of knowledge.</p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search books..." 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            {/* Book Cover Placeholder */}
            <div className={`h-48 ${book.cover} w-full flex items-center justify-center relative`}>
              <span className="text-4xl opacity-20">📖</span>
              {!book.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold px-3 py-1 bg-red-500/80 rounded-full text-sm backdrop-blur-sm">
                    Checked Out
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  {book.category}
                </span>
                <div className="flex items-center text-amber-500 text-sm font-bold">
                  <span>★</span>
                  <span className="ml-1">{book.rating}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{book.author}</p>
              
              <button 
                disabled={!book.available}
                className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                  book.available 
                    ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {book.available ? "Borrow Now" : "Notify Me"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}