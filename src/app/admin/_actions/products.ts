"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "required" });
const imageSchema = fileSchema.refine(
  //? Will check fist the size 0 and then the type (if = 0 will ignore the 2nd arg if its an img)
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceincents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, { message: "required" }),
  image: imageSchema.refine((file) => file.size > 0, { message: "required" }),
});

export async function addProduct(prevState: unknown, formdata: FormData) {
  console.log(formdata.get("priceincents"));
  console.log(formdata.get("description"));
  const result = addSchema.safeParse(Object.fromEntries(formdata.entries()));

  console.log(result);
  console.log(result.error?.issues);

  if (result.success === false) return result.error.formErrors.fieldErrors;

  const data = result.data;

  await fs.mkdir("products", { recursive: true }); // where we store of our defrent products files that they can download
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`; //where we want to save the file
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer())); //write the file to the path

  await fs.mkdir("public/products", { recursive: true }); // where we store of our defrent products files that they can download
  const imagePath = `public/products/${crypto.randomUUID()}-${data.image.name}`; //where we want to save the file
  await fs.writeFile(
    `${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  ); //write the file to the path

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceincents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/product");
}
