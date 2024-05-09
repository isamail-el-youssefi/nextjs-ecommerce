"use server";

import db from "@/db/db";
import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "required" });
const imageSchema = fileSchema.refine(
  //? Will check fist the size 0 and then the type (if = 0 will ignore the 2nd arg if its an img)
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, { message: "required" }),
  image: imageSchema.refine((file) => file.size > 0, { message: "required" }),
});

export async function addProduct(formdata: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formdata.entries()));

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

}
