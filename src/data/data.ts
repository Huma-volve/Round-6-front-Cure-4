// doctors.ts

// Import doctor images
import doctorImage1 from "../assets/images/Rectangle 1673 (3).svg";
import doctorImage2 from "../assets/images/Rectangle 1673.svg";
import doctorImage3 from "../assets/images/Rectangle 1673 (2).svg";
import doctorImage4 from "../assets/images/Rectangle 1673 (1).svg";

// Import specialty icons
import dentistIcon from "../assets/icons/Vector (1).svg";
import cardiologistIcon from "../assets/icons/Vector (2).svg";
import ophthalmologistIcon from "../assets/icons/Vector (3).svg";
import neurologistIcon from "../assets/icons/Vector (4).svg";
import generalPractitionerIcon from "../assets/icons/Vector (5).svg";
import ophthalmologist2Icon from "../assets/icons/Vector (6).svg";
import pulmonologistIcon from "../assets/icons/Vector (7).svg";
import orthopedicIcon from "../assets/icons/Vector8.svg";
import gastroenterologistIcon from "../assets/icons/elements.svg";
import oncologistIcon from "../assets/icons/elements (1).svg";
import endocrinologistIcon from "../assets/icons/elements.svg";
import psychiatristIcon from "../assets/icons/elements.svg";

// ---------------- Types ----------------
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  price: string;
  date: string;
  like?: number;
}

export interface Specialty {
  id: number;
  name: string;
  image: string;
}

// ---------------- Data ----------------
export const topRatedDoctors: Doctor[] = [
  {
    id: 1,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage1,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 2,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage2,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 3,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage3,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 4,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage4,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 5,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage4,
    price: "$300",
    date: "9:30am-8:00pm",
  },
];

export const ListDoctor: Doctor[] = [
  {
    id: 1,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage1,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 2,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage2,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 3,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage3,
    price: "$300",
    date: "9:30am-8:00pm",
    like: 1,
  },
  {
    id: 4,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage4,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 5,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage1,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 6,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage2,
    price: "$300",
    date: "9:30am-8:00pm",
    like: 1,
  },
  {
    id: 7,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage3,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 8,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage4,
    price: "$300",
    date: "9:30am-8:00pm",
  },
  {
    id: 9,
    name: "Robert Johnson",
    specialty: "Orthopedic | El-Nasr Hospital",
    rating: 4.8,
    image: doctorImage4,
    price: "$300",
    date: "9:30am-8:00pm",
  },
];

export const specialt: Specialty[] = [
  { id: 1, name: "Dentist", image: dentistIcon },
  { id: 2, name: "Cardiologist", image: cardiologistIcon },
  { id: 3, name: "Ophthalmologist", image: ophthalmologistIcon },
  { id: 4, name: "Neurologist", image: neurologistIcon },
  { id: 5, name: "General_Practitioner", image: generalPractitionerIcon },
  { id: 6, name: "Ophthalmologist", image: ophthalmologist2Icon },
  { id: 7, name: "Pulmonologist", image: pulmonologistIcon },
  { id: 8, name: "Orthopedic", image: orthopedicIcon },
  { id: 9, name: "Gastroenterologist", image: gastroenterologistIcon },
  { id: 10, name: "Oncologist", image: oncologistIcon },
  { id: 11, name: "Endocrinologist", image: endocrinologistIcon },
  { id: 12, name: "Psychiatrist", image: psychiatristIcon },
];
