/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HumanImage from "../../assets/human.jpg";
import { useNavigate } from "react-router-dom";
import {
  BanknoteIcon,
  BellIcon,
  HeartIcon,
  LockKeyholeIcon,
  MessageSquareTextIcon,
  SettingsIcon,
} from "lucide-react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Switch from "@mui/material/Switch";
import { useProfile } from "@/hooks/ProfileHooks/useProfile";
import { useLogout } from "@/hooks/ProfileHooks/useLogout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
const label = { inputProps: { "aria-label": "Switch demo" } };

const ConfirmLogout = ({ mutate }: any) => {
  console.log("logout", mutate);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
          <div className=" flex  items-center gap-4 text-[#FC4B4E]">
            <ArrowLeftOnRectangleIcon className="w-8 h-9" />
            <p className="text-xl ">Log Out</p>
          </div>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center ">
          <h4 className="font-bold text-2xl">Logout</h4>
          <hr className="w-full"></hr>
          <AlertDialogTitle className="text-xl font-light">
            Are you sure you want to Log out?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your account.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex">
          <AlertDialogCancel className="mr-auto w-1/2 bg-[#BBC1C7] text-[#05162C]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-1/2 bg-[#145DB8] text-[#ffffff]"
            onClick={() => mutate()}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default function ProfilePage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useProfile();
  const { mutate } = useLogout();

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
  function goToEditProfile() {
    navigate("/edit-profile", {
      state: {
        name: data?.data.user.name,
        email: data?.data.user.email,
        image: HumanImage,
      },
    });
  }
  console.log(mutate);
  return (
    <div className="container mx-auto mt-20 ">
      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-10">
        <img src={HumanImage} alt="img" className="w-30 h-30 rounded-full" />
        <div className="flex flex-col items-start">
          <h1 className="font-semibold text-2xl">{data.data.user.name}</h1>
          <p className="text-xl text-[#6D7379]">{data.data.user.email}</p>
        </div>
        <button className="ml-auto" onClick={goToEditProfile}>
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>
      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <BellIcon />
          <p className="text-xl ">Notfication</p>
        </div>
        <div className="ml-auto">
          <Switch {...label} defaultChecked color="success" size="medium" />
        </div>
      </div>

      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <BanknoteIcon />
          <p className="text-xl ">Payment Method</p>
        </div>
        <button className="ml-auto" onClick={() => navigate("/payment")}>
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>

      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <HeartIcon />
          <p className="text-xl ">Favorite</p>
        </div>
        <button className="ml-auto" onClick={() => navigate("/favorite")}>
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>

      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <SettingsIcon />
          <p className="text-xl ">Settings</p>
        </div>
        <button className="ml-auto" onClick={() => navigate("/settings")}>
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>

      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <MessageSquareTextIcon />
          <p className="text-xl ">FAQs</p>
        </div>
        <button className="ml-auto" onClick={() => navigate("/FAQs")}>
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>

      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <LockKeyholeIcon />
          <p className="text-xl ">Privacy Policy</p>
        </div>
        <button className="ml-auto" onClick={() => navigate("/privacy-policy")}>
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>
      <ConfirmLogout mutate={mutate} />
    </div>
  );
}
