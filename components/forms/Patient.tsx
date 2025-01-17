"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "./CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";


export enum FormFieldType {
  INPUT='input',
  TEXTAREA = 'textarea',
  PHONE_INPUT= 'phoneInput',
  CHECKBOX='checkbox',
  SELECT ='select',
  DATE_PICKER='datePicker',
  SKELETON='skeleton',
}



export function Patient() {
  const [isLoading,setIsLoading] = useState(false);
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    // console.log(values);
    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        phone
      };
      const user = await createUser(userData)
      if(user) router.push(`/patient/${user.$id}/register`)
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hii there 👋</h1>
            <p className="text-dark-700 ">Schedule your first appointment</p>
        </section>
            <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="John doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"

            />
            <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"

            placeholder="John@doe.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"

            />
            <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+91 5656565656"
            

            />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}
