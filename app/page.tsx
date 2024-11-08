import SearchBar from "@/components/orders/search-bar";
import { BackgroundLines } from "@/components/ui/trackpag-background";
import logo from "@/app/favicon.ico";
import Image from "next/image";
import OrderCard from "@/components/orders/order-card";

export default function TrackPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {

  const searchQuery = searchParams?.query || "";
  
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div className="container max-w-screen-sm mx-auto p-5 flex flex-col justify-center gap-4">
        <div className="w-full flex justify-center">
          <Image src={logo} alt="Image" width="200" height="200" />
        </div>

        <h1 className="text-center text-primary text-2xl mb-5">
          Track Your Laundry
        </h1>
        <SearchBar />
        {searchQuery && <OrderCard searchQuery={searchQuery} />}
      </div>
    </BackgroundLines>
  );
}
