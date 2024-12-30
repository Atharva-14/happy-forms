"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      router.push("/new-form");
    }, 1000); // Simulate some loading time (adjust as needed)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#00AA45] mb-4 sm:mb-6">
          Create Your Form
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
          Start building your custom form with just one click.
        </p>
        <div className="flex justify-center items-center">
          <button
            className="bg-[#00AA45] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg transform transition duration-300 hover:bg-[#008F36] hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#00AA45] flex items-center justify-center"
            onClick={handleClick}
            disabled={loading} // Disable button while loading
          >
            {loading && (
              <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-[#00AA45] rounded-full animate-spin mr-3"></div>
            )}
            Create Form
          </button>
        </div>
      </div>
    </div>
  );
}
