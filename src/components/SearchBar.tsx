import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex-1 flex items-center border-r border-gray-200">
          <Search className="h-5 w-5 text-gray-400 ml-4" />
          <input
            type="text"
            placeholder="Search doctors, specialties..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 focus:outline-none"
          />
        </div>
        <div className="hidden md:flex items-center px-4 bg-gray-50">
          <MapPin className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            className="w-40 px-2 py-3 bg-transparent focus:outline-none"
          />
        </div>
        <button className="px-6 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200">
          Search
        </button>
      </div>
    </div>
  );
}