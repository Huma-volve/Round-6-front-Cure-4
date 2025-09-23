import { Button } from "@/components/ui/button";
import { Clock, Star, Heart } from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

export const DoctorCard = ({ doctor }: { doctor: any }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const doctorImages: Record<number, string> = {
    1: "/doctors/1.jpg",
    2: "/doctors/2.jpg",
    3: "/doctors/3.jpg",
    4: "/doctors/4.jpg",
    5: "/doctors/5.jpg",
    6: "/doctors/6.jpg",
    7: "/doctors/7.jpg",
    8: "/doctors/8.jpg",
    9: "/doctors/9.jpg",
    10: "/doctors/10.jpg",
    11: "/doctors/11.png",
    12: "/doctors/12.jpg",
    13: "/doctors/13.jpg",
    14: "/doctors/14.jpg",
    15: "/doctors/15.jpg",
    16: "/doctors/16.jpg",
    17: "/doctors/17.jpg",
    18: "/doctors/18.jpg",
    19: "/doctors/19.png",
    20: "/doctors/20.jpg",
  };
  const doctorImagesCount = 20;
  function getDoctorImage(userId: number): string {
    const index = (userId % doctorImagesCount) + 1;
    return `/doctors/${index}.jpg`;
  }
  const Favorite = (doctorId: number) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(doctorId)) {
      newFavorites.delete(doctorId);
    } else {
      newFavorites.add(doctorId);
    }
    setFavorites(newFavorites);
  };
  return (
    <div className="relative bg-white rounded-lg p-3 shadow-sm border border-gray-200 w-full">
      <button
        onClick={() => Favorite(doctor.user_id)}
        className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            favorites.has(doctor.user_id)
              ? "fill-red-600 text-red-600"
              : "text-gray-400 hover:text-red-400 cursor-pointer"
          }`}
        />
      </button>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          {doctorImages[doctor.specialty_id] && (
            <img
              src={getDoctorImage(doctor.user_id)}
              alt={doctor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/doctors/1.jpg";
              }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
            {doctor.name}
          </h3>
          <p className="text-gray-500 text-xs mb-2">
            {doctor.specialty_name_en || "General"} | {doctor.hospital_name}
          </p>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-700 font-medium">
                {doctor.average_rating || "4.8"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span>
                {doctor.hospital_start_time} - {doctor.hospital_end_time}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-gray-600 text-xs">Price</span>
          <span className="text-gray-400 text-xs">/hour</span>
        </div>
        <span className="text-red-600 font-semibold text-sm">
          ${doctor.price_per_hour}
        </span>
      </div>

      <Link to="/">
        <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-medium text-sm h-9 cursor-pointer">
          Book appointment
        </Button>
      </Link>
    </div>
  );
};
