import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function UpgradePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-6 min-h-screen p-4 md:p-8">
      <Header />
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
        Upgrade Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:w-[90%] lg:w-[75%] gap-4">
        {/* Free Plan */}
        <div className="bg-[#313D6A]/15 border-2 border-[#2E3036] w-full flex flex-col gap-3 md:gap-4 items-center px-4 md:px-8 py-4 rounded-lg">
          <h2 className="text-lg md:text-xl lg:text-2xl">Free</h2>
          <div className="flex items-center gap-1">
            <span className="text-base md:text-lg">$</span>
            <div className="flex items-center gap-1 md:gap-2">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                0.00
              </h3>
              <span className="text-[#A9ABB6] text-sm md:text-base">
                USD/Month
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-center">
            Explore how AI can help you with every day task
          </p>
          <button className="w-full bg-[#2E3036] py-2 md:py-3 rounded-lg text-[#787A7E] my-3 md:my-5">
            Current Plan
          </button>
          <ul className="text-[#A9ABB6] text-sm md:text-base flex flex-col gap-3 md:gap-4">
            <li>20 questions daily</li>
            <li>Access to AiTalk ai chatbox</li>
            <li>public discussion supported</li>
            <li>
              Limited access to data analysis, file uploads, vision, web
              browsing, and image generation
            </li>
            <li>Use custom GPTs</li>
          </ul>
        </div>

        {/* Plus Plan */}
        <div className="bg-[#754015]/20 border-2 border-[#2E3036] w-full flex flex-col gap-3 md:gap-4 items-center px-4 md:px-8 py-4 rounded-lg">
          <h2 className="text-lg md:text-xl lg:text-2xl">Plus</h2>
          <div className="flex items-center gap-1">
            <span className="text-base md:text-lg">$</span>
            <div className="flex items-center gap-1 md:gap-2">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">19</h3>
              <span className="text-[#A9ABB6] text-sm md:text-base">
                USD/Month
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-center">
            Explore how AI can help you with every day task
          </p>
          <button className="w-full bg-[#D3830A] py-2 md:py-3 rounded-lg text-black font-semibold my-3 md:my-5">
            Upgrade to Plus
          </button>
          <ul className="text-[#A9ABB6] text-sm md:text-base flex flex-col gap-3 md:gap-4">
            <li>Fully access to our global AI supercomputer</li>
            <li>Fully access to our Aitalk AI ver 1.0</li>
            <li>Unlimited question</li>
            <li>1 IP address per account</li>
            <li>Email support</li>
            <li>
              Access to data analysis, file uploads, vision, web browsing, and
              image generation
            </li>
            <li>Access to Advanced Voice Mode</li>
          </ul>
        </div>

        {/* Business Plan */}
        <div className="bg-[#313D6A]/15 border-2 border-[#2E3036] w-full flex flex-col gap-3 md:gap-4 items-center px-4 md:px-8 py-4 rounded-lg md:col-span-2 lg:col-span-1">
          <h2 className="text-lg md:text-xl lg:text-2xl">Business</h2>
          <div className="flex items-center gap-1">
            <span className="text-base md:text-lg">$</span>
            <div className="flex items-center gap-1 md:gap-2">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Ask
              </h3>
            </div>
          </div>
          <p className="text-sm md:text-base text-center">
            Explore how AI can help you with every day task
          </p>
          <button className="w-full bg-[#2E3036] py-2 md:py-3 rounded-lg text-[#787A7E] my-3 md:my-5">
            Upgrade to Business
          </button>
          <ul className="text-[#A9ABB6] text-sm md:text-base flex flex-col gap-3 md:gap-4">
            <li>Custom made AI model for Corporate</li>
            <li>Private GPUs hosted at customer&apos;s location</li>
            <li>public discussion supported</li>
            <li>Fully control of the ai supercomputer</li>
            <li>24x7 Support</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
