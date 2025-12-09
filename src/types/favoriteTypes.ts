export type FavoriteDoctor = {
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
  // example:
  // { monday: { "09:00": "17:00" }, ... }

  consultation: string;

  user: Doctor;
};
export type Doctor = {
  id: number;
  name: string;
  email: string | null;
  mobile: string | null;
  profile_photo: string | null;
  gender: string | null;
};
export type FavoriteResponse = {
  success: boolean;
  message: string;
  data: { favorites: FavoriteDoctor[] };
  errors: null | string;
};
export type AddFavoriteResponse = {
  success: boolean;
  message: string;
  data: {
    status: string;
    message: string;
    doctor_id: number;
  };
  error: null | string;
};
export type DeleteFavoriteResponse = {
  success: boolean;
  message: string;
  data: {
    status: string;
    message: string;
    doctor_id: number;
  };
  error: null | string;
};
