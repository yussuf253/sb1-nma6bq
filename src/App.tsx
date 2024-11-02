import React, { useState, useMemo } from 'react';
import { Stethoscope, Heart, Calendar, Users, ChevronDown } from 'lucide-react';
import { doctors } from './data';
import { AppointmentFilters } from './types';
import SearchBar from './components/SearchBar';
import DoctorCard from './components/DoctorCard';
import Filters from './components/Filters';
import StatsBar from './components/StatsBar';
import PopularSpecialties from './components/PopularSpecialties';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<AppointmentFilters>({
    specialty: 'all',
    date: null,
    insurance: 'all',
    price: 'all',
    availability: 'all'
  });
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);

  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = filters.specialty === 'all' || doctor.specialty === filters.specialty;
      const matchesInsurance = filters.insurance === 'all' || doctor.insurance.includes(filters.insurance);
      
      return matchesSearch && matchesSpecialty && matchesInsurance;
    });

    if (filters.price !== 'all') {
      filtered.sort((a, b) => {
        return filters.price === 'asc' 
          ? a.consultationFee - b.consultationFee
          : b.consultationFee - a.consultationFee;
      });
    }

    return filtered;
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                DocFinder
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Appointments
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                My Health
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                For Doctors
              </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Your Health, Your Choice</h2>
            <p className="text-xl text-blue-100 mb-8">
              Find and book appointments with top-rated doctors in your area, instantly.
            </p>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <StatsBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Specialties */}
        <PopularSpecialties
          selectedSpecialty={filters.specialty}
          onSpecialtySelect={(specialty) => setFilters({ ...filters, specialty })}
          showAll={showAllSpecialties}
        />
        
        <button
          onClick={() => setShowAllSpecialties(!showAllSpecialties)}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4 mx-auto"
        >
          {showAllSpecialties ? 'Show Less' : 'Show All Specialties'}
          <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${showAllSpecialties ? 'rotate-180' : ''}`} />
        </button>

        {/* Filters */}
        <div className="mt-8">
          <Filters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Results */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {filteredDoctors.length} doctors available
            </h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                className="text-sm border-0 bg-transparent text-gray-700 font-medium focus:ring-0"
                value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value as 'all' | 'asc' | 'desc' })}
              >
                <option value="all">Relevance</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any doctors matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => setFilters({
                    specialty: 'all',
                    date: null,
                    insurance: 'all',
                    price: 'all',
                    availability: 'all'
                  })}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Stethoscope className="h-6 w-6 text-blue-600" />
                <h3 className="ml-2 text-lg font-bold">DocFinder</h3>
              </div>
              <p className="mt-4 text-gray-600">Making healthcare accessible to everyone.</p>
              <div className="mt-6 space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Patients</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Find Doctors</a></li>
                <li><a href="#" className="hover:text-blue-600">Video Consultation</a></li>
                <li><a href="#" className="hover:text-blue-600">Health Blog</a></li>
                <li><a href="#" className="hover:text-blue-600">Patient Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Doctors</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Join as a Doctor</a></li>
                <li><a href="#" className="hover:text-blue-600">Doctor Dashboard</a></li>
                <li><a href="#" className="hover:text-blue-600">Resources</a></li>
                <li><a href="#" className="hover:text-blue-600">Practice Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact & Legal</h3>
              <ul className="space-y-3 text-gray-600">
                <li>support@docfinder.com</li>
                <li>1-800-DOCTORS</li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8">
            <p className="text-center text-gray-500">
              © 2024 DocFinder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;