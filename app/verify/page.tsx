"use client";
import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

const Verify: React.FC = () => {
  const [timer, setTimer] = useState<number>(30);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isActive, setIsActive] = useState<boolean>(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;

    if (timer > 0 && isActive) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [timer, isActive]);

  const handleInput = (index: number, value: string): void => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      e.key === "Backspace" &&
      !code[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = (): void => {
    setTimer(30);
    setIsActive(true);
    setCode(["", "", "", "", "", ""]);
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  };

  const setInputRef =
    (index: number) =>
    (el: HTMLInputElement | null): void => {
      inputRefs.current[index] = el;
    };

  return (
    <div className="flex flex-col gap-3 items-center justify-between min-h-screen p-4 md:p-8">
      <Header />

      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-md mx-auto">
        <Image
          src={"/verify.png"}
          alt=""
          width={150}
          height={150}
          className="w-24 h-24 md:w-32 md:h-32 mb-6"
        />

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
          Let Verify You
        </h1>

        <form className="w-full px-4 md:px-0">
          <div className="grid grid-cols-6 gap-2 md:gap-3 mb-6">
            {[0, 1, 2, 3, 4, 5].map((index: number) => (
              <input
                key={index}
                ref={setInputRef(index)}
                type="text"
                maxLength={1}
                className="w-full h-12 md:h-14 text-center bg-[#1E1F24] rounded-lg 
                         text-lg md:text-xl focus:outline-none focus:ring-2 
                         focus:ring-purple-500 transition-all"
                value={code[index]}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputMode="numeric"
                pattern="\d*"
              />
            ))}
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              onClick={handleResend}
              className={`text-sm md:text-base ${
                timer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-purple-500 hover:text-purple-400"
              }`}
              disabled={timer > 0}
            >
              Resend Code
            </button>
            <span className="text-sm md:text-base text-gray-400">{timer}s</span>
          </div>

          <Link
            href="/"
            className="block w-full bg-gradient-to-t from-[#34019C] to-[#5F2BFA] 
                     py-3.5 md:py-4 rounded-full text-center text-sm md:text-base
                     hover:opacity-90 transition-opacity"
          >
            Continue
          </Link>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Verify;
