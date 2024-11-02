import React from 'react';
import { Specialty } from '../types';

interface SpecialtyFilterProps {
  selectedSpecialty: Specialty | 'all';
  onSpecialtyChange: (specialty: Specialty | 'all') => void;
}

const specialties: (Specialty | 'all')[] = ['all', 'Cardiology', 'Dermatology', 'Family Medicine', 'Neurology', 'Pediatrics', 'Psychiatry'];

export default function SpecialtyFilter({ selectedSpecialty, onSpecialtyChange }: SpecialtyFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {specialties.map((specialty) => (
        <button
          key={specialty}
          onClick={() => onSpecialtyChange(specialty)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedSpecialty === specialty
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {specialty === 'all' ? 'All Specialties' : specialty}
        </button>
      ))}
    </div>
  );
}