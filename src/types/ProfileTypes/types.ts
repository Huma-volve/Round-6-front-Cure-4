export type PrivacyPolicyResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    type: string;
    title: string;
    content: string;
  };
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  order: number;
  status: string;
  created_at: string;
  updated_at: string;
};
export type FAQsResponse = {
  success: boolean;
  message: string;
  data: FAQ[];
};
export type Card = {
  id: number;
  stripe_pm_id: string;
  user_id: number;
  card_holder_name: string;
  last_four: number;
  brand: string;
  exp_month: number;
  exp_year: number;
  created_at: string;
  updated_at: string;
};
export type AllCardsResponse = {
  success: boolean;
  message: string;
  data: Card[];
};

export type NewCardRequest = {
  card_token: string;
  holder_name: string;
  exp_month: string;
  number: string;
};
export type NewCardResponse = {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    card_holder_name: string;
    stripe_pm_id: string;
    brand: string;
    last_four: string;
    exp_month: number;
    exp_year: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
};
export type DeleteCardResponse = {
  success: boolean;
  message: string;
};
export type ProfileResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      avatar: string;
      created_at: string;
      updated_at: string;
    };
  };
};
export type EditProfileRequestData = {
  name: string;
  phone: string;
  birthdate: string;
  avatar: File | null;
};
export type EditProfileResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      created_at: string;
      updated_at: string;
    };
  };
};
export type LogoutResponse = { message: string };
export type DeleteResponse = { message: string };
export type Doctor = {
  doctor_profile_id: number;
  about: string;
  experience_years: number;
  price_per_hour: string;
  specialty_description: string;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  specialist_id: number;
  hospital_id: number;
  hospital_name: string;
  hospital_city: string;
  hospital_start_time: string;
  hospital_end_time: string;
  availability_id: number;
  day: string;
  start_time: string;
  end_time: string;
  average_rating: string;
  reviews_count: number;
  specialty_name_ar: string;
  specialty_name_en: string;
  created_at: string;
  updated_at: string;
};

export type FavoriteResponse = {
  success: boolean;
  message: string;
  data: Doctor[];
};
export type AddFavoriteResponse = {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    favouritable_type: string;
    favouritable_id: number;
    updated_at: string;
    created_at: string;
    id: string;
  };
};
export type DeleteFavoriteResponse = {
  success: boolean;
  message: string;
};
export type Appointments = {
  id: number;
  user_id: number;
  doctor_id: number;
  date: string;
  time: string;
  status: string;
  is_paid: number;
  payment_reference: null;
  created_at: string;
  updated_at: string;
  doctor: {
    id: number;
    name: string;
    profile_image: null;
    phone: string;
    email: string;
    specialist_id: number;
    bio: string;
    available_slots: [];
    status: boolean;
    created_at: string;
    updated_at: string;
  };
};
export type BookingsResponse = {
  filter: string;
  appointments: Appointments[];
};
