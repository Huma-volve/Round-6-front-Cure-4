/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/logicalComponents/BackButton";
import { KeySquareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ConfirmDeleteAccount from "@/logicalComponents/Profile/ConfirmDeleteAccount";

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-20">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">Settings</h1>
      </div>

      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5 mt-10">
        <div className="flex  items-center gap-4">
          <KeySquareIcon />
          <p className="text-xl ">Password Management</p>
        </div>
        <button className="ml-auto" onClick={() => navigate("/resetOtp")}>
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>
      <ConfirmDeleteAccount />
    </div>
  );
}
