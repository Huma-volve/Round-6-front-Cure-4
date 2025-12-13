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
import { useRegister } from "./../../hooks/useRegister";

const formSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    mobile: z.string().regex(/^(010|011|012|015)[0-9]{8}$/, {
      message:
        "Invalid mobile number. Must start with 015|010|012|011 and be 10 digits.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^[A-Z](?=.*@).{7,}$/, {
        message:
          "Password must start with a capital letter and contain @ character",
      }),
    password_confirmation: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.password_confirmation;
    },
    {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    }
  );

export default function Register() {
  const { mutate, isError, error, isPending } = useRegister();
  console.log(error);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      mobile: "",
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
            <h1 className="text-3xl">Create new account</h1>
            <p className="text-[#6D7379] text-xs pt-2">
              Please provide all information required to create your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
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
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password confirmation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && (
                <p style={{ color: "red" }}>{error.response?.data?.message}</p>
              )}
              <Button
                type="submit"
                disabled={isPending}
                className="text-white bg-[#145DB8] w-full cursor-pointer hover:bg-blue-700"
              >
                {isPending ? (
                  <span className="animate-spin bg-white w-4 h-4 inline-block"></span>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          <p className="text-[#99A2AB] text-center pt-8 font-normal">
            Already have an account!
            <Link to="/" className="text-[#145DB8] cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <div className="lg:absolute hidden lg:block top-[-135px] right-0">
        <img src={wave2} alt="" />
      </div>
      <div className="lg:absolute hidden lg:block top-[-135px] right-0">
        <img src={waveBorder} alt="" />
      </div>
    </div>
  );
}
