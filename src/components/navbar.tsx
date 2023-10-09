"use client";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { NavbarProps } from "../types/types";

const Navbar: React.FC<NavbarProps> = ({ menuItems, isLoggedIn }) => {
  const [active, setActive] = useState("nav-menu");
  const [toggleIcon, setToggleIcon] = useState("nav-toggler");
  const navToggler = () => {
    active === "nav-menu"
      ? setActive("nav-menu nav-active")
      : setActive("nav-menu");

    toggleIcon === "nav-toggler"
      ? setToggleIcon("nav-toggler toggler")
      : setToggleIcon("nav-toggler");
  };

  return (
    <nav className=" z-30 flex items-center xl:shadow-md justify-between  md:justify-around w-full px-4 py-4   xl:relative">
      <div>
        <h2 className="font-bold text-[24px]">TAAS</h2>
      </div>
      <div
        className={`${active} w-[60%] md:w-[40%] xl:w-fit md:bg-none top-[40px] md:top-[70px]  md:mt-0 mt-10`}
      >
        <ul className="flex flex-col items-baseline px-6 space-y-6 font-medium md:flex-row md:items-center md:space-y-0 md:px-0 md:space-x-10">
          {menuItems.map((menuitem, index) => (
            <li
              key={index}
              className="text-t-black link select-none cursor-pointer  text-[20px] font-medium"
            >
              {menuitem.isScrollLink ? (
                <ScrollLink
                  href="#"
                  to={menuitem.target ?? " "}
                  offset={50}
                  smooth={true}
                  duration={500}
                >
                  {menuitem.title}
                </ScrollLink>
              ) : (
                <a href={menuitem.href}>{menuitem.title}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
      {isLoggedIn ? (
        <li>
          <Link
            href="/dashboard"
            className="hover:-translate-y-[3px] duration-200 font-medium gradient-bg rounded-lg text-[20px] block py-2 px-10"
          >
            Dashboard
          </Link>
        </li>
      ) : (
        <div className="flex space-x-5 items-center">
          <Link href="/login">
            <button
              type="button"
              className="select-none hover:-translate-y-[3px] duration-200 text-t-purple  text-[20px] font-bold "
            >
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button
              type="button"
              className="select-none hover:-translate-y-[3px] duration-200 font-medium bg-t-purple text-white  rounded-lg text-[20px] py-4 px-8"
            >
              Get Started
            </button>
          </Link>
        </div>
      )}
      <div onClick={navToggler} className={toggleIcon}>
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </div>
    </nav>
  );
};
export default Navbar;
