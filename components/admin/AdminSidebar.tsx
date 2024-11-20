"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/Logo.png";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  isOpen = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  const getLinkStyles = (path: string): string => {
    return `w-full flex gap-2 items-center ${
      isActive(path)
        ? "text-[#9572FF] font-medium"
        : "text-[#787A7E] hover:text-[#9572FF] transition-colors"
    }`;
  };
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
         z-50 w-[55%] md:w-full h-full border-r-2 border-[#2E3036] bg-[#17181c]
      `}
      >
        <div className="flex flex-col h-full items-center p-6 gap-10 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            X
          </button>
          {/* Logo Section */}
          <div className="flex justify-center items-center gap-3 w-full">
            <Image
              src={Logo}
              alt="AiTalk Logo"
              className="w-8 h-8 lg:w-auto lg:h-auto"
            />
            <h1 className="text-xl lg:text-[2vw]">AiTalk</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col w-[80%] gap-8 items-center justify-center">
            <Link
              href={"/admin/dashboard"}
              className={`w-full flex gap-2 items-center hover:text-purple-600 transition-colors ${getLinkStyles(
                "/admin/dashboard"
              )}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M1 10H7C7.55 10 8 9.55 8 9V1C8 0.45 7.55 0 7 0H1C0.45 0 0 0.45 0 1V9C0 9.55 0.45 10 1 10ZM1 18H7C7.55 18 8 17.55 8 17V13C8 12.45 7.55 12 7 12H1C0.45 12 0 12.45 0 13V17C0 17.55 0.45 18 1 18ZM11 18H17C17.55 18 18 17.55 18 17V9C18 8.45 17.55 8 17 8H11C10.45 8 10 8.45 10 9V17C10 17.55 10.45 18 11 18ZM10 1V5C10 5.55 10.45 6 11 6H17C17.55 6 18 5.55 18 5V1C18 0.45 17.55 0 17 0H11C10.45 0 10 0.45 10 1Z"
                  fill={isActive("/admin/dashboard") ? "#9572FF" : "#787A7E"}
                />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              href={"/admin/subscription"}
              className={`w-full flex gap-2 items-center text-[#787A7E] hover:text-purple-600 transition-colors ${getLinkStyles(
                "/admin/subscription"
              )}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M3.69231 0V17.5385C3.69231 18.0508 3.28154 18.4615 2.76923 18.4615C2.25692 18.4615 1.84615 18.0508 1.84615 17.5385V6.46154H2.76923V4.61538H0V17.5385C0 19.0569 1.25077 20.3077 2.76923 20.3077H12C11.8154 19.7538 11.7111 19.1077 11.7111 18.4615H5.36677C5.472 18.1698 5.53938 17.8643 5.53938 17.5385V1.84615H20.3086V12C20.9548 12.1846 21.6009 12.4615 22.1548 12.9231V0H3.69231ZM7.38462 3.69231V7.38462H18.4615V3.69231H7.38462ZM7.38462 9.23077V11.0769H12V9.23077H7.38462ZM13.8462 9.23077V11.0769H18.4615V9.23077H13.8462ZM7.38462 12V13.8462H12V12H7.38462ZM18.4615 12.9231C15.3932 12.9231 12.9231 15.3932 12.9231 18.4615C12.9231 21.5298 15.3932 24 18.4615 24V22.1538C16.3606 22.1538 14.7692 20.5625 14.7692 18.4615C14.7692 16.3606 16.3606 14.7692 18.4615 14.7692C20.5625 14.7692 22.1538 16.3606 22.1538 18.4615C22.1538 19.2628 21.9258 20.0031 21.5188 20.5966L20.3077 19.3846L19.8462 23.5385L24 23.0769L22.8462 21.9231C23.6132 20.9594 24 19.7326 24 18.4615C24 15.3932 21.5298 12.9231 18.4615 12.9231ZM7.38462 14.7692V16.6154H12V14.7692H7.38462Z"
                  fill={isActive("/admin/subscription") ? "#9572FF" : "#787A7E"}
                />
              </svg>
              <span>Subscription</span>
            </Link>
            <Link
              href={"/admin/customers"}
              className={`w-full flex gap-2 items-center text-[#787A7E] hover:text-purple-600 transition-colors ${getLinkStyles(
                "/admin/customers"
              )}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M22.3162 16.0087C22.2459 15.9276 22.1589 15.8625 22.0612 15.8178C21.9635 15.7732 21.8574 15.7501 21.75 15.75H20.25V14.25C20.25 13.4235 19.5773 12.75 18.75 12.75H15.75C14.9227 12.75 14.25 13.4235 14.25 14.25V15.75H12.75C12.6425 15.75 12.5363 15.7731 12.4385 15.8177C12.3407 15.8624 12.2536 15.9275 12.1832 16.0087C12.1128 16.09 12.0607 16.1854 12.0303 16.2885C12 16.3916 11.9922 16.5001 12.0075 16.6065L12.7575 21.8565C12.7831 22.0351 12.8723 22.1986 13.0087 22.3168C13.1451 22.435 13.3195 22.5 13.5 22.5H21C21.1805 22.5 21.3549 22.435 21.4913 22.3168C21.6277 22.1986 21.7169 22.0351 21.7425 21.8565L22.4925 16.6065C22.5077 16.5001 22.4998 16.3916 22.4694 16.2885C22.439 16.1853 22.3868 16.0899 22.3162 16.0087ZM15.75 14.25H18.75V15.75H15.75V14.25ZM20.3497 21H14.1503L13.6147 17.25H20.8853L20.3497 21ZM7.5 15H9V22.5H7.5V15Z"
                  fill={isActive("/admin/customers") ? "#9572FF" : "#787A7E"}
                />
                <path
                  d="M12.585 13.4062L11.1555 11.6182L10.074 8.9145C9.90785 8.49629 9.61972 8.13775 9.24707 7.88549C8.87442 7.63322 8.4345 7.4989 7.9845 7.5H3.75C2.5095 7.5 1.5 8.5095 1.5 9.75V15C1.5 15.8273 2.17275 16.5 3 16.5H3.75V22.5H5.25V15H3V9.75C3 9.55109 3.07902 9.36032 3.21967 9.21967C3.36032 9.07902 3.55109 9 3.75 9H7.9845C8.29275 9 8.5665 9.18525 8.6805 9.47175L9.91425 12.4688L11.4142 14.3438L12.585 13.4062ZM3 3.75C3 2.0955 4.3455 0.75 6 0.75C7.6545 0.75 9 2.0955 9 3.75C9 5.4045 7.6545 6.75 6 6.75C4.3455 6.75 3 5.4045 3 3.75ZM4.5 3.75C4.5 4.57725 5.17275 5.25 6 5.25C6.82725 5.25 7.5 4.57725 7.5 3.75C7.5 2.92275 6.82725 2.25 6 2.25C5.17275 2.25 4.5 2.92275 4.5 3.75Z"
                  fill={isActive("/admin/customers") ? "#9572FF" : "#787A7E"}
                />
              </svg>
              <span>Customers</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
