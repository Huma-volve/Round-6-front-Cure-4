import BackButton from "@/logicalComponents/BackButton";
import { useNavigate } from "react-router-dom";
import HeartsImage from "../../assets/Group 7.png";
import { useGetFavorites } from "@/hooks/FavoriteHooks/useFavorite";
import { useState } from "react";
import DoctorImage from "../../assets/doctor.jpg";
import { Heart, StarIcon } from "lucide-react";
import { useDeleteFavorite } from "@/hooks/FavoriteHooks/useDeleteFavorite";

export default function FavoritePage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetFavorites();
  const { mutate } = useDeleteFavorite();
  const [active, setActive] = useState<"doctors" | "hospitals">("doctors");

  console.log(data?.data?.favorites?.length);
  function handleRemoveFavorite(doctorID: number) {
    mutate(doctorID);
    // setIsFavorite(!isFavourite);
    console.log(doctorID);
  }
  const isFavorite = (doctorID: number) =>
    data?.data?.favorites?.some((doc) => doc.id === doctorID);
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
      {data?.data?.favorites?.length === 0 ? (
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
            <div className="mt-10 flex flex-col gap-8 lg:flex-row">
              {data?.data?.favorites?.map((doctor) => (
                <div
                  key={doctor.id}
                  className="relative flex gap-5 lg:w-1/2  border-2 border-[#BBC1C7] rounded-3xl"
                >
                  <img
                    src={DoctorImage}
                    alt="doctor-image"
                    className="sm:w-33 sm:h-33 w-30 h-30 rounded-3xl"
                  />
                  <button
                    onClick={() => handleRemoveFavorite(doctor.id)}
                    className="absolute md:top-12 right-5 top-12  bg-white p-2 rounded-full shadow-md"
                  >
                    <Heart
                      size={22}
                      className={
                        isFavorite(doctor.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }
                    />
                  </button>
                  <div className="flex flex-col md:gap-3 gap-1 justify-center">
                    <h3 className="text-xl font-semibold">
                      {doctor.user.name}
                    </h3>
                    <p className="text-xl text-[#6D7379]">
                      {doctor.specialty} | {doctor.consultation}
                    </p>

                    <div className="flex gap-2 items-center">
                      <StarIcon className="text-lg text-yellow-500  fill-yellow-500 " />
                      <p className="md:text-lg text-lg ">
                        {doctor.average_rating} | {doctor.session_price} EGP
                      </p>
                    </div>
                    {/* <div className="flex gap-2 items-center">
                      <Clock10Icon className="text-xl " />
                      <p className="md:text-xl text-lg ">
                        {doctor.startDate} am - {doctor.endDate} pm
                      </p>
                    </div> */}
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
