import {z} from "zod"

export const UserFormValidation = z.object({
  name: z.string().min(2, "Name Must be atleast 2 charcters").max(50 , "Name Must be at most 50 characters"),
  email:z.string().email("Enter a valid email address"),
  phone:z.string().refine((phone) =>  /^\+\d{10,15}$/.test(phone),"Enter a valid phone number"),
});