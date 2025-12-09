export type BookingsResponse = {
  success: boolean;
  status: number;
  message: string;
  data: BookingsData;
};

export type BookingsData = {
  data: Booking[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type Booking = {
  id: number;
  date_time: string;
  date_time_formatted: string;
  status: string;
  status_label: string;
  payment_method: string;
  price: number;

  can_cancel: boolean;
  can_reschedule: boolean;

  created_at: string;
  updated_at: string;
  doctor: Doctor;
  patient: Patient;
};
export type Doctor = {
  id: number;
  specialty: string;
  license_number: string;
  clinic_address: string;

  location: {
    lat: number;
    lng: number;
  };

  session_price: number;
  average_rating: number;
  reviews_count: number;

  availability: Record<string, Record<string, string>>;

  consultation: string;

  user: DoctorUser;
};
export type DoctorUser = {
  id: number;
  name: string;
  email: string | null;
  mobile: string | null;
  profile_photo: string | null;
  gender: string | null;
};
export type Patient = {
  id: number;
  gender: string | null;
  birthdate: string | null;
  medical_notes: string | null;
  user: PatientUser;
};
export type PatientUser = {
  name: string;
  email: string;
  mobile: string;
  profile_photo: string | null;
};
export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PageLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PageLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}
