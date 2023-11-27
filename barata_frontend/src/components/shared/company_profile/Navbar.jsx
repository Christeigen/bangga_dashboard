import { useState } from "react";
import { NavLink } from "react-router-dom";
import close from '/src/assets/close.svg';
import bangga_logo from '/src/assets/bangga_logo.png';
import menu from '/src/assets/menu.svg';
import { navLinks } from "/src/constants/index";


export default function Navbar({ color }) {

  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={bangga_logo} alt="Bangga" className="w-[100px] h-[50px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li key={nav.id}>
            <NavLink
              to={`/${nav.id}`}
              className={({ isActive}) => 
              `font-poppins cursor-pointer text-[16px] 
              ${isActive ? "text-sky-900 font-black" : color === "white" ? "text-white" : "text-black"} 
              ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`
              }
            >
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${!toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
        </div>
      </div>
    </nav>
  );
}

