import DashboardCard from "@/components/dashboard/dashboard-card";
import { HandPlatter, HousePlus, UsersRound, UserRound } from "lucide-react";
import OrdersTable from "@/components/dashboard/orders-table";
import CustomersTable from "@/components/dashboard/customers-table";
import { GetTotalOrders, TotalClaimedOrders, TotalOnProcessOrders, TotalPickUpOrders } from "@/lib/actions/orders";

export default async function Dashboard() {
  const [total, claimed, process, pickup] =
    await Promise.all([
      GetTotalOrders(),
      TotalClaimedOrders(),
      TotalOnProcessOrders(),
      TotalPickUpOrders(),
    ]);

  const cards = [
    {
      title: "Total Orders",
      number: total,
      icon: <HandPlatter size={18} className="text-primary" />,
    },
    {
      title: "On Process Orders",
      number: process,
      icon: <HousePlus size={18} className="text-primary" />,
    },
    {
      title: "Ready For Pickup",
      number: pickup,
      icon: <UsersRound size={18} className="text-primary" />,
    },
    {
      title: "Claimed Orders",
      number: claimed,
      icon: <UserRound size={18} className="text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-2xl">
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-4">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mt-4">
        <div className="w-full">
          <OrdersTable searchQuery="" page={1} />
        </div>
        <div className="w-full lg:w-[50%]">
          <CustomersTable searchQuery="" page={1} />
        </div>
      </div>
    </div>
  );
}
