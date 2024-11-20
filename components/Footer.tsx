import React from "react";

export default function Footer() {
  return (
    <div className="w-full px-6 lg:px-[5vw] flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 pb-6 lg:pb-[2vw] pt-8 lg:pt-[4vw]">
      {/* Left side - Links */}
      <div className="flex flex-col lg:flex-row gap-3 text-sm lg:text-[0.9vw] text-[#d8d8d8] text-center lg:text-left">
        <div className="flex flex-col lg:flex-row gap-3">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hidden lg:block">·</span>
          <span className="hover:text-white cursor-pointer">
            Terms and Condition
          </span>
          <span className="hidden lg:block">·</span>
          <span className="hover:text-white cursor-pointer">Cookie Policy</span>
          <span className="hidden lg:block">·</span>
        </div>
        <span>© 2024 Aitalk. All Right Reserved</span>
      </div>

      {/* Right side - Social Icons */}
      <div className="flex gap-7">
        {/* LinkedIn */}
        <a
          href="#"
          className="hover:opacity-80 transition-opacity"
          aria-label="LinkedIn"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 lg:w-[18px] h-5 lg:h-[18px]"
          >
            <path
              d="M16 0C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H16ZM15.5 15.5V10.2C15.5 9.33539 15.1565 8.5062 14.5452 7.89483C13.9338 7.28346 13.1046 6.94 12.24 6.94C11.39 6.94 10.4 7.46 9.92 8.24V7.13H7.13V15.5H9.92V10.57C9.92 9.8 10.54 9.17 11.31 9.17C11.6813 9.17 12.0374 9.3175 12.2999 9.58005C12.5625 9.8426 12.71 10.1987 12.71 10.57V15.5H15.5ZM3.88 5.56C4.32556 5.56 4.75288 5.383 5.06794 5.06794C5.383 4.75288 5.56 4.32556 5.56 3.88C5.56 2.95 4.81 2.19 3.88 2.19C3.43178 2.19 3.00193 2.36805 2.68499 2.68499C2.36805 3.00193 2.19 3.43178 2.19 3.88C2.19 4.81 2.95 5.56 3.88 5.56ZM5.27 15.5V7.13H2.5V15.5H5.27Z"
              fill="white"
            />
          </svg>
        </a>
        {/* GitHub */}
        <a
          href="#"
          className="hover:opacity-80 transition-opacity"
          aria-label="GitHub"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 lg:w-[20px] h-5 lg:h-[20px]"
          >
            <path
              d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19V17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26V19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
              fill="white"
            />
          </svg>
        </a>
        {/* Twitter/X */}
        <a
          href="#"
          className="hover:opacity-80 transition-opacity"
          aria-label="Twitter"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 lg:w-[22px] h-5 lg:h-[22px]"
          >
            <path
              d="M12.941 9.392L20.5356 0.5H18.7355L12.1431 8.2205L6.87505 0.5H0.800049L8.76505 12.176L0.800049 21.5H2.60005L9.56305 13.346L15.1266 21.5H21.2015L12.941 9.392ZM10.4766 12.278L9.66955 11.1155L3.24805 1.865H6.01255L11.1935 9.3305L12.0005 10.493L18.7371 20.198H15.9725L10.4766 12.278Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
