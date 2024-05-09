import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="TITLE 1" subtitle="SUBTITLE 1" body="BODY 1" />
      <DashboardCard title="TITLE 2" subtitle="SUBTITLE 2" body="BODY 2" />
      <DashboardCard title="TITLE 3" subtitle="SUBTITLE 3" body="BODY 3" />
    </div>
  );
}

type DashboardCardTypes = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardTypes) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
