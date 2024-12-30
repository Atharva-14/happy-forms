import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Happy Forms - The Ultimate Form Builder",
  description:
    "Happy Forms is an easy-to-use form builder for creating beautiful and functional forms for your website. Create surveys, contact forms, quizzes, and more.",
  keywords:
    "form builder, online forms, create forms, survey forms, contact forms, quiz forms, easy form builder",
  author: "Created by Atharva Muratkar",
  openGraph: {
    title: "Happy Forms - The Ultimate Form Builder",
    description:
      "Happy Forms is an easy-to-use form builder for creating beautiful and functional forms for your website. Create surveys, contact forms, quizzes, and more.",
    url: "https://happy-forms.vercel.app/",
    site_name: "Happy Forms",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mb-1">
          <Navbar />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
