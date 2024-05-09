import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React from "react";

export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl mb-4">{children}</h1>
        <Button className="bg-sky-800" asChild>
          <Link href="/admin/product/new">Add Product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
}

function ProductTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}
