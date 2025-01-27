import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-[999] w-full bg-gray-100 p-5 shadow-sm">
      <Link
        className="text-blue rounded-md bg-gray-300 p-2 transition hover:bg-blue-300 hover:text-white"
        href="/"
      >
        Home
      </Link>
    </header>
  );
};

export default Header;
