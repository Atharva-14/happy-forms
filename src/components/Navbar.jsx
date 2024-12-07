"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";

const Navbar = ({ className }) => {
  return (
    <nav
      className={cn(
        "w-full p-4 flex justify-between items-center shadow-md",
        className
      )}
    >
      <Link href={"/"} className="font-semibold text-xl sm:text-2xl">
        Happy Forms
      </Link>
    </nav>
  );
};

export default Navbar;
