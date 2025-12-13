import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HeartPulse } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import useForgetPassword from "@/hooks/useForgetPassword";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export default function SendOTP() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otpCode, setOtpCode] = useState("1234");
  const { sendOtp } = useForgetPassword();

  useEffect(() => {
    if (sendOtp.isSuccess) {
      console.log(sendOtp.data && sendOtp.data?.status);
      setIsDialogOpen(true);
    } else if (sendOtp.isError) {
      setIsDialogOpen(false);
    }
  }, [sendOtp.isSuccess, sendOtp.isError, sendOtp.data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendOtp.mutate(values);
  }

  return (
    <div className="lg:relative">
      <div className="container mx-auto">
        <HeartPulse className="text-[#145DB8] w-8 h-8 absolute top-10 left-22 lg:top-[-40px] lg:left-16" />
        <div className="lg:max-w-1/2 mt-20 mx-auto px-5 lg:px-0">
          <div className="text-center pb-8">
            <h1 className="text-3xl">Forget Your Password ?</h1>
            <p className="text-[#6D7379] text-xs pt-2">
              Enter your email below to reset your password,
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {sendOtp.isError && (
                <p style={{ color: "red" }}>
                  {sendOtp.error.response?.data?.message}
                </p>
              )}
              <Button
                type="submit"
                disabled={sendOtp.isPending}
                className="text-white bg-[#145DB8] w-full cursor-pointer hover:bg-blue-700 mb-8"
              >
                {sendOtp.isPending ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block"></span>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </Form>
          <Link
            to="/login"
            className="text-[#6D7379] text-center cursor-pointer font-medium block"
          >
            Back To Sign in
          </Link>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your verification code is</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="text-blue-600 text-2xl font-semibold">
                {otpCode}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Link to="/verifyOtp" className="w-full">
              <AlertDialogAction>Continue</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
