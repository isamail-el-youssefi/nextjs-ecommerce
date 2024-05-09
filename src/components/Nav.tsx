"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

export function Nav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="bg-slate-600 mt-2 rounded-2xl md:w-2/3 xl:w-1/2  mx-auto text-white flex space-x-1 justify-center px-4">
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "p-3 hover:bg-secondary hover:text-secondary-foreground hover:rounded-2xl hover:border-y-2  hover:border-slate-600  focus-visible:bg-secondary focus-visible:text-secondary-foreground focus-visible:rounded-2xl focus-visible:border-y-2  focus-visible:border-slate-600",
        pathname === props.href &&
          "bg-background rounded-2xl border-y-2 border-slate-600 text-slate-600 "
      )}
    />
  );
}
