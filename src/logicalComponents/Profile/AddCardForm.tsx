/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CardPreview } from "./CardPreview";

export default function AddCardForm({ brand, mutate }: any) {
  const [visible, setVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const initialValues = {
    cardholder_name: "",
    card_number: "",
    brand: brand,
    exp_month: "",
    exp_year: "",
    cvv: "",
    gateway: "stripe",
    is_default: false,
  };
  const AddCardSchema = Yup.object().shape({
    cardholder_name: Yup.string().required("No space! Name is Required!"),
    card_number: Yup.string().required("Card Number is required!"),
    exp_month: Yup.string().required("Exp Month is required"),
    exp_year: Yup.string().required("Exp Year is required"),
    cvv: Yup.string(),
    is_default: Yup.boolean().required("Is this the default card or not ?"),
  });

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
  const years = Array.from({ length: 100 }, (_, i) => String(2035 - i));
  const default_boolean = [true, false];
  return (
    <div className="mt-10 md:flex md:gap-5 ">
      <div>
        <CardPreview
          brand={brand}
          cardNumber={cardNumber}
          cardHolderName={cardHolderName}
        />
      </div>
      <div className="md:w-1/2">
        <Formik
          initialValues={initialValues}
          validationSchema={AddCardSchema}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={(values) => {
            console.log(values);

            const payload = {
              brand,
              cardholder_name: values.cardholder_name,
              card_number: values.card_number,
              exp_month: values.exp_month,
              exp_year: values.exp_year,
              cvv: values.cvv,
              gateway: values.gateway,
              is_default: values.is_default,
            };
            mutate(payload);
          }}
        >
          {({ errors, touched, isValid, isSubmitting }) => {
            return (
              <Form className="flex flex-col gap-8 justify-center items-center ">
                <div className=" w-full ">
                  <Label className="mb-2">Cardholder Name</Label>
                  <Field name="cardholder_name">
                    {({ field }: any) => (
                      <Input
                        id="cardholder_name"
                        type="text"
                        placeholder="Your Card Name"
                        className="pl-8 "
                        onChange={(e) => {
                          field.onChange(e);
                          setCardHolderName(e.target.value);
                        }}
                        {...field}
                      />
                    )}
                  </Field>

                  {errors.cardholder_name && touched.cardholder_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cardholder_name}
                    </p>
                  )}
                </div>
                <div className=" w-full">
                  <Label className="mb-2">Card Number</Label>
                  <Field name="card_number">
                    {({ field }: any) => (
                      <div className="relative">
                        <Input
                          id="card_number"
                          type={visible ? "text" : "password"}
                          placeholder="Your Card Number"
                          className="pl-8 "
                          onChange={(e) => {
                            field.onChange(e);
                            setCardNumber(e.target.value);
                          }}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setVisible(!visible)}
                          className="absolute md:left-120 top-1.5 left-75 "
                        >
                          {visible ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    )}
                  </Field>

                  {errors.card_number && touched.card_number && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.card_number}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className=" w-full">
                    <Label className="mb-2">Expiry Date</Label>
                    <div className="flex gap-2">
                      <Field name="exp_month">
                        {({ field, form }: any) => (
                          <Select
                            onValueChange={(val) =>
                              form.setFieldValue("exp_month", val)
                            }
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Exp Month" />
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
                      <Field name="exp_year">
                        {({ field, form }: any) => (
                          <Select
                            onValueChange={(val) =>
                              form.setFieldValue("exp_year", val)
                            }
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Exp Year" />
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
                    {/* (errors.day && touched.day) || */}
                    {(errors.exp_month && touched.exp_month) ||
                    (errors.exp_year && touched.exp_year) ? (
                      <p>Expire Month is Required!</p>
                    ) : null}
                  </div>
                  <div>
                    <Label className="mb-2">CVV</Label>
                    <Field name="cvv">
                      {({ field }: any) => (
                        <Input
                          id="cvv"
                          type="text"
                          className="pl-8 "
                          {...field}
                        />
                      )}
                    </Field>

                    {errors.cvv && touched.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <Label className="mb-2">Default?</Label>
                    <Field name="is_default">
                      {({ field, form }: any) => (
                        <Select
                          onValueChange={(val) =>
                            form.setFieldValue("is_default", val)
                          }
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Default" />
                          </SelectTrigger>
                          <SelectContent>
                            {default_boolean.map((m, i) => (
                              <SelectItem key={i} value={String(m)}>
                                {String(m)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                  </div>
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
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
