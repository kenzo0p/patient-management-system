"use server";

import { ID } from "node-appwrite";
import {  DATABASE_ID, databases,  PATIENT_COLLECTION_ID, } from "../appwrite.config";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const createAppointement = async(appointment:CreateAppointmentParams) => {
    try {
        const newAppointement = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            appointment
          );
          revalidatePath("/admin")
          return parseStringify(newAppointement);        
    } catch (error) {
        console.log(error)
    }
}