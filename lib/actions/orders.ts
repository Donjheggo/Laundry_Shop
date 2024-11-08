"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function GetOrders(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  try {
    const supabase = createClient();
    const query = supabase
      .from("orders")
      .select(`*, customer_id(id, name)`)
      .order("created_at", { ascending: false })
      .range((page - 1) * items_per_page, page * items_per_page - 1);

    const { data, error } = searchQuery
      ? await query.ilike("customer_id.name", `%${searchQuery}%`)
      : await query;

    if (error) {
      console.error(error);
      return [];
    }

    // filtering for search query foreign key
    const filteredData = data.filter((order) => order.customer_id !== null);

    return filteredData || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function CreateOrder(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .insert({
        customer_id: formData.get("customer_id"),
        kilograms: formData.get("kilograms"),
        soaps: formData.get("soaps"),
        fabcons: formData.get("fabcons"),
        price: formData.get("price"),
        status: "ON PROCESS",
      })
      .select();

    if (error) {
      return { error: error.message };
    }
    revalidatePath("/orders");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetOrderById(id: string) {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return false;
    }
    return data;
  } catch (error) {
    return false;
  }
}

export async function UpdateOrder(formData: FormData) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({
        status: formData.get("status"),
      })
      .eq("id", formData.get("id"))
      .select();

    if (error) {
      return { error: error };
    }
    revalidatePath("/orders");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function DeleteOrder(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) {
      return { error: error };
    }
    revalidatePath("/orders");
    return { error: "" };
  } catch (error) {
    return { error: error };
  }
}

export async function GetTotalOrders() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("orders").select("*");

    if (error) {
      console.error(error);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function GetAllOrders() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase.from("orders").select("*");

    if (error) {
      console.error(error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function TotalOnProcessOrders() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "ON PROCESS");

    if (error) {
      console.error(error);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function TotalPickUpOrders() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "READY FOR PICKUP");

    if (error) {
      console.error(error);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function TotalClaimedOrders() {
  try {
    const supabase = createClient();
    const { error, data } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "CLAIMED");

    if (error) {
      console.error(error);
      return 0;
    }
    return data.length || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function GetMyOrder(id: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("orders")
      .select(`*, customer_id(*)`)
      .eq("id", id)
      .single();

    if (error) {
      return { error: error.message };
    }

    return data;
  } catch (error) {
    return { error: error };
  }
}
