import Link from "next/link";
import favicon from "@/app/favicon.ico";
import { adminLinks } from "./layout/sidenav";
import Image from "next/image";
import { signout } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";

export default function IndexHeader() {
  return (
    <header>
      <nav className="flex items-center gap-4 border border-b px-5 py-2">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src={favicon} alt="logo" width={30} height={30} />
            <span className="ml-2 text-lg text-primary font-semibold">
              Laundry Shop
            </span>
          </Link>
        </div>
        <div className="ml-auto flex items-center">
          {adminLinks.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
            >
              {item.icon}
              <h1 className="text-md">{item.name}</h1>
            </Link>
          ))}
          <form action={signout}>
            <button
              type="submit"
              className="text-md flex items-center gap-2 hover:bg-muted rounded-md p-2 w-full"
            >
              <LogOut />
              Logout
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}
