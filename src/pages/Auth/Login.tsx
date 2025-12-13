import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HeartPulse } from "lucide-react";
import wave2 from "../../assets/wave2.png";
import waveBorder from "../../assets/wave1.png";
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
import { Input } from "@/components/ui/input";
import { useLogin } from "./../../hooks/useLogin";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export default function Login() {
  const { mutate, isPending, isError, error } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="lg:relative">
      <div className="container mx-auto">
        <HeartPulse className="text-[#145DB8] w-8 h-8 absolute top-10 left-22 lg:top-[-40px] lg:left-16" />
        <div className="lg:max-w-1/3 mt-20 lg:ml-55 px-5 lg:px-0 relative z-20">
          <div className="text-center pb-8">
            <h1 className="text-3xl">Sign in</h1>
            <p className="text-[#6D7379] text-xs pt-2">
              Please provide all information required to access your account
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && (
                <p style={{ color: "red" }}>{error?.response?.data?.error}</p>
              )}
              <Link to="/sendOtp" className="text-[#145DB8] cursor-pointer">
                Forget the password?
              </Link>
              <Button
                type="submit"
                disabled={isPending}
                className="text-white bg-[#145DB8] w-full cursor-pointer hover:bg-blue-700 my-8"
              >
                {isPending ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block"></span>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          <p className="text-[#99A2AB] text-center font-normal">
            Don’t have an account?
            <Link to="/register" className="text-[#145DB8] cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="lg:absolute hidden lg:block top-[-135px] right-0">
        <img src={wave2} alt="wave image" />
      </div>
      <div className="lg:absolute hidden lg:block top-[-135px] right-0">
        <img src={waveBorder} alt="background image" />
      </div>
    </div>
  );
}
