import React from 'react';
import { X } from 'lucide-react';
import { Doctor } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  doctor,
  selectedDate,
  onDateSelect,
}: AppointmentModalProps) {
  if (!isOpen) return null;

  const handleBooking = (slot: string) => {
    if (!selectedDate) return;
    alert(`Appointment booked with ${doctor.name} on ${selectedDate} at ${slot}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Book Appointment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Select Date</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {doctor.availableSlots.map((day) => (
                <button
                  key={day.date}
                  onClick={() => onDateSelect(day.date)}
                  className={`p-2 text-center rounded-lg border ${
                    selectedDate === day.date
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:border-blue-600'
                  }`}
                >
                  <div className="text-sm">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="font-semibold">{new Date(day.date).getDate()}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div>
              <h3 className="font-semibold mb-3">Available Times</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {doctor.availableSlots
                  .find((day) => day.date === selectedDate)
                  ?.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleBooking(slot)}
                      className="p-2 text-center rounded-lg border hover:border-blue-600 hover:text-blue-600"
                    >
                      {slot}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>Consultation Fee: ${doctor.consultationFee}</div>
            <div>Duration: 30 minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
}