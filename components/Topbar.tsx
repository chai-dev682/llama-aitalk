"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/Logo.png";
import Link from "next/link";

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="w-full lg:px-[8vw]">
      {/* Desktop Header */}
      <div className="hidden lg:grid grid-cols-3 items-center justify-center w-full">
        <div className="w-full flex justify-start items-center"></div>
        <div className="w-full flex justify-center items-center">
          <Link href={"/"}>
            <Image src={Logo} alt="Logo" className="w-auto h-12" />
          </Link>
        </div>
        <div className="w-full flex gap-5 justify-end items-center">
          <Link
            href={"/about"}
            className="border-2 border-[#2E3036] px-5 py-2.5 rounded-full text-base hover:bg-gray-800 transition-colors"
          >
            About Us
          </Link>
          <Link
            href={"/contact"}
            className="border-2 border-[#2E3036] px-5 py-2.5 rounded-full text-base hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image src={Logo} alt="Logo" className="w-auto h-8" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Added transitions and shadow */}
        <div
          className={`
            absolute left-0 right-0 
            bg-[#17181c] border-t border-[#2E3036] 
            shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)] 
            px-8 py-4 flex flex-col gap-4
            transform transition-all duration-300 ease-in-out z-10
            ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }
          `}
        >
          <Link
            href={"/about"}
            className="border-2 border-[#2E3036] px-5 py-2.5 rounded-full text-center text-sm hover:bg-gray-800 transition-colors"
          >
            About Us
          </Link>
          <Link
            href={"/contact"}
            className="border-2 border-[#2E3036] px-5 py-2.5 rounded-full text-center text-sm hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Overlay for menu background */}
        <div
          className={`
            fixed inset-0 bg-black/50 
            transition-opacity duration-300 ease-in-out
            ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </div>
  );
}
