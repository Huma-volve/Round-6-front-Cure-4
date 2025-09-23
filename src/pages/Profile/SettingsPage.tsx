/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/logicalComponents/BackButton";
import { KeySquareIcon, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDeleteAccount } from "@/hooks/ProfileHooks/useDeleteAccount";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function SettingsPage() {
  const navigate = useNavigate();
  const { mutate } = useDeleteAccount();
  const ConfirmDeleteAccount = ({ mutate }: any) => {
    const [password, setPassword] = useState("");
    console.log("delete", mutate);
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-full flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
            <div className="w-full flex  items-center gap-4">
              <UserRound />
              <p className="text-xl ">Delete Account</p>
            </div>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col items-center ">
            <h4 className="font-bold text-2xl">Delete</h4>
            <hr className="w-full"></hr>
            <AlertDialogTitle className="text-xl font-light">
              Are you sure you want to delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your account will be deleted!
            </AlertDialogDescription>
            <div className="w-full">
              <Label className="m-2">Enter a password</Label>
              <Input
                id="password"
                placeholder="*******"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex">
            <AlertDialogCancel className="mr-auto w-1/2 bg-[#BBC1C7] text-[#05162C]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-1/2 bg-[#145DB8] text-[#ffffff]"
              onClick={() => mutate(password)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
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
      <ConfirmDeleteAccount mutate={mutate} />
    </div>
  );
}
