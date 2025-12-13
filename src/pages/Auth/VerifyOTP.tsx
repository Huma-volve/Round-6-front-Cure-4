import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useForgetPassword from "@/hooks/useForgetPassword";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  otp: z
    .string()
    .min(4, {
      message: "otp code must be 4 characters",
    })
    .max(6, {
      message: "otp code must be 4 characters",
    }),
});

export default function VerifyOTP() {
  const { verifyOTP } = useForgetPassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    verifyOTP.mutate(values);
  }

  return (
    <div className="lg:relative">
      <div className="container mx-auto">
        <HeartPulse className="text-[#145DB8] w-8 h-8 absolute top-10 left-22 lg:top-[-40px] lg:left-16" />
        <div className="lg:max-w-1/3 mt-20 lg:ml-55 px-5 lg:px-0">
          <div className="text-center pb-8">
            <h1 className="text-3xl">Enter verification code</h1>
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
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification code</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {verifyOTP?.isError && (
                <p style={{ color: "red" }}>
                  {verifyOTP?.error.response?.data?.message}
                </p>
              )}
              <Button
                type="submit"
                disabled={verifyOTP?.isPending}
                className="text-white bg-[#145DB8] w-full cursor-pointer hover:bg-blue-700"
              >
                {verifyOTP?.isPending ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block"></span>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
