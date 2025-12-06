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

import { useDeleteAccount } from "@/hooks/ProfileHooks/useDeleteAccount";
import { UserRound } from "lucide-react";
export default function ConfirmDeleteAccount() {
  const { mutate } = useDeleteAccount();

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
        </AlertDialogHeader>

        <AlertDialogFooter className="flex">
          <AlertDialogCancel className="mr-auto w-1/2 bg-[#BBC1C7] text-[#05162C]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-1/2 bg-[#145DB8] text-[#ffffff]"
            onClick={() => mutate()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
