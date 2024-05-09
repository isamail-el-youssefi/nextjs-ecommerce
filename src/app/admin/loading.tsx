import { Loader2Icon } from "lucide-react";
import React from "react";

export default function adminLoading() {
  return (
    <div className="flex justify-center items-center pt-28">
      <Loader2Icon className="size-36 animate-spin" />
    </div>
  );
}
