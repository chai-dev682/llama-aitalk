import Image from "next/image";
import Link from "next/link";
import React from "react";
import Aboutimg1 from "@/public/about1.png";
import Aboutimg2 from "@/public/about2.jpg";
import Aboutimg4 from "@/public/about4.png";
import Aboutimg3 from "@/public/about3.png";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 lg:gap-10 items-center justify-center min-h-screen p-4 lg:p-8">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold text-2xl lg:text-[3vw] mb-4">About</h1>
        <p className="w-full lg:w-[60%] text-sm lg:text-[1.5vw] text-center text-[#a0a0a0] leading-4 lg:leading-[125%]">
          Aitalk is dedicated to democratizing access to artificial
          intelligence, empowering individuals worldwide to harness its
          potential. Our mission is to bridge the technology gap, fostering a
          more equitable and connected global community.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:gap-[5vw]">
        <div className="px-4 lg:px-[3vw] flex justify-center items-center">
          <Image src={Aboutimg1} alt="" className="rounded-[20px] w-full" />
        </div>

        <div className="px-4 lg:px-[3vw] flex flex-col md:flex-row justify-center items-center relative">
          <div className=" left-0 top-0 w-full lg:w-[45%] p-4 lg:pl-[3vw] bg-[#1E1F24] rounded-b-[20px] rounded-[20px] block md:hidden">
            <h1 className="text-xl lg:text-[2vw] mb-2 lg:mb-4">
              Our vision for the future of AI
            </h1>
            <p className="text-sm lg:text-[1.5vw] leading-4 lg:leading-[125%] text-[#a0a0a0] lg:text-[#a0a0a0]">
              Make AI-powered conversation accessible to everyone, regardless of
              geographical location, language, or socioeconomic background.
              Revolutionize human interaction, information exchange, and
              knowledge sharing. Drive positive change by leveraging AI to
              improve quality of life, reduce living costs, and enhance overall
              well-being.
            </p>
          </div>
          <Image
            src={Aboutimg2}
            alt=""
            className="rounded-[20px] w-full block md:hidden"
          />
          <Image
            src={Aboutimg4}
            alt=""
            className="rounded-[20px] w-full hidden md:block"
          />
          <div className="absolute left-0 top-0 w-full lg:w-[45%] p-4 lg:pl-[3vw] bg-[#17181C] rounded-[20px] hidden md:block">
            <h1 className="text-xl lg:text-[2.5vw] mb-2 lg:mb-4">
              Our vision for the future of AI
            </h1>
            <p className="text-sm lg:text-[1.5vw] leading-4 lg:leading-[125%] text-white lg:text-[#a0a0a0]">
              Make AI-powered conversation accessible to everyone, regardless of
              geographical location, language, or socioeconomic background.
              Revolutionize human interaction, information exchange, and
              knowledge sharing. Drive positive change by leveraging AI to
              improve quality of life, reduce living costs, and enhance overall
              well-being.
            </p>
          </div>
        </div>

        <div className="w-full px-4 lg:px-[3vw] flex flex-col-reverse lg:flex-row rounded-[20px]">
          <div className="w-full lg:w-[50%] mb-4 lg:mb-0">
            <Image
              src={Aboutimg3}
              alt=""
              className="rounded-t-[20px] lg:rounded-l-[20px] lg:rounded-tr-none w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-[50%] bg-[#1E1F24] rounded-b-[20px] rounded-t-[20px] md:rounded-t-[0px] lg:rounded-r-[20px] lg:rounded-bl-none py-6 lg:py-[3.5vw] px-6 lg:px-[2.5vw] flex flex-col gap-4 lg:gap-6">
            <h1 className="font-bold text-xl lg:text-[2vw]">Core Values</h1>
            <p className="text-sm lg:text-[1.5vw] text-[#A5A6A9] lg:leading-10">
              <span className="font-semibold text-white">Accessibility: </span>
              AI for all, without barriers.
            </p>
            <p className="text-sm lg:text-[1.5vw] text-[#A5A6A9] lg:leading-10">
              <span className="font-semibold text-white">Inclusivity: </span>
              Embracing diversity, promoting global understanding.
            </p>
            <p className="text-sm lg:text-[1.5vw] text-[#A5A6A9] lg:leading-10">
              <span className="font-semibold text-white">Innovation: </span>
              Pioneering AI solutions for real-world impact.
            </p>
            <p className="text-sm lg:text-[1.5vw] text-[#A5A6A9] lg:leading-10">
              <span className="font-semibold text-white">Empowerment: </span>
              Enabling individuals to make informed decisions.
            </p>
            <p className="text-sm lg:text-[1.5vw] text-[#A5A6A9] lg:leading-10">
              <span className="font-semibold text-white">Responsibility: </span>
              Ensuring AI benefits humanity.
            </p>
          </div>
        </div>

        <div className="w-full px-4 lg:px-[3vw] flex">
          <div className="flex flex-col gap-8 lg:gap-16 w-full justify-center items-center bg-[#1E1F24] rounded-[20px] py-8 lg:py-[4vw]">
            <h1 className="font-bold text-2xl lg:text-[3.5vw] w-[90%] lg:w-[80%] text-center lg:leading-[120%]">
              Join us in shaping the future of technology
            </h1>
            <Link
              href={"/"}
              className="bg-gradient-to-t from-[#34019C] to-[#5F2BFA] px-8 lg:px-10 py-2.5 lg:py-3 rounded-full text-base lg:text-[1.2vw]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
