"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UpdateProduct } from "@/lib/actions/products";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";

export default function UpdateProductForm({ item }: { item: ProductsT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("name") ||
      !formData.get("price") ||
      !formData.get("quantity")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateProduct(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <Label htmlFor="name">Product name</Label>
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
          <Input
            name="name"
            id="name"
            type="text"
            placeholder=""
            required
            defaultValue={item.name}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            name="price"
            id="price"
            type="number"
            placeholder=""
            required
            defaultValue={item.price}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quantity">Contact no.</Label>
          <Input
            name="quantity"
            id="quantity"
            type="text"
            placeholder=""
            required
            defaultValue={item.quantity}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export type ProductsT = Tables<"products">;
