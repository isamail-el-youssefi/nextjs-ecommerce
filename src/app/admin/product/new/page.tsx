import React from "react";
import PageHeader from "../../_components/PageHeader";
import ProductForm from "../_components/ProductForm";

export default function newProductPage() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl mb-4">Add New Product</h1>
      </div>
      <ProductForm />
    </>
  );
}
