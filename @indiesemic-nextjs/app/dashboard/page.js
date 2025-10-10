"use client";

import dynamic from "next/dynamic";

const DashboardView = dynamic(() =>
  import("../../components/Dashboard/DashboardView")
);

export default function DashboardPage() {
  return <DashboardView />;
}
