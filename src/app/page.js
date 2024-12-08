"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/new-form");
  };
  return (
    <div className="mx-20">
      <button className="bg-orange-400 p-3 rounded-md" onClick={handleClick}>
        Create Form
      </button>
    </div>
  );
}
