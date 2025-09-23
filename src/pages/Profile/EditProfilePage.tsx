import { useEditProfile } from "@/hooks/ProfileHooks/useEditProfile";
import BackButton from "@/logicalComponents/BackButton";
import EditProfileForm from "@/logicalComponents/Profile/EditProfileForm";
import { useLocation, useNavigate } from "react-router-dom";
export default function EditProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending, isError } = useEditProfile();
  const { name, email, image } = location.state || {};
  console.log("location", location);
  return (
    <div className="container mx-auto mt-20">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">Edit Your Profie</h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <img src={image} alt="human-image" className="w-30 h-30 rounded-full" />
        <h2 className="font-semibold text-2xl">{name}</h2>
        <p className="text-xl text-[#6D7379]">{email}</p>
      </div>
      <div className="flex mb-auto">
        {isPending && (
          <p className="text-red-800 font-semibold align-center text-2xl">
            Loading....
          </p>
        )}
        {isError && (
          <p className="text-red-800 font-semibold align-center text-2xl">
            Error Editing your Profile!
          </p>
        )}
      </div>
      <EditProfileForm mutate={mutate} />
    </div>
  );
}
