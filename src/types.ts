export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  image: string;
  rating: number;
  experience: number;
  location: string;
  consultationFee: number;
  nextAvailable: string;
  availableSlots: TimeSlot[];
  education: string;
  languages: string[];
  insurance: string[];
  verified: boolean;
  videoConsultation: boolean;
}

export type Specialty = 'Cardiology' | 'Dermatology' | 'Family Medicine' | 'Neurology' | 'Pediatrics' | 'Psychiatry' | 'Ophthalmology' | 'Orthopedics';

export interface TimeSlot {
  date: string;
  slots: string[];
}

export interface AppointmentFilters {
  specialty: Specialty | 'all';
  date: string | null;
  insurance: string | 'all';
  price: 'all' | 'asc' | 'desc';
  availability: 'all' | 'today' | 'tomorrow' | 'this-week';
}