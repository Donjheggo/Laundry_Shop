import { ArrowLeft } from "lucide-react";
import { GetProductById } from "@/lib/actions/products";
import Link from "next/link";
import UpdateProductForm from "@/components/products/update-form";

export default async function UpdateCustomer({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetProductById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateProductForm item={item} />
      </div>
    </div>
  );
}
