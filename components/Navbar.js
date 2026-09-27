"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-4 border-b border-cardborder">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/assets/logo.png" alt="FitLog logo" width={24} height={24} />
        <span className="font-bold tracking-wide">FITLOG</span>
      </Link>

      <div className="flex gap-8 text-sm">
        <Link
          href="/"
          className={pathname === "/" ? "text-accent font-semibold" : "text-gray-300"}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={pathname === "/my-plan" ? "text-accent font-semibold" : "text-gray-300"}
        >
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <Link href="/my-plan" className="bg-accent text-black px-3 py-1 rounded-full font-semibold">
          Plan {plan.length}
        </Link>
        <Link href="/my-plan" className="border border-gray-500 px-3 py-1 rounded-full">
          Saved {saved.length}
        </Link>
      </div>
    </nav>
  );
}
