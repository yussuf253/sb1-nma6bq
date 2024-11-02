import React from 'react';
import { Users, Star, Calendar, Award } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      value: '10M+',
      label: 'Patients Served'
    },
    {
      icon: <Star className="h-6 w-6 text-blue-600" />,
      value: '4.9/5',
      label: 'Patient Satisfaction'
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      value: '500K+',
      label: 'Appointments'
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      value: '15K+',
      label: 'Verified Doctors'
    }
  ];

  return (
    <div className="bg-white shadow-sm border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}