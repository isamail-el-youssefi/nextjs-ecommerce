import { Nav, NavLink } from "@/components/Nav";
import React from "react";

//? Forces all the admin pages to not use cache bz they are just admin page
//? And also admin wants all the up to date info not cached infos
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/product">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Products</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
