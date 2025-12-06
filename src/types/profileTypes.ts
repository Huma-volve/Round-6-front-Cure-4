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
  translations: FAQTranslations;
  created_at: string;
  updated_at: string;
};
export type FAQsResponse = {
  links: PaginationLinks;
  meta: PaginationMeta;
  data: FAQ[];
};
export interface FAQTranslations {
  en: FAQTranslationContent;
  ar: FAQTranslationContent;
}

export interface FAQTranslationContent {
  question: string;
  answer: string;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
  locale: string;
}

export interface MetaLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}
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
  cardholder_name: string;
  card_number: string;
  brand: string;
  exp_month: string;
  exp_year: string;
  cvv: string;
  gateway: string;
  is_default: boolean;
};
export type NewCardResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    provider: string;
    last4: string;
    brand: string;
    exp_month: number;
    exp_year: number;
    gateway: string;
    token: string;
    is_default: boolean;
    updated_at: string;
    created_at: string;
    metadata: {
      card_holder_name: string;
      masked_card: string;
    };
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
    id: number;
    name: string;
    email: string;
    mobile: string;
    birthdate: string;
    gender: string;
    profile_photo: string;
    role: string;
    patient: {
      patient_id: number;
      birthdate: string;
      medical_notes: string;
    };
    created_at: string;
    updated_at: string;
  };
};
export type LogoutResponse = { message: string };
export type DeleteResponse = { message: string };
