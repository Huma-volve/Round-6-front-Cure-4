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

export default function AddCardForm({ card_token, mutate }: any) {
  const [visible, setVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const initialValues = {
    holder_name: "",
    number: "",
    exp_month: "",

    month: "",
    cvvCode: "",
  };
  const AddCardSchema = Yup.object().shape({
    holder_name: Yup.string().required("No space! Name is Required!"),
    number: Yup.string().required("Card Number is required!"),

    exp_month: Yup.string().required("Exp Month is required"),
    cvvCode: Yup.string(),
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
  return (
    <div className="mt-10 md:flex md:gap-5 ">
      <div>
        <CardPreview
          card_token={card_token}
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
            const payload = {
              card_token,
              holder_name: values.holder_name,
              number: values.number,
              exp_month: values.exp_month,
            };
            mutate(payload);
          }}
        >
          {({ errors, touched, isValid, isSubmitting, values }) => {
            setCardNumber(values.number);
            setCardHolderName(values.holder_name);
            return (
              <Form className="flex flex-col gap-8 justify-center items-center ">
                <div className=" w-full ">
                  <Label className="mb-2">Cardholder Name</Label>
                  <Field name="holder_name">
                    {({ field }: any) => (
                      <Input
                        id="holder_name"
                        type="text"
                        placeholder="Your Card Name"
                        className="pl-8 "
                        {...field}
                      />
                    )}
                  </Field>

                  {errors.holder_name && touched.holder_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.holder_name}
                    </p>
                  )}
                </div>
                <div className=" w-full">
                  <Label className="mb-2">Card Number</Label>
                  <Field name="number">
                    {({ field }: any) => (
                      <div className="relative">
                        <Input
                          id="number"
                          type={visible ? "text" : "password"}
                          placeholder="Your Card Number"
                          className="pl-8 "
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setVisible(!visible)}
                          className="absolute md:left-310 top-1.5 left-95 "
                        >
                          {visible ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    )}
                  </Field>

                  {errors.number && touched.number && (
                    <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <div className=" w-full">
                    <Label className="mb-2">Expiry Date</Label>
                    <div>
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
                    </div>
                    {/* (errors.day && touched.day) || */}
                    {errors.exp_month && touched.exp_month ? (
                      <p>Expire Month is Required!</p>
                    ) : null}
                  </div>
                  <div>
                    <Label className="mb-2">CVV Code</Label>
                    <Field name="cvvCode">
                      {({ field }: any) => (
                        <Input
                          id="cvvCode"
                          type="text"
                          className="pl-8 "
                          {...field}
                        />
                      )}
                    </Field>

                    {errors.cvvCode && touched.cvvCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cvvCode}
                      </p>
                    )}
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
