import { useGetBookings } from "@/hooks/Bookings/useGetBookings";
import BackButton from "@/logicalComponents/BackButton";
import CalenderBar from "@/logicalComponents/Bookings/CalenderBar";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DoctorImage from "../../assets/doctor.jpg";
import { Calendar, LocationEdit } from "lucide-react";
import { format } from "date-fns";
export default function BookingsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState<
    "all" | "upcomming" | "completed" | "past"
  >("all");
  function handleUpComming() {
    setActive("upcomming");
    searchParams.set("upcoming_only", "true");
    setSearchParams(searchParams);
  }
  function handleCancel() {
    setActive("past");
    searchParams.set("status", "canceled");
    setSearchParams(searchParams);
  }
  function handleCompleted() {
    setActive("completed");
    searchParams.set("status", "completed");
    setSearchParams(searchParams);
  }
  // const filter = searchParams.toString();
  const { data, isLoading, error } = useGetBookings(active);

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
        <h1 className="text-2xl font-medium">Your Appointments</h1>
      </div>
      <div className="flex gap-5 mt-10">
        <button
          onClick={() => setActive("all")}
          className={` text-xl p-3 ${
            active === "all"
              ? "bg-[#145DB8] text-[#ffffff] rounded-2xl"
              : "text-black"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleUpComming()}
          className={` text-xl p-3 ${
            active === "upcomming"
              ? "bg-[#145DB8] text-[#ffffff] rounded-2xl"
              : "text-black"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => handleCompleted()}
          className={` text-xl p-3 ${
            active === "completed"
              ? "bg-[#145DB8] text-[#ffffff] rounded-2xl"
              : "text-black"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => handleCancel()}
          className={` text-xl p-3 ${
            active === "past"
              ? "bg-[#145DB8] text-[#ffffff] rounded-2xl"
              : "text-black"
          }`}
        >
          Canceled
        </button>
        <CalenderBar />
      </div>
      {data?.data?.data?.length > 0 && (
        <div className="mt-10">
          {data?.data?.data?.map((el) => (
            <div key={el.id} className="w-90 h-50 p-2 border-2 rounded-2xl">
              <div className="flex gap-2 items-center">
                <Calendar className="w-5 h-5 text-gray-600 " />
                <p className="text-gray-600">
                  {format(el.date_time_formatted, "EEEE, MMMM d")}
                </p>
                <p
                  className={`ml-auto text-lg ${
                    active === "upcomming"
                      ? "text-[#145DB8]"
                      : active === "completed"
                      ? "text-[#4CAF50]"
                      : active === "past"
                      ? "text-[#FC4B4E]"
                      : ""
                  }`}
                >
                  {active === "upcomming"
                    ? "Up Comming"
                    : active === "completed"
                    ? "Completed"
                    : active === "past"
                    ? "Canceled"
                    : "Pending"}
                </p>
              </div>
              <hr className="border-1"></hr>
              <div className="p-2 flex gap-2">
                <img
                  src={DoctorImage}
                  alt="doctor-image"
                  className="w-13 h-13 rounded-full"
                />
                <div className="flex flex-col ">
                  <h4 className="text-xl font-semibold">
                    {el.doctor.user.name}
                  </h4>
                  <p className="text-[#6D7379]">{el.doctor.specialty}</p>
                  <div className="flex items-center gap-1">
                    <LocationEdit className="text-[#6D7379] w-5 h-5" />
                    <p className="text-[#6D7379]">{el.doctor.clinic_address}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full gap-3 ">
                <button
                  onClick={() => setActive("past")}
                  className={`border-1  w-full rounded-2xl p-2 ${
                    active === "upcomming" || active === "all"
                      ? "border-[#6D7379] text-[#6D7379]"
                      : "border-[#145DB8] text-[#145DB8]"
                  }`}
                >
                  {active === "past"
                    ? "Book Again"
                    : active === "completed"
                    ? "View details"
                    : "Cancel"}
                </button>
                <button className="bg-[#145DB8] text-[#ffffff] w-full rounded-xl">
                  {active === "past"
                    ? "Support"
                    : active === "completed"
                    ? "Feedback"
                    : "Reschedule"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
