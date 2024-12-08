"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/new-form");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-[#00AA45] mb-6">
          Create Your Form
        </h1>
        <p className="text-gray-600 mb-8">
          Start building your custom form with just one click.
        </p>
        <button
          className="bg-[#00AA45] text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition duration-300 hover:bg-[#008F36] hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#00AA45]"
          onClick={handleClick}
        >
          Create Form
        </button>
      </div>
    </div>
  );
}
