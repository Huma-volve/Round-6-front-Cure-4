import BackButton from "@/logicalComponents/BackButton";
import { useNavigate } from "react-router-dom";
import HeartsImage from "../../assets/Group 7.png";
import { useGetFavorites } from "@/hooks/FavoriteHooks/useFavorite";
import { useState } from "react";
import DoctorImage from "../../assets/doctor.jpg";
import { Clock10Icon, Heart } from "lucide-react";
import { useDeleteFavorite } from "@/hooks/FavoriteHooks/useDeleteFavorite";
export default function FavoritePage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetFavorites();
  const { mutate } = useDeleteFavorite();
  const [active, setActive] = useState<"doctors" | "hospitals">("doctors");

  console.log(data?.data?.length);
  function handleRemoveFavorite(doctorID: number) {
    mutate(doctorID);
    // setIsFavorite(!isFavourite);
    console.log(doctorID);
  }
  const isFavorite = (doctorID: number) =>
    data?.data?.some((doc) => doc.doctor_profile_id === doctorID);
  if (isLoading)
    return (
      <p className="text-red-800 font-semibold align-center text-2xl">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-red-800 font-semibold align-center text-2xl">
        Error loading items
      </p>
    );
  if (!data)
    return (
      <p className="text-red-800 font-semibold align-center text-2xl">
        No data!
      </p>
    );

  return (
    <div className="container mx-auto mt-20">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">Your Favorite</h1>
      </div>
      {data?.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-50">
          <img src={HeartsImage} alt="cards-image" />
          <h3 className="text-2xl font-medium">Your Favorite!</h3>
          <p className="text-xl font-medium text-[#6D7379]">
            Add your favorite to find it easily
          </p>
        </div>
      ) : (
        <>
          <div className="flex w-full gap-5 mt-10">
            <button
              onClick={() => setActive("doctors")}
              className={`w-full text-2xl p-5 ${
                active === "doctors"
                  ? "border-b-3 border-b-[#145DB8] text-[#145DB8]"
                  : "border-b-3"
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => setActive("hospitals")}
              className={`w-full text-2xl p-5 ${
                active === "hospitals"
                  ? "border-b-3 border-b-[#145DB8] text-[#145DB8]"
                  : "border-b-3 "
              }`}
            >
              Hospital
            </button>
          </div>
          {active === "doctors" && (
            <div className="mt-10 flex flex-col gap-10">
              {data?.data?.map((doctor) => (
                <div
                  key={doctor.user_id}
                  className="relative flex gap-5 w-full p-3 border-2 border-[#BBC1C7] rounded-2xl"
                >
                  <img
                    src={DoctorImage}
                    alt="doctor-image"
                    className="md:w-43 md:h-43 w-30 h-30 rounded-2xl"
                  />
                  <button
                    onClick={() => handleRemoveFavorite(doctor.user_id)}
                    className="absolute md:top-18 right-5 top-12  bg-white p-2 rounded-full shadow-md"
                  >
                    <Heart
                      size={22}
                      className={
                        isFavorite(doctor.user_id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }
                    />
                  </button>
                  <div className="flex flex-col md:gap-5 gap-1">
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-xl text-[#6D7379]">
                      {doctor.specialty_name_en} | {doctor.hospital_name}
                    </p>
                    <p className="text-xl text-[#6D7379]">{doctor.phone}</p>
                    <div className="flex gap-2 items-center">
                      <Clock10Icon className="text-xl " />
                      <p className="md:text-xl text-lg ">
                        {doctor.start_time} am - {doctor.end_time} pm
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
