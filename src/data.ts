import { Doctor } from './types';

const generateTimeSlots = (startDate: Date): string[] => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${hour}:00`, `${hour}:30`);
  }
  return slots;
};

const generateAvailability = (): { date: string; slots: string[] }[] => {
  const availability = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    availability.push({
      date: date.toISOString().split('T')[0],
      slots: generateTimeSlots(date)
    });
  }
  
  return availability;
};

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    rating: 4.9,
    experience: 12,
    location: 'New York, NY',
    consultationFee: 150,
    nextAvailable: '2024-03-15',
    availableSlots: generateAvailability(),
    education: 'Harvard Medical School',
    languages: ['English', 'Mandarin'],
    insurance: ['Blue Cross', 'Aetna', 'UnitedHealth'],
    verified: true,
    videoConsultation: true
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    rating: 4.8,
    experience: 15,
    location: 'Los Angeles, CA',
    consultationFee: 200,
    nextAvailable: '2024-03-14',
    availableSlots: generateAvailability(),
    education: 'Stanford University',
    languages: ['English', 'Spanish'],
    insurance: ['Cigna', 'Aetna', 'Medicare'],
    verified: true,
    videoConsultation: false
  },
  {
    id: '3',
    name: 'Dr. Maya Patel',
    specialty: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    rating: 4.9,
    experience: 8,
    location: 'Chicago, IL',
    consultationFee: 175,
    nextAvailable: '2024-03-13',
    availableSlots: generateAvailability(),
    education: 'Johns Hopkins University',
    languages: ['English', 'Hindi', 'Gujarati'],
    insurance: ['Blue Cross', 'UnitedHealth', 'Humana'],
    verified: true,
    videoConsultation: true
  }
];