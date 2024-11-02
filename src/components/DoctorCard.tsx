import React, { useState } from 'react';
import { Star, MapPin, Clock, GraduationCap, Languages, Shield, DollarSign, Video, BadgeCheck } from 'lucide-react';
import { Doctor } from '../types';
import AppointmentModal from './AppointmentModal';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Doctor Info */}
            <div className="md:w-1/4">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-xl mx-auto md:mx-0 object-cover"
                />
                {doctor.verified && (
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-1 rounded-full">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                )}
              </div>
              {doctor.videoConsultation && (
                <div className="mt-4 flex items-center justify-center md:justify-start text-blue-600">
                  <Video className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Video consultation</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:w-3/4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                    {doctor.verified && (
                      <BadgeCheck className="h-5 w-5 text-blue-600 ml-2" />
                    )}
                  </div>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-600">{doctor.experience} years experience</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    <DollarSign className="inline h-5 w-5 text-gray-500" />
                    ${doctor.consultationFee}
                  </p>
                  <p className="text-sm text-gray-500">per visit</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{doctor.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Next available: {new Date(doctor.nextAvailable).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Shield className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{doctor.insurance.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Languages className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{doctor.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-t gap-4">
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{doctor.education}</span>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  {doctor.videoConsultation && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Video className="inline-block h-4 w-4 mr-2" />
                      Video Consult
                    </button>
                  )}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Book Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={doctor}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    </>
  );
}