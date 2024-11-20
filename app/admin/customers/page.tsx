"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import QuickStats from "@/components/admin/QuickStats";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CustomersPage() {
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
        className="lg:hidden absolute top-6 left-6 z-50"
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
          <h1 className="text-[#787A7E] text-[5vw] md:text-[2vw] pb-5">
            Subscription
          </h1>
          <div>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row w-full gap-5">
                <div className="bg-[#2E3036] p-4 rounded-lg w-full md:w-[40%]">
                  <button className="text-gray-400 px-4 py-2">
                    Top Customers
                  </button>
                  <div className="rounded-[10px]">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between py-2 "
                      >
                        <div className="flex items-center gap-2 px-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                          <span>Business Plan</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-1 text-[#D9D9D9]">
                            25,564 Prompts
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg w-full md:w-[60%]">
                  <div className="bg-[#2E3036] p-4 rounded-[10px] h-full">
                    <h3 className="font-bold mb-4">Incoming Subscription</h3>
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                          <span>Business Plan</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-yellow-600 rounded text-sm">
                            Plus
                          </button>
                          <button className="px-3 py-1 text-green-500 text-sm">
                            Accept
                          </button>
                          <button className="px-3 py-1 text-red-500 text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
