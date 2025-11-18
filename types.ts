// Fix: Add React import to resolve "Cannot find namespace 'React'" error.
import React from 'react';

export interface User {
  _id: string;
  name: string;
  email: string;
  age?: number;
  phone?: string;
  gender?: 'Male' | 'Female' | 'Other';
  address?: string;
  role: 'user' | 'admin';
  token: string;
}

export enum AppointmentType {
  HOME_VISIT = 'Home Visit',
  CLINIC_VISIT = 'Clinic Visit',
}

export enum AppointmentStatus {
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface Appointment {
  _id: string;
  user: string; // Will be user ID
  service: string;
  type: AppointmentType;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  address?: string; // For home visits
  status: AppointmentStatus;
  doctorArrivalDelay?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  iconName: string; // e.g., "SportsIcon"
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}


// For Admin Dashboard
// Fix: Correctly extend Appointment by omitting the original 'user' property before redefining it.
export interface AppointmentWithUser extends Omit<Appointment, 'user'> {
    user: {
        _id: string;
        name: string;
        email: string;
    }
}