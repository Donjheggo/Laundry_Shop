import SearchBar from "@/components/search-bar";
import CreateProductDialog from "@/components/products/create-dialog";
import ProductsTable from "@/components/products/table";

export default function Customers({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-md mx-auto">
      <h1 className="text-center text-2xl">Products</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <CreateProductDialog />
        </div>
        <div className="mt-2">
          <ProductsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
