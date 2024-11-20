"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DetailedSubscription from "@/components/admin/DetailedSubscription";
import QuickStats from "@/components/admin/QuickStats";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // Redirect to the homepage if the user is logged in
      router.push("/");
    }
  }, [session, router]);

  const handleClose = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen relative px-3 md:px-0">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-6 left-6 z-50 hover:bg-white/20"
        aria-label="Toggle menu"
      >
        {/* Hamburger icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="w-[20%] h-full fixed top-0 left-0">
        <AdminSidebar isOpen={isSidebarOpen} onClose={handleClose} />
      </div>
      <div className="w-[20%] h-full hidden md:block"></div>
      <div className="w-full md:w-[80%] flex flex-col items-center min-h-screen ">
        <AdminHeader />
        <div className="w-full px-[2vw]">
          <QuickStats />
          {/* Subscription Section */}
          <div>
            <div className="mb-8 w-full">
              <div className="flex w-full">
                <DetailedSubscription />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
