import React from 'react';
import { Heart, Brain, Stethoscope, Baby, Eye, Bone } from 'lucide-react';
import { Specialty } from '../types';

interface PopularSpecialtiesProps {
  selectedSpecialty: Specialty | 'all';
  onSpecialtySelect: (specialty: Specialty | 'all') => void;
  showAll: boolean;
}

const specialtyIcons = {
  Cardiology: Heart,
  Neurology: Brain,
  'Family Medicine': Stethoscope,
  Pediatrics: Baby,
  Ophthalmology: Eye,
  Orthopedics: Bone
};

export default function PopularSpecialties({
  selectedSpecialty,
  onSpecialtySelect,
  showAll
}: PopularSpecialtiesProps) {
  const specialties = Object.keys(specialtyIcons) as Specialty[];
  const displaySpecialties = showAll ? specialties : specialties.slice(0, 4);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Specialties</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displaySpecialties.map((specialty) => {
          const Icon = specialtyIcons[specialty];
          return (
            <button
              key={specialty}
              onClick={() => onSpecialtySelect(specialty)}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                selectedSpecialty === specialty
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <Icon className={`h-6 w-6 mb-2 ${
                  selectedSpecialty === specialty ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <span className={`text-sm font-medium ${
                  selectedSpecialty === specialty ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {specialty}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}