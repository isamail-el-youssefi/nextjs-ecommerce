import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });
  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

/* //! 1ST METHODE WITH 2 AWAITS
async function getCustomerData() {
  const userCount = await db.user.count();
  const orderData = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
  });
} */

//! 2ND METHODE WITH PROMISE ALL
async function getCustomerData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerCustomer:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / 100 / userCount,
  };
}

export default async function AdminDashboard() {
  const { amount, numberOfSales } = await getSalesData();
  const { userCount, averageValuePerCustomer } = await getCustomerData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={formatNumber(numberOfSales) + " Orders"}
        body={formatCurrency(amount)}
      />
      <DashboardCard
        title="Customer"
        subtitle={formatCurrency(averageValuePerCustomer) + " Average Value"}
        body={formatNumber(userCount)}
      />

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
