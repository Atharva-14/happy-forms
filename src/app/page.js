"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="mx-20">
      <button
        className="bg-orange-400 p-3 rounded-md"
        onClick={() => router.push("/new-form")}
      >
        Create Form
      </button>
    </div>
  );
}
