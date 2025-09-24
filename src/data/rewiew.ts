import reviewer1Avatar from "../assets/images/reviewer1-avatar.png";
import reviewer2Avatar from "../assets/images/reviewer2-avatar.png";
import reviewer3Avatar from "../assets/images/reviewer3-avatar.png";
import reviewer4Avatar from "../assets/images/reviewer4-avatar.png";
import reviewer5Avatar from "../assets/images/reviewer5-avatar.png";

// -------- Types --------
export interface Review {
  id: number;
  name: string;
  avatar: string;
  review: string;
}

// -------- Data --------
export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Ahmed",
    avatar: reviewer1Avatar,
    review: "Excellent service! Professional team and amazing experience.",
  },
  {
    id: 2,
    name: "Sara",
    avatar: reviewer2Avatar,
    review: "I really loved dealing with them, easy and fast.",
  },
  {
    id: 3,
    name: "Mohamed",
    avatar: reviewer3Avatar,
    review: "I recommend everyone to deal with you, wonderful experience!",
  },
  {
    id: 4,
    name: "Medhat",
    avatar: reviewer4Avatar,
    review: "Technical support is amazing and very responsive.",
  },
  {
    id: 5,
    name: "Omar",
    avatar: reviewer5Avatar,
    review: "The best website I've dealt with in a long time.",
  },
];
