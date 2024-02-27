"use client";
import { useAuth } from "@app/hooks/auth";
import Link from "next/link";
import Image from "next/image"; // for image optimization
import logo from "@public/assets/images/logo.png";
import { useState } from "react";

// icons and images
import { FiAlignJustify } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Use isOpen for mobile menu state

  const handleToggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className=" relative flex items-center justify-between bg-[#1B252F] px-5 py-6 lg:px-16">
      {/* Logo */}
      <Link href="/">
        <Image
          src={logo}
          alt="BiteProof Logo"
          className="mr-8 h-10 w-auto lg:mr-16"
        />
      </Link>

      {/* Navigation (desktop) */}
      <nav className="hidden items-center space-x-4 lg:flex">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-white duration-500 hover:text-[#2CC2A9]"
            >
              Dashboard
            </Link>
            <a
              onClick={logout}
              className="text-white duration-500 hover:text-[#2CC2A9]"
            >
              Logout
            </a>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className="w-[91px] cursor-pointer rounded-lg border border-[#2CC2A9] p-2 text-center text-white duration-500 hover:text-[#2CC2A9]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="w-[91px] cursor-pointer rounded-lg border border-[#2CC2A9] bg-[#2CC2A9] p-2 text-center text-white duration-500  hover:bg-[#1e6459]"
            >
              Signup
            </Link>
          </>
        )}
      </nav>

      {isOpen && (
        <>
          <section className="flex-ro -z-0 flex items-center justify-center gap-4 lg:hidden ">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="border border-[#2CC2A9] p-4 text-white duration-500 hover:text-[#2CC2A9]"
                >
                  Dashboard
                </Link>
                <a
                  onClick={logout}
                  className="border border-[#2CC2A9] p-4 text-white duration-500 hover:text-[#2CC2A9]"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="w-[91px] cursor-pointer rounded-lg border border-[#2CC2A9] p-2 text-center text-white duration-500 hover:text-[#2CC2A9]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-[91px] cursor-pointer rounded-lg border border-[#2CC2A9] bg-[#2CC2A9] p-2 text-center text-white duration-500  hover:bg-[#1e6459]"
                >
                  Signup
                </Link>
              </>
            )}
          </section>
        </>
      )}

      {/* Mobile Menu Toggle (mobile) */}
      <button
        className="focus:outline-none lg:hidden "
        onClick={handleToggleMenu}
      >
        <FiAlignJustify className="text-3xl text-[#2CC2A9]" />
      </button>

      {/* Mobile Menu (mobile) */}
    </header>
  );
};

export default Navbar;
