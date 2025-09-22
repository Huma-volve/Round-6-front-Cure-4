/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PhoneCallIcon, UserRoundIcon } from "lucide-react";

export default function EditProfileForm({ mutate }: any) {
  const initialValues = {
    name: "",
    phone: "",
    day: "",
    month: "",
    year: "",
  };
  const EditProfileSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Enter a valid name!")
      .required(" Name is Required!"),
    phone: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Enter a valid Phone Number")
      .required("Phone Number is required!"),

    day: Yup.string().required("Day is required"),
    month: Yup.string().required("Month is required"),
    year: Yup.string().required("Year is required"),
  });

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const Months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const years = Array.from({ length: 100 }, (_, i) =>
    String(new Date().getFullYear() - i)
  );
  return (
    <div className="mt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={EditProfileSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values) => {
          const birthdate = `${values.year}-${values.month}-${values.day}`;
          const payload = { name: values.name, phone: values.phone, birthdate };
          mutate(payload);
        }}
      >
        {/* isValid, isSubmitting */}
        {({ errors, touched, isValid, isSubmitting }) => (
          <Form className="flex flex-col gap-8 justify-center items-center">
            <div className="relative w-full ">
              <UserRoundIcon className="absolute top-2 left-2 text-[#99A2AB] w-5 h-5" />
              <Field name="name">
                {({ field }: any) => (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className="pl-8 "
                    {...field}
                  />
                )}
              </Field>

              {errors.name && touched.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="relative w-full">
              <PhoneCallIcon className="absolute top-2 left-2 text-[#99A2AB] w-5 h-5" />
              <Field name="phone">
                {({ field }: any) => (
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    className="pl-8 "
                    {...field}
                  />
                )}
              </Field>

              {errors.phone && touched.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div className=" w-full ">
              <Label htmlFor="birthdate" className="font-light text-xl">
                Select your birthdate
              </Label>
              <div className="flex gap-5 mt-5">
                <Field name="day">
                  {({ field, form }: any) => (
                    <Select
                      onValueChange={(val) => form.setFieldValue("day", val)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <Field name="month">
                  {({ field, form }: any) => (
                    <Select
                      onValueChange={(val) => form.setFieldValue("month", val)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Months.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <Field name="year">
                  {({ field, form }: any) => (
                    <Select
                      onValueChange={(val) => form.setFieldValue("year", val)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              </div>
              {(errors.day && touched.day) ||
              (errors.month && touched.month) ||
              (errors.year && touched.year) ? (
                <p>Birthdate is Required!</p>
              ) : null}
            </div>
            {!isValid && (
              <p className="text-red-800 font-semibold align-center text-2xl">
                Something wrong with you data!
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#145DB8] mb-10"
              disabled={isSubmitting}
            >
              Edit Profile
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
