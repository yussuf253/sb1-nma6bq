import React from 'react';
import { Calendar, DollarSign, Shield } from 'lucide-react';
import { AppointmentFilters, Specialty } from '../types';

interface FiltersProps {
  filters: AppointmentFilters;
  onFilterChange: (filters: AppointmentFilters) => void;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const specialties: (Specialty | 'all')[] = ['all', 'Cardiology', 'Dermatology', 'Family Medicine', 'Neurology', 'Pediatrics', 'Psychiatry'];
  const insuranceProviders = ['all', 'Blue Cross', 'Aetna', 'UnitedHealth', 'Cigna', 'Medicare', 'Humana'];

  const handleFilterChange = (key: keyof AppointmentFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Specialty</h3>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => handleFilterChange('specialty', specialty)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                filters.specialty === specialty
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {specialty === 'all' ? 'All Specialties' : specialty}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Availability
          </h3>
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="all">Any time</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This week</option>
          </select>
        </div>

        <div>
          <h3 className="font-semibold mb-3 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Insurance
          </h3>
          <select
            value={filters.insurance}
            onChange={(e) => handleFilterChange('insurance', e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {insuranceProviders.map((provider) => (
              <option key={provider} value={provider}>
                {provider === 'all' ? 'All Insurance' : provider}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-semibold mb-3 flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Price
          </h3>
          <select
            value={filters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="all">Any price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}